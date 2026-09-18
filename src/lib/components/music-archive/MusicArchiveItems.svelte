<script lang="ts">
	// Components
	import MusicArchiveArtistItem from './MusicArchiveArtistItem.svelte';
	import MusicArchiveTrackItem from './MusicArchiveTrackItem.svelte';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let itemTitle: string;
	export let itemType: 'artist' | 'track';
	export let items:
		| { artist: ArtistSpotify; lastSeen: Date }[]
		| { track: TrackSpotify; lastSeen: Date }[]
		| undefined;
</script>

<div class="space-y-5">
	<h2>{itemTitle}</h2>

	<div class="grid w-full grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 2xl:grid-cols-3">
		{#each items as item}
			{#if itemType === 'track' && 'track' in item}
				<MusicArchiveTrackItem track={item.track} />
			{:else if itemType === 'artist' && 'artist' in item}
				<MusicArchiveArtistItem artist={item.artist} />
			{/if}
		{/each}
	</div>
</div>
