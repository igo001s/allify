<script lang="ts">
	// Components
	import ProfileItemCard from '$lib/components/general/cards/ProfileItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';
	import type { PublicUserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let publicUser: PublicUserInfo | null;
	export let artistItem: {
		item: ArtistSpotify;
		type: string;
	};

	function getArtistsOnPublicUserTitle(): string {
		if (artistItem.type === 'mostListenedArtist') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserArtistsOnPublicUserHeading3v1;
		} else if (artistItem.type === 'artistOfTheMoment') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserArtistsOnPublicUserHeading3v2;
		} else if (artistItem.type === 'customArtist' && publicUser?.artists?.customArtist?.title) {
			return publicUser?.artists?.customArtist?.title;
		}

		return '';
	}
</script>

<ProfileItemCard
	profileItem={artistItem}
	heading3={getArtistsOnPublicUserTitle()}
	isUppercase={artistItem.type !== 'customTrack'}
/>
