<script lang="ts">
	// Components
	import ProfileItemCard from '$lib/components/general/cards/ProfileItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackItems } from '$lib/types/Tracks.type';

	// Props
	export let openChangeYourItemsModal: (itemType: 'music') => void;
	export let openChangeCustomItemModal: (itemType: 'music') => void;
	export let trackItem: TrackItems;

	function handleEditButtonClick() {
		if (trackItem.type === 'trackOfTheMoment') {
			openChangeYourItemsModal('music');
		} else if (trackItem.type === 'customTrack') {
			openChangeCustomItemModal('music');
		}
	}
</script>

<ProfileItemCard
	{handleEditButtonClick}
	profileItem={trackItem}
	heading3={trackItem.title}
	isUppercase={trackItem.type !== 'customTrack'}
	showEditIcon={trackItem.type === 'trackOfTheMoment' || trackItem.type === 'customTrack'}
	showEditButtonAriaLabel={trackItem.type === 'trackOfTheMoment'
		? $translationsStore.profilePage.profilePageYourSongsOnProfileEditMusicButtonAriaLabel
		: $translationsStore.profilePage.profilePageYourSongsOnProfileEditCustomMusicButtonAriaLabel}
	showEditIconAriaLabel={trackItem.type === 'trackOfTheMoment'
		? $translationsStore.profilePage.profilePageYourSongsOnProfileEditMusicIconAriaLabel
		: $translationsStore.profilePage.profilePageYourSongsOnProfileEditCustomMusicIconAriaLabel}
/>
