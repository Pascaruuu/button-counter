<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let loading = $state(false);

	// local timezone
	function formatLocalTime(timestamp: string | null) {
		if (!timestamp) return null;
		const date = new Date(timestamp + 'Z'); // 'Z' is to indicate UTC
		return date.toLocaleString(); // this converts to our local timezone
	}
</script>

<div>
	<h1>Counter App</h1>
	<p>Current Count: {data.count.counter}</p>
	{#if data.count.last_clicked}
		<p>Last clicked: {formatLocalTime(data.count.last_clicked)}</p>
	{/if}
	
	<form method="POST" use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}>
		<button type="submit" disabled={loading}>
			{loading ? 'Loading...' : 'Click Me!'}
		</button>
	</form>
</div>

<style>
	div {
		text-align: center;
		padding: 2rem;
	}
	
	button {
		margin: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		cursor: pointer;
	}
	
	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	
	p {
		font-size: 1.5rem;
		margin: 1rem 0;
	}
</style>