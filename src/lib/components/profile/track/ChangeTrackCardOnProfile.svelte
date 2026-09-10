<script lang="ts">
	// Components
	import SelectItemCard from '$lib/components/general/cards/SelectItemCard.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let track: TrackSpotify;
	export let choosedTrack: TrackSpotify | undefined;
	export let handleTrackSelection: (track: TrackSpotify) => void;

	export let userInfoType: 'trackOfTheMoment' | 'customTrack' | 'tracksWhoWereWithYou';

	$: currentTrack =
		userInfoType === 'tracksWhoWereWithYou'
			? $userInfo?.tracks?.tracksWhoWereWithYou?.find(
					(currentTrack) => currentTrack.id === track.id
				)
			: $userInfo?.tracks?.[userInfoType]?.track;
</script>

<SelectItemCard
	handleItemSelection={handleTrackSelection}
	itemAriaLabel={$translationsStore.profilePage.profilePageChangeYourMusicChooseMusicAriaLabel}
	item={track}
	itemType="track"
	selected={choosedTrack?.id === track.id || (!choosedTrack && currentTrack?.id === track.id)}
	disabled={choosedTrack === undefined && currentTrack?.id === track.id}
/>
