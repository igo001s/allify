<script lang="ts">
	// Components
	import ProfileItemCard from '$lib/components/general/cards/ProfileItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Props
	export let openChangeYourItemsModal: (itemType: 'artist') => void;
	export let openChangeCustomItemModal: (itemType: 'artist') => void;
	export let artistItem: {
		item: ArtistSpotify;
		type: string;
	};

	function handleEditButtonClick() {
		if (artistItem.type === 'artistOfTheMoment') {
			openChangeYourItemsModal('artist');
		} else if (artistItem.type === 'customArtist') {
			openChangeCustomItemModal('artist');
		}
	}

	function getSongsOnProfileTitle(): string {
		if (artistItem.type === 'mostListenedArtist') {
			return $translationsStore.profilePage.profilePageYourArtistsOnProfileHeading3v1;
		} else if (artistItem.type === 'artistOfTheMoment') {
			return $translationsStore.profilePage.profilePageYourArtistsOnProfileHeading3v2;
		} else if (artistItem.type === 'customArtist' && $userInfo?.artists?.customArtist?.title) {
			return $userInfo?.artists?.customArtist?.title;
		}

		return '';
	}
</script>

<ProfileItemCard
	{handleEditButtonClick}
	profileItem={artistItem}
	heading3={getSongsOnProfileTitle()}
	isUppercase={artistItem.type !== 'customArtist'}
	showEditIcon={artistItem.type === 'artistOfTheMoment' || artistItem.type === 'customArtist'}
	showEditIconAriaLabel={artistItem.type === 'artistOfTheMoment'
		? $translationsStore.profilePage.profilePageYourArtistsOnProfileEditArtistIconAriaLabel
		: $translationsStore.profilePage.profilePageYourArtistsOnProfileEditCustomArtistIconAriaLabel}
	showEditIconAltText={artistItem.type === 'artistOfTheMoment'
		? $translationsStore.profilePage.profilePageYourArtistsOnProfileEditArtistIconAltText
		: $translationsStore.profilePage.profilePageYourArtistsOnProfileEditCustomArtistIconAltText}
/>
