<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Components
	import CardPlatform from '$lib/components/home-page/CardPlatform.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { CardPlatformType } from '$lib/types/CardPlatform.type';

	$: platforms = [
		{
			icon: SpotifyIcon,
			title: 'Spotify',
			description: $translationsStore.homePage.connectPlatformSpotifyDescription,
			link: 'https://open.spotify.com/'
		},
		{
			icon: DeezerIcon,
			title: 'Deezer',
			description: $translationsStore.homePage.connectPlatformDeezerDescription,
			link: `https://www.deezer.com/${$translationsStore.language}/`
		}
	] as CardPlatformType[];
</script>

<section class="bg-brand-primary" id="connect-platforms-section">
	<div
		class="flex flex-col items-center gap-4 px-8 py-12 text-t-inverse sm:px-12 lg:justify-between lg:gap-8 lg:py-32 2xl:px-24"
	>
		<h2 class="text-center text-4xl lg:text-left lg:text-5xl">
			{$translationsStore.homePage.connectPlatformsSectionHeading1}
		</h2>

		<p class="text-md text-center lg:text-left lg:text-lg">
			{$translationsStore.homePage.connectPlatformsSectionParagraph1}
		</p>

		<ul class="mt-10 flex flex-col items-center gap-8 lg:gap-20 xl:flex-row xl:justify-center">
			{#each platforms as platform}
				<CardPlatform {platform} />
			{/each}
		</ul>
	</div>
</section>
