<script lang="ts">
	import buttonNormal from '$lib/assets/1button.png';
	import buttonClicked from '$lib/assets/1button-clicked.png';

	let isPressed = $state(false);
</script>

<button 
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