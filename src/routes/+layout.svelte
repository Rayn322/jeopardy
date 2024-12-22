<script lang="ts">
	import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public';
	import { ClerkProvider } from 'svelte-clerk';
	import '../app.css';

	const { children } = $props();
</script>

<ClerkProvider publishableKey={PUBLIC_CLERK_PUBLISHABLE_KEY}>
	{@render children()}
</ClerkProvider>
