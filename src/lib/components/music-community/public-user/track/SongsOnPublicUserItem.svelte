<script lang="ts">
	// Components
	import ProfileItemCard from '$lib/components/general/cards/ProfileItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';
	import type { PublicUserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let publicUser: PublicUserInfo | null;
	export let trackItem: {
		item: TrackSpotify;
		type: string;
	};

	function getSongsOnPublicUserTitle(): string {
		if (trackItem.type === 'mostListenedTrack') {
			return $translationsStore.profilePage.profilePageYourArtistsOnProfileHeading3v1;
		} else if (trackItem.type === 'trackOfTheMoment') {
			return $translationsStore.profilePage.profilePageYourArtistsOnProfileHeading3v2;
		} else if (trackItem.type === 'customTrack' && publicUser?.tracks?.customTrack?.title) {
			return publicUser?.tracks?.customTrack?.title;
		}

		return '';
	}
</script>

<ProfileItemCard
	profileItem={trackItem}
	heading3={getSongsOnPublicUserTitle()}
	isUppercase={trackItem.type !== 'customTrack'}
/>
