<script lang="ts">
	let { count, lastClicked }: { count: number; lastClicked: string | null } = $props();

	function formatLocalTime(timestamp: string | null) {
		if (!timestamp) return null;
		const date = new Date(timestamp + 'Z');
		return date.toLocaleString();
	}
</script>

<h1 class="title">COUNTER</h1>

<div class="counter-value" data-testid="count-display">{count}</div>

{#if lastClicked}
	<p class="timestamp" data-testid="last-clicked">Last: {formatLocalTime(lastClicked)}</p>
{/if}

<style>
	.title {
		color: #ffa500;
		font-size: 64px;
		margin: 0;
		text-shadow: 
			0 0 20px #ffa500,
			0 0 40px #ff8c00,
			4px 4px 0px rgba(0, 0, 0, 0.5);
		letter-spacing: 12px;
	}

	.counter-value {
		color: #00ff00;
		font-size: 96px;
		text-shadow: 
			0 0 20px #00ff00,
			0 0 40px #00ff00,
			0 0 60px #00ff00;
		animation: glow 2s ease-in-out infinite alternate;
	}

	@keyframes glow {
		from {
			text-shadow: 
				0 0 20px #00ff00,
				0 0 40px #00ff00,
				0 0 60px #00ff00;
		}
		to {
			text-shadow: 
				0 0 30px #00ff00,
				0 0 60px #00ff00,
				0 0 80px #00ff00;
		}
	}

	.timestamp {
		color: #8b7ab8;
		font-size: 12px;
		margin: 0;
		letter-spacing: 2px;
	}

	@media (max-width: 768px) {
		.title {
			font-size: 36px;
			letter-spacing: 6px;
		}

		.counter-value {
			font-size: 64px;
		}

		.timestamp {
			font-size: 8px;
		}
	}
</style>