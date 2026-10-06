<script lang="ts">
	// App
	import { resolve } from '$app/paths';

	// Assets
	import IgoLogo from '$lib/assets/logos/IgoLogo.svelte';
	import AllifyLogoLight from '$lib/assets/logos/AllifyLogoLight.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<div class="flex flex-col items-center justify-between gap-6 lg:items-start">
	<div class="flex max-w-xs flex-col items-center lg:items-start">
		<a href={resolve('/')}>
			<AllifyLogoLight
				logoSvgClass="w-24 h-fit cursor-pointer text-t-inverse-muted hover:text-t-inverse"
				logoAriaLabel={$translationsStore.generalTexts.logoLightAriaLabel}
			/>
		</a>

		<p class="mt-4 text-center text-sm font-light text-t-inverse-muted lg:text-left">
			{$translationsStore.generalTexts.footerFirstSectionText1}
		</p>
	</div>

	<div class="flex flex-col items-center gap-5 lg:items-start">
		<p class="text-sm font-medium text-t-inverse-muted">
			{$translationsStore.generalTexts.footerFirstSectionText2}
		</p>

		<a
			href="https://www.linkedin.com/in/igor-araujo001/"
			aria-label={$translationsStore.generalTexts.footerFirstSectionIgoLogoAltText}
			target="_blank"
			rel="noopener noreferrer"
		>
			<IgoLogo
				logoSvgClass="w-14 h-14 h-fit cursor-pointer text-t-inverse-muted hover:text-t-inverse"
				logoAltText={$translationsStore.generalTexts.footerFirstSectionIgoLogoAltText}
			/>
		</a>
	</div>
</div>
