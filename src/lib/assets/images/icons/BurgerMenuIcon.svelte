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

	<path d="M4 18L20 18" stroke-width="2" stroke="currentColor" stroke-linecap="round" />
	<path d="M4 12L20 12" stroke-width="2" stroke="currentColor" stroke-linecap="round" />
	<path d="M4 6L20 6" stroke-width="2" stroke="currentColor" stroke-linecap="round" />
</svg>
