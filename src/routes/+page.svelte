<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Format timestamp to our local timezone
	function formatLocalTime(timestamp: string | null) {
		if (!timestamp) return null;
		const date = new Date(timestamp + 'Z'); // The Z stands for: Zulu time = UTC±00:00 (It comes from ISO-8601 format: 2026-02-07T10:30:00Z)
		return date.toLocaleString(); // Converts to our local timezone
	}
</script>

<div>
	<h1>Counter App</h1>
	<p>Current Count: {data.count.counter}</p>
	{#if data.count.last_clicked}
		<p>Last clicked: {formatLocalTime(data.count.last_clicked)}</p>
	{/if}
	
	<form method="POST" use:enhance={() => {
		// Optimistically increment the counter immediately
		data.count.counter += 1;
		
		return async ({ update }) => {
			await update({ reset: false });
		};
	}}>
		<button type="submit">
			Click Me!
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
	
	p {
		font-size: 1.5rem;
		margin: 1rem 0;
	}
</style>