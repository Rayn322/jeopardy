import * as Party from 'partykit/server';
import { verifyToken } from '@clerk/backend';

export default class Server implements Party.Server {
	adminClerkId: string;

	constructor(readonly room: Party.Room) {}

	static async onBeforeConnect(
		req: Party.Request,
		lobby: Party.Lobby,
		ctx: Party.ExecutionContext
	) {
		try {
			const token = new URL(req.url).searchParams.get('token') ?? '';

			const session = await verifyToken(token, { secretKey: lobby.env.CLERK_SECRET_KEY as string });

			// pass any information to the onConnect handler in headers (optional)
			req.headers.set('Clerk-User-ID', session.sub);

			// forward the request onwards on onConnect
			return req;
		} catch (e) {
			console.log(e);
			return new Response('Unauthorized', { status: 401 });
		}
	}

	onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
		const userId = ctx.request.headers.get('Clerk-User-ID');
		console.log(`Hello clerk id: ${userId}!`);

		// A websocket just connected!
		console.log(
			`Connected:
  id: ${conn.id}
  room: ${this.room.id}
  url: ${new URL(ctx.request.url).pathname}`
		);

		conn.send('hello from server');
	}
}

Server satisfies Party.Worker;
