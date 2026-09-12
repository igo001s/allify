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
	class="flex flex-col items-center gap-6 rounded-lg bg-brand-primary px-8 py-12 text-t-inverse sm:px-10 sm:py-16 lg:gap-8 lg:px-16 lg:py-20"
>
	<h2 class="heading-2-connected-platforms max-w-4xl text-center">
		{$translationsStore.homePage.connectPlatformsSectionHeading1}
	</h2>

	<p class="max-w-4xl text-center">
		{$translationsStore.homePage.connectPlatformsSectionParagraph1}
	</p>

	<ul
		class="mt-4 flex w-full flex-col items-center gap-8 lg:mt-10 lg:gap-16 xl:flex-row xl:justify-center"
	>
		{#each platforms as platform}
			<PlatformCard {platform} />
		{/each}
	</ul>
</section>
