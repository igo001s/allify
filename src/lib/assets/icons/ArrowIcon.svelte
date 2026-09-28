<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let iconSvgClass: string = '';
	export let iconAriaLabel: string = $translationsStore.generalTexts.dropdownAriaLabel;
</script>

<svg
	viewBox="0 0 24 24"
	class={`block ${iconSvgClass}`}
	aria-label={iconAriaLabel}
	role="img"
	fill="currentColor"
>
	<path
		fill="currentColor"
		d="m12 15l-4.243-4.242l1.415-1.414L12 12.172l2.828-2.828l1.415 1.414L12 15.001Z"
	/>
</svg>
