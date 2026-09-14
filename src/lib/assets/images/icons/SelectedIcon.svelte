<script lang="ts">
	// Props
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let iconSvgClass: string = '';
	export let iconAriaLabel: string =
		$translationsStore.generalTexts.headerLanguageSelectedIconAriaLabel;
</script>

<svg
	viewBox="0 0 1024 1024"
	class={iconSvgClass}
	aria-label={iconAriaLabel}
	role="img"
	fill="currentColor"
>
	<path
		d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04l-316.8-316.8a64 64 0 0 1 0-90.496z"
	/></svg
>
