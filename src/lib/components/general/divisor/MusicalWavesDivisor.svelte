<script lang="ts">
	// Assets
	import DivisorDesktop from '$lib/assets/images/dividers/musical-waves-desktop.webp';
	import DivisorMobile from '$lib/assets/images/dividers/musical-waves-mobile.webp';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<picture>
	<source
		srcset={DivisorDesktop}
		media="(min-width: 1024px)"
		type="image/webp"
	/>

	<img
		src={DivisorMobile}
		class="my-10 h-8 w-full object-cover"
		loading="lazy"
		decoding="async"
		fetchpriority="low"
		alt={$translationsStore.generalTexts.musicalWavesDivisorAltText}
	/>
</picture>
