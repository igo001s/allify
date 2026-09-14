<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let iconSvgClass: string = '';
	export let iconAriaLabel: string = $translationsStore.generalTexts.burgerMenuAriaLabel;
</script>

<svg
	viewBox="0 0 24 24"
	class={iconSvgClass}
	aria-label={iconAriaLabel}
	role="img"
	fill="currentColor"
>
	<path d="M4 18L20 18" stroke-width="2" stroke="currentColor" stroke-linecap="round" />
	<path d="M4 12L20 12" stroke-width="2" stroke="currentColor" stroke-linecap="round" />
	<path d="M4 6L20 6" stroke-width="2" stroke="currentColor" stroke-linecap="round" />
</svg>
