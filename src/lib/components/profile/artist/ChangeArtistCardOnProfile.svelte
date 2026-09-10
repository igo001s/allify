<script lang="ts">
	// Components
	import SelectItemCard from '../../general/cards/SelectItemCard.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Props
	export let artist: ArtistSpotify;
	export let choosedArtist: ArtistSpotify | undefined;
	export let handleArtistSelection: (artist: ArtistSpotify) => void;

	export let userInfoType: 'artistOfTheMoment' | 'customArtist' | 'artistsWhoWereWithYou';

	$: currentArtist =
		userInfoType === 'artistsWhoWereWithYou'
			? $userInfo?.artists?.artistsWhoWereWithYou?.find(
					(currentArtist) => currentArtist.id === artist.id
				)
			: $userInfo?.artists?.[userInfoType]?.artist;
</script>

<SelectItemCard
	handleItemSelection={handleArtistSelection}
	itemAriaLabel={$translationsStore.profilePage.profilePageChangeYourArtistChooseArtistAriaLabel}
	item={artist}
	itemType="artist"
	selected={choosedArtist?.id === artist.id || (!choosedArtist && currentArtist?.id === artist.id)}
	disabled={choosedArtist === undefined && currentArtist?.id === artist.id}
/>
