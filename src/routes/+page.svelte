<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Odometer from '$lib/components/Odometer.svelte';

	let { data }: { data: PageData } = $props();

	// Format timestamp to our local timezone
	function formatLocalTime(timestamp: string | null) {
		if (!timestamp) return null;
		const date = new Date(timestamp + 'Z'); // The Z stands for: Zulu time = UTC±00:00 (It comes from ISO-8601 format: 2026-02-07T10:30:00Z)
		return date.toLocaleString(); // Converts to our local timezone
	}
</script>

<div class="layout">

	<h1>Counter App</h1>

	<div class="counter-section">
        <Odometer value={data.count.counter} />
    </div>

	<div class="actions">
		<form method="POST" use:enhance={() => {
			// Optimistically increment the counter immediately
			data.count.counter += 1;
	
			return async ({ update }) => {
				await update({ reset: false });
			};
		}}>
			<button class="big-red-button" type="submit">
				Click Me!
			</button>
		</form>
		
		{#if data.count.last_clicked}
			<p class="timestamp">
				Last clicked: {formatLocalTime(data.count.last_clicked)}
			</p>
		{/if}
	</div>

</div>

<style>
	:global(body) {
        background-color: #1a1a1a;
        color: white;
        font-family: system-ui, sans-serif;
        margin: 0;
        display: flex;
        justify-content: center;
        min-height: 100vh;
    }

	.layout, .actions{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
        padding-top: 4rem;
    }

	.counter-section {
        margin: 2rem 0;
        transform: scale(1.2); /* Make it pop */
    }

	.big-red-button {
        background: linear-gradient(145deg, #ff4d4d, #cc0000);
        color: white;
        border: none;
        padding: 1rem 3rem;
        font-size: 1.5rem;
        font-weight: bold;
        border-radius: 50px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
        transition: transform 0.1s, box-shadow 0.1s;
    }

	.big-red-button:active {
        transform: scale(0.95);
        box-shadow: 0 2px 5px rgba(255, 0, 0, 0.4);
    }

	.timestamp {
        color: #888;
        font-size: 0.9rem;
        margin-top: 1rem;
    }
</style>