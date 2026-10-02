<script lang="ts">
	// Components
	import ProfileItemCard from '$lib/components/general/cards/ProfileItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistItems } from '$lib/types/Artists.type';

	// Props
	export let openChangeYourItemsModal: (itemType: 'artist') => void;
	export let openChangeCustomItemModal: (itemType: 'artist') => void;
	export let artistItem: ArtistItems;

	function handleEditButtonClick() {
		if (artistItem.type === 'artistOfTheMoment') {
			openChangeYourItemsModal('artist');
		} else if (artistItem.type === 'customArtist') {
			openChangeCustomItemModal('artist');
		}
	}
</script>

<ProfileItemCard
	{handleEditButtonClick}
	profileItem={artistItem}
	heading3={artistItem.title}
	isUppercase={artistItem.type !== 'customArtist'}
	showEditIcon={artistItem.type === 'artistOfTheMoment' || artistItem.type === 'customArtist'}
	showEditButtonAriaLabel={artistItem.type === 'artistOfTheMoment'
		? $translationsStore.profilePage.profilePageYourArtistsOnProfileEditArtistButtonAriaLabel
		: $translationsStore.profilePage.profilePageYourArtistsOnProfileEditCustomArtistButtonAriaLabel}
	showEditIconAriaLabel={artistItem.type === 'artistOfTheMoment'
		? $translationsStore.profilePage.profilePageYourArtistsOnProfileEditArtistIconAriaLabel
		: $translationsStore.profilePage.profilePageYourArtistsOnProfileEditCustomArtistIconAriaLabel}
/>
