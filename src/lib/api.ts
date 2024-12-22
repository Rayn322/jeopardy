import { PARTYKIT_URL } from './env';

export async function fetchHello(token: string) {
	const response = await fetch(`${PARTYKIT_URL}/hello`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return response.text();
}
