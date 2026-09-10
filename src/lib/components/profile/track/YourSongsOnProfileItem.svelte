<script lang="ts">
	// Components
	import ProfileItemCard from '$lib/components/general/cards/ProfileItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let openChangeYourItemsModal: (itemType: 'music') => void;
	export let openChangeCustomItemModal: (itemType: 'music') => void;
	export let trackItem: {
		item: TrackSpotify;
		type: string;
	};

	function handleEditButtonClick() {
		if (trackItem.type === 'trackOfTheMoment') {
			openChangeYourItemsModal('music');
		} else if (trackItem.type === 'customTrack') {
			openChangeCustomItemModal('music');
		}
	}

	function getSongsOnProfileTitle(): string {
		if (trackItem.type === 'mostListenedTrack') {
			return $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v1;
		} else if (trackItem.type === 'trackOfTheMoment') {
			return $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v2;
		} else if (trackItem.type === 'customTrack' && $userInfo?.tracks?.customTrack?.title) {
			return $userInfo?.tracks?.customTrack?.title;
		}

		return '';
	}
</script>

<ProfileItemCard
	{handleEditButtonClick}
	profileItem={trackItem}
	heading3={getSongsOnProfileTitle()}
	isUppercase={trackItem.type !== 'customTrack'}
	showEditIcon={trackItem.type === 'trackOfTheMoment' || trackItem.type === 'customTrack'}
	showEditIconAriaLabel={trackItem.type === 'trackOfTheMoment'
		? $translationsStore.profilePage.profilePageYourSongsOnProfileEditMusicIconAriaLabel
		: $translationsStore.profilePage.profilePageYourSongsOnProfileEditCustomMusicIconAriaLabel}
	showEditIconAltText={trackItem.type === 'trackOfTheMoment'
		? $translationsStore.profilePage.profilePageYourSongsOnProfileEditMusicIconAltText
		: $translationsStore.profilePage.profilePageYourSongsOnProfileEditCustomMusicIconAltText}
/>
