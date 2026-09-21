<script lang="ts">
	// Components
	import MusicArchiveCard from '$lib/components/general/cards/MusicArchiveCard.svelte';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let itemTitle: string;
	export let itemType: 'artist' | 'track';
	export let items:
		| { artist: ArtistSpotify; lastSeen: Date }[]
		| { track: TrackSpotify; lastSeen: Date }[]
		| undefined;
</script>

<div class={`${items?.length ? 'space-y-10 lg:space-y-12' : 'space-y-6 lg:space-y-8'}`}>
	<h2 class="heading-2-music-archive">{itemTitle}</h2>

	<div class="grid w-full grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20 2xl:grid-cols-3">
		{#if items?.length}
			{#each items as item}
				{#if itemType === 'track' && 'track' in item}
					<MusicArchiveCard item={item.track} />
				{:else if itemType === 'artist' && 'artist' in item}
					<MusicArchiveCard item={item.artist} />
				{/if}
			{/each}
		{:else}
			<p class="text-xs text-t-secondary md:text-sm">
				{#if itemType === 'artist'}
					{$translationsStore.musicArchivePage.musicArchivePageArtistsEmpty}
				{:else if itemType === 'track'}
					{$translationsStore.musicArchivePage.musicArchivePageTracksEmpty}
				{/if}
			</p>
		{/if}
	</div>
</div>
