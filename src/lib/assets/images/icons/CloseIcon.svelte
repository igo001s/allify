<script lang="ts">
	// Props
	export let iconSvgClass: string = '';
	export let iconAltText: string = '';
</script>

<svg
	viewBox="0 0 24 24"
	preserveAspectRatio="xMidYMid meet"
	class={iconSvgClass}
	aria-label={iconAltText}
	role="img"
	fill="currentColor"
>
	<title>{iconAltText}</title>

	<path d="M16 8L8 16M8 8L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
</svg>
