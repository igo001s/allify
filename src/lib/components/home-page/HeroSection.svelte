<script lang="ts">
	// Assets
	import AlliFullBodyPointing from '$lib/assets/images/alli/alli-full-body-pointing.webp?enhanced';
	import AlliFullBodyPointingDownwards from '$lib/assets/images/alli/alli-full-body-pointing-downwards.webp?enhanced';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<section class="flex items-center bg-s-default lg:justify-between">
	<div class="flex max-w-full flex-col items-center gap-8 lg:mb-14 lg:max-w-190 lg:items-start">
		<h1 class="heading-1-hero">
			{$translationsStore.homePage.homePageHeroSectionHeading1}
		</h1>

		<p class="paragraph-home-page text-t-secondary">
			{$translationsStore.homePage.homePageHeroSectionParagraph1}
		</p>

		<enhanced:img
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
			class="button-cta"
			href={`${$userInfo?.connectedStreamings.spotify ? '/my-musical-profile' : '#connect-platforms-section'}`}
			aria-label={$userInfo !== undefined
				? $translationsStore.homePage.homePageHeroSectionButton1v2AriaLabel
				: $translationsStore.homePage.homePageHeroSectionButton1AriaLabel}
		>
			{$userInfo?.connectedStreamings.spotify
				? $translationsStore.homePage.homePageHeroSectionButton1v2
				: $translationsStore.homePage.homePageHeroSectionButton1}
		</a>
	</div>

	<enhanced:img
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
