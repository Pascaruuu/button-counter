<script lang="ts">
	import { onMount } from 'svelte';
	import clickSound from '$lib/assets/click-sound.mp3';

	let isPressed = $state(false);
	let buttonElement: HTMLButtonElement;

	function playSound() {
		const audio = new Audio(clickSound);
		audio.volume = 1.0;
		audio.play().catch(err => console.log('Audio play failed:', err));
	}

	onMount(() => {
		// Need to Preload audio so we can spam hehe
		const preloadAudio = new Audio(clickSound);
		preloadAudio.load();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Space' && !event.repeat) {
				event.preventDefault();
				isPressed = true;
				playSound();
				buttonElement?.click();
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.code === 'Space') {
				isPressed = false;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	});
</script>

<button 
	bind:this={buttonElement}
	type="submit" 
	aria-label="+1"
	class="arcade-button" 
	class:pressed={isPressed}
	onmousedown={() => {
		isPressed = true;
		playSound();
	}}
	onmouseup={() => isPressed = false}
	onmouseleave={() => isPressed = false}
>
<!-- nothing -->
</button>

<style>
	.arcade-button {
		width: 200px;
		height: 200px;
		background-image: url('$lib/assets/1button.png');
		background-size: cover;
		background-position: center;
		background-color: transparent;
		border: none;
		border-radius: 0;
		padding: 0;
		cursor: pointer;
		image-rendering: pixelated;
		transition: none;
	}

	.arcade-button.pressed {
		background-image: url('$lib/assets/1button-clicked.png');
	}

	@media (max-width: 768px) {
		.arcade-button {
			width: 150px;
			height: 150px;
		}
	}
</style>