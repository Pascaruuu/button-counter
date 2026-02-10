<script lang="ts">
	import { onMount } from 'svelte';
	import buttonNormal from '$lib/assets/1button.png';
	import buttonClicked from '$lib/assets/1button-clicked.png';

	let isPressed = $state(false);
	let buttonElement: HTMLButtonElement;

	onMount(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Space' && !event.repeat) {
				event.preventDefault();
				isPressed = true;
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
	class="arcade-button"
	class:pressed={isPressed}
	onmousedown={() => isPressed = true}
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