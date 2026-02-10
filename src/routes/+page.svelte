<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import ArcadeFrame from '$lib/components/ArcadeFrame.svelte';
	import CounterDisplay from '$lib/components/CounterDisplay.svelte';
	import IncrementButton from '$lib/components/IncrementButton.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<div class="screen">
	<ArcadeFrame />
	
	<div class="content-container">
		<CounterDisplay count={data.count.counter} lastClicked={data.count.last_clicked} />

		<form method="POST" use:enhance={() => {
			data.count.counter += 1;
			return async ({ update }) => {
				await update({ reset: false });
			};
		}}>
			<IncrementButton />
		</form>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
		background: #1a0a2e;
		font-family: 'Press Start 2P', cursive;
	}

	.screen {
		min-height: 100vh;
		width: 100vw;
		background: linear-gradient(135deg, #2a1a4a 0%, #1a0a2e 50%, #2a1a4a 100%);
		background-image: 
			repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px),
			repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 51px);
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.content-container {
		position: relative;
		z-index: 5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 40px;
		max-width: 80%;
		padding: 40px;
	}

	form {
		margin-top: -40px;
	}

	@media (max-width: 768px) {
		.content-container {
			max-width: 90%;
			padding: 20px;
			gap: 25px;
		}
	}
</style>