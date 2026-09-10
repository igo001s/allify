<script lang="ts">
	// Assets
	import IgoLogo from '$lib/assets/images/logos/IgoLogo.svelte';
	import AllifyLogoLight from '$lib/assets/images/logos/AllifyLogoLight.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<div class="flex flex-col items-center justify-between gap-6 lg:items-start">
	<div class="flex max-w-xs flex-col items-center lg:items-start">
		<AllifyLogoLight
			logoSvgClass="w-24 h-fit cursor-pointer text-t-inverse-muted hover:text-t-inverse"
			logoAltText={$translationsStore.generalTexts.logoLightAltText}
		/>

		<p class="mt-4 text-center text-sm font-light text-t-inverse-muted lg:text-left">
			{$translationsStore.generalTexts.footerFirstSectionText1}
		</p>
	</div>

	<div class="flex flex-col items-center gap-5 lg:items-start">
		<p class="text-sm font-medium text-t-inverse-muted">
			{$translationsStore.generalTexts.footerFirstSectionText2}
		</p>

		<IgoLogo
			logoSvgClass="w-14 h-14 h-fit cursor-pointer text-t-inverse-muted hover:text-t-inverse"
			logoAltText={$translationsStore.generalTexts.footerFirstSectionIgoLogoAltText}
		/>
	</div>
</div>
