<script lang="ts">
	// Svelte
	import type { SvelteComponent } from 'svelte';

	// Components
	import MusicIcon from '$lib/assets/images/icons/MusicIcon.svelte';
	import ArtistIcon from '$lib/assets/images/icons/ArtistIcon.svelte';
	import MusicalItemCard from '../general/cards/MusicalItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	$: musicalItemContent = [
		{
			icon: ArtistIcon as typeof SvelteComponent,
			title: $translationsStore.homePage.musicalItemCardTitleArtists,
			description: [
				$translationsStore.homePage.musicalItemCardTitleArtistsItem1,
				$translationsStore.homePage.musicalItemCardTitleArtistsItem2,
				$translationsStore.homePage.musicalItemCardTitleArtistsItem3,
				$translationsStore.homePage.musicalItemCardTitleArtistsItem4
			],
			buttonContent: $translationsStore.homePage.musicalItemCardArtistsButtonContent
		},
		{
			icon: MusicIcon as typeof SvelteComponent,
			title: $translationsStore.homePage.musicalItemCardTitleSongs,
			description: [
				$translationsStore.homePage.musicalItemCardTitleSongsItem1,
				$translationsStore.homePage.musicalItemCardTitleSongsItem2,
				$translationsStore.homePage.musicalItemCardTitleSongsItem3,
				$translationsStore.homePage.musicalItemCardTitleSongsItem4
			],
			buttonContent: $translationsStore.homePage.musicalItemCardSongsButtonContent
		}
	];
</script>

<section
	class="flex flex-col items-center gap-8 bg-s-default pt-14 pb-4 sm:gap-12 xl:pt-28 xl:pb-24"
>
	<h2 class="heading-2-musical-items max-w-3xl text-center">
		{$translationsStore.homePage.musicalItemsSectionHeading1}
	</h2>

	<div class="grid w-full max-w-7xl gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-20">
		{#each musicalItemContent as item}
			<MusicalItemCard {item} />
		{/each}
	</div>
</section>
