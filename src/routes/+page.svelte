<script lang="ts">
	import { SignedIn, SignedOut, useClerkContext } from 'svelte-clerk';

	const ctx = useClerkContext();
</script>

<SignedIn>
	<p>You are signed in!</p>
	<button onclick={() => ctx.clerk?.signOut()}>Sign out</button>
</SignedIn>
<SignedOut>
	<p>You are signed out!</p>
	<a href="/signin" class="text-blue-500">Sign In here</a>
</SignedOut>
