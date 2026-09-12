<script lang="ts">
	// Assets
	import AlliFullBodyPointing from '$lib/assets/images/alli/alli-full-body-pointing.webp?enhanced';
	import AlliFullBodyPointingDownwards from '$lib/assets/images/alli/alli-full-body-pointing-downwards.webp?enhanced';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<section class="flex items-center justify-between bg-s-default pt-2 pb-16 xl:pt-14 xl:pb-24">
	<div
		class="flex w-full flex-col items-center gap-5 xl:mb-14 xl:max-w-190 xl:items-start xl:gap-8"
	>
		<h1 class="heading-1-hero max-w-2xl">
			{$translationsStore.homePage.homePageHeroSectionHeading1}
		</h1>

		<p
			class="paragraph-home-page max-w-3xl text-center leading-relaxed text-t-secondary xl:text-left"
		>
			{$translationsStore.homePage.homePageHeroSectionParagraph1}
		</p>

		<enhanced:img
			src={AlliFullBodyPointingDownwards}
			alt={$translationsStore.homePage.alliMascotPointingDownwardsAltText}
			class="block h-auto w-56 xl:hidden"
			loading="eager"
			fetchpriority="high"
			decoding="sync"
			width="280"
			height="280"
		/>

		<a
			class="button-cta mt-4 w-full xl:mt-0 xl:w-90 xl:max-w-90"
			href={$userInfo?.connectedStreamings.spotify
				? '/my-musical-profile'
				: '#connect-platforms-section'}
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
		class="hidden h-auto w-80 md:mr-5 xl:block 2xl:mr-14 2xl:w-105"
		width="420"
		height="420"
		loading="eager"
		fetchpriority="high"
		decoding="sync"
	/>
</section>
