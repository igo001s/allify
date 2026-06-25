<script lang="ts">
	// Assets
	import AlliFullBodyPointing from '$lib/assets/images/alli/alli-full-body-pointing.webp';
	import AlliFullBodyPointingDownwards from '$lib/assets/images/alli/alli-full-body-pointing-downwards.webp';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<section
	class="flex items-center bg-s-default px-8 py-12 sm:px-12 lg:justify-between lg:py-32 2xl:px-24"
	id="hero-section"
>
	<div class="flex max-w-full flex-col items-center gap-8 lg:mb-14 lg:max-w-190 lg:items-start">
		<h1 class="text-center text-4xl text-t-primary lg:text-left lg:text-5xl">
			{$translationsStore.homePage.homePageHeroSectionHeading1}
		</h1>

		<p class="text-md text-center text-t-secondary lg:text-left lg:text-lg">
			{$translationsStore.homePage.homePageHeroSectionParagraph1}
		</p>

		<img
			src={AlliFullBodyPointingDownwards}
			alt={$translationsStore.homePage.alliMascotPointingDownwardsAltText}
			class="block h-auto w-56 lg:hidden"
			loading="eager"
			fetchpriority="high"
			decoding="sync"
			width="280"
			height="280"
		/>

		<a
			class="mt-6 w-full cursor-pointer rounded-xl bg-brand-primary py-5 text-center text-sm font-medium text-t-inverse shadow-md transition-all hover:scale-102 hover:bg-brand-primary-dark lg:w-90 lg:max-w-90"
			href={`${$userInfo?.connectedStreamings.spotify?.connected === true ? '/my-musical-profile' : '#connect-platforms-section'}`}
			aria-label={$userInfo !== undefined
				? $translationsStore.homePage.homePageHeroSectionButton1v2AriaLabel
				: $translationsStore.homePage.homePageHeroSectionButton1AriaLabel}
		>
			{$userInfo?.connectedStreamings.spotify?.connected === true
				? $translationsStore.homePage.homePageHeroSectionButton1v2
				: $translationsStore.homePage.homePageHeroSectionButton1}
		</a>
	</div>

	<img
		src={AlliFullBodyPointing}
		alt={$translationsStore.homePage.alliMascotPointingToLeftAltText}
		class="mr-2 hidden h-auto w-80 md:mr-5 lg:block 2xl:mr-10 2xl:w-105"
		width="420"
		height="420"
		loading="eager"
		fetchpriority="high"
		decoding="sync"
	/>
</section>
