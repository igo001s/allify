<script lang="ts">
	// Props
	export let iconSvgClass: string = '';
	export let iconAltText: string = '';
</script>

<svg
	viewBox="0 0 24 24"
	preserveAspectRatio="xMidYMid meet"
	class={`block ${iconSvgClass}`}
	aria-label={iconAltText}
	role="img"
	fill="currentColor"
>
	<title>{iconAltText}</title>

	<path
		fill="currentColor"
		d="m12 15l-4.243-4.242l1.415-1.414L12 12.172l2.828-2.828l1.415 1.414L12 15.001Z"
	/>
</svg>
