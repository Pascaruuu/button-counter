<script lang="ts">
	import arcadeFrame from '$lib/assets/arcade_frame.png';
</script>

<div class="arcade-frame"></div>

<style>
	.arcade-frame {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: url('$lib/assets/arcade_frame.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		pointer-events: none;
		z-index: 10;
		image-rendering: pixelated;
	}
</style>