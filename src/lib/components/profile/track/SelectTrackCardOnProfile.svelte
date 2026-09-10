<script lang="ts">
	// Components
	import SelectItemCard from '../../general/cards/SelectItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let handleTrackSelection: (track: TrackSpotify) => void;
	export let choosedTrack: TrackSpotify | undefined;
	export let track: TrackSpotify;
</script>

<SelectItemCard
	handleItemSelection={handleTrackSelection}
	itemAriaLabel={$translationsStore.profilePage.profilePageSelectYourMusicChooseMusicAriaLabel}
	item={track}
	itemType="track"
	selected={choosedTrack?.id === track.id}
/>
