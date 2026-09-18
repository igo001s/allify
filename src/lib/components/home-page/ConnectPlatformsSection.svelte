<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Components
	import PlatformCard from '$lib/components/general/cards/PlatformCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { CardPlatformType } from '$lib/types/Components.type';

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

<section
	id="connect-platforms-section"
	class="flex flex-col items-center gap-5 rounded-lg bg-brand-primary px-5 py-6.5 text-t-inverse sm:px-10 sm:py-16 xl:gap-8 xl:px-16 xl:py-20"
>
	<h2 class="heading-2-connected-platforms max-w-4xl text-center">
		{$translationsStore.homePage.connectPlatformsSectionHeading1}
	</h2>

	<p class="paragraph-home-page max-w-4xl text-center">
		{$translationsStore.homePage.connectPlatformsSectionParagraph1}
	</p>

	<ul
		class="mt-2 flex w-full flex-col items-center gap-8 lg:mt-10 xl:mt-4 xl:flex-row xl:justify-center xl:gap-16"
	>
		{#each platforms as platform}
			<PlatformCard {platform} />
		{/each}
	</ul>
</section>
