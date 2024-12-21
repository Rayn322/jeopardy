<script lang="ts">
	import { PUBLIC_PARTYKIT_HOST } from '$env/static/public';
	import PartySocket from 'partysocket';
	import '../app.css';
	let { children } = $props();

	const ws = new PartySocket({
		host: PUBLIC_PARTYKIT_HOST,
		room: 'test'
	});

	let lastMessage = $state('no message');

	ws.onmessage = (event) => {
		lastMessage = event.data;
	};
</script>

{@render children()}

<p>{lastMessage}</p>

<button class="rounded border-2 border-black p-4" onclick={() => ws.send('hello')}
	>Send message</button
>
