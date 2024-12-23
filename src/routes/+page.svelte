<script lang="ts">
	import { PARTYKIT_URL } from '$lib/env';
	import PartySocket from 'partysocket';
	import { SignedIn, SignedOut, useClerkContext } from 'svelte-clerk';

	const ctx = useClerkContext();

	let partySocket: PartySocket | undefined = $state();

	async function connect() {
		const token = await ctx.session?.getToken();

		partySocket = new PartySocket({
			host: PARTYKIT_URL,
			room: 'room-id',
			// attach the token to PartyKit in the query string
			query: {
				token
			},
			debug: true
		});
	}
</script>

{#if partySocket}
	<p>Connected to PartySocket!</p>
	<p>URL: {partySocket.url}</p>
	<p>Room: {partySocket.room}</p>
{:else}
	<p>Not connected to PartySocket</p>
{/if}

<button onclick={connect}>Connect</button>

<SignedIn>
	<p>You are signed in!</p>
	<button onclick={() => ctx.clerk?.signOut()}>Sign out</button>
</SignedIn>
<SignedOut>
	<p>You are signed out!</p>
	<a href="/signin" class="text-blue-500">Sign In here</a>
</SignedOut>
