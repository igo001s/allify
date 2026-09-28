<script lang="ts">
	// Assets
	import DivisorDesktop from '$lib/assets/dividers/musical-waves-desktop.webp?enhanced';
	import DivisorMobile from '$lib/assets/dividers/musical-waves-desktop.webp?enhanced';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<picture>
	<source srcset={DivisorDesktop.img.src} media="(min-width: 1024px)" type="image/webp" />

	<img
		src={DivisorMobile.img.src}
		class="my-10 h-8 w-full object-cover"
		loading="lazy"
		decoding="async"
		fetchpriority="low"
		alt={$translationsStore.generalTexts.musicalWavesDivisorAltText}
	/>
</picture>
