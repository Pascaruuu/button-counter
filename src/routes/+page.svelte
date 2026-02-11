<script lang="ts">
    import { enhance } from '$app/forms';
    import { onMount } from 'svelte';
    import { io } from "socket.io-client";
    import type { PageData } from './$types';
    
    // Components
    import ArcadeFrame from '$lib/components/ArcadeFrame.svelte';
    import CounterDisplay from '$lib/components/CounterDisplay.svelte';
    import IncrementButton from '$lib/components/IncrementButton.svelte';

    let { data }: { data: PageData } = $props();

    let liveCount = $state(data.countData.counter);
    let liveLastClicked = $state(data.countData.last_clicked);

	$effect(() => {
        liveCount = data.countData.counter;
        liveLastClicked = data.countData.last_clicked;
    });
    // The WebSocket Connection
    onMount(() => {
        const socket = io();

        // Listen for the broadcast from the server
        socket.on("new-count", (updatedData: any) => {
            liveCount = updatedData.counter;
            liveLastClicked = updatedData.last_clicked;
        });
        return () => {
            socket.disconnect();
        };
    });
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<div class="screen">
    <ArcadeFrame />
    
    <div class="content-container">
        <CounterDisplay count={liveCount} lastClicked={liveLastClicked} />

        <form method="POST" use:enhance={() => {
            liveCount += 1; 
            // liveLastClicked = new Date().toISOString();

            return async ({ update }) => {
                await update({ reset: false });
            };
        }}>
            <IncrementButton />
        </form>

        <div class="hint">
            <span>try</span>
            <span class="spacebar-key">SPACE</span>
        </div>
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
        padding-top: 120px;
	}

	form {
		margin-top: -40px;
	}

    .hint {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #8b7ab8;
        font-size: 12px;
        margin-top: 10px;
    }

    .spacebar-key {
        background: #2a2a4a;
        border: 2px solid #4a4a6a;
        border-radius: 4px;
        padding: 4px 12px;
        font-size: 10px;
        color: #fff;
        box-shadow: 0 2px 0 #1a1a2a;
    }

	@media (max-width: 768px) {
		.content-container {
			max-width: 90%;
			padding: 20px;
			gap: 25px;
		}
	}
</style>