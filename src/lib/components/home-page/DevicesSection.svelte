<script lang="ts">
	// Assets
	import DevicesImage from '$lib/assets/images/devices-illustration.webp';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<section
	class="flex flex-col-reverse items-center gap-16 bg-s-default px-4 py-12 lg:flex-row lg:justify-between lg:py-32 2xl:px-24"
	id="devices-section"
>
	<img
		src={DevicesImage}
		alt={$translationsStore.homePage.devicesSectionAltText}
		loading="lazy"
		fetchpriority="low"
		decoding="async"
		width="462"
		height="386"
		class="ml-6 h-auto w-[320px] lg:ml-20 lg:w-72 2xl:w-120"
	/>

	<div class="w-full space-y-6 lg:w-3/5 2xl:w-2/5">
		<h2 class="text-center text-4xl text-t-primary lg:w-120 lg:min-w-120 lg:text-left lg:text-5xl">
			{$translationsStore.homePage.devicesSectionHeading1}
		</h2>

		<p class="text-md text-center text-t-secondary lg:text-left lg:text-lg">
			{$translationsStore.homePage.devicesSectionParagraph1}
		</p>
	</div>
</section>
