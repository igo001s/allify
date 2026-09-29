<script lang="ts">
	// Components
	import Modal from '$lib/components/general/modals/Modal.svelte';
	import ChangeCustomArtist from '$lib/components/profile/artist/custom-artist/ChangeCustomArtist.svelte';
	import ChangeCustomTrack from '$lib/components/profile/track/custom-track/ChangeCustomTrack.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeChangeCustomItemModal: () => void;
	export let itemType: 'artist' | 'music';

	function getCloseModalButtonAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourCustomArtistCloseModalButtonAriaLabel
			: $translationsStore.profilePage.profilePageChangeYourCustomMusicCloseModalButtonAriaLabel;
	}

	function getCloseModalIconAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourCustomArtistCloseModalIconAriaLabel
			: $translationsStore.profilePage.profilePageChangeYourCustomMusicCloseModalIconAriaLabel;
	}
</script>

<Modal
	closeModal={closeChangeCustomItemModal}
	closeModalButtonAriaLabel={getCloseModalButtonAriaLabel()}
	closeModalIconAriaLabel={getCloseModalIconAriaLabel()}
	additionalClasses="max-h-[90vh] w-full max-w-3xl"
>
	<p class="text-lg font-bold text-t-primary sm:text-xl">
		{$translationsStore.profilePage.profilePageChangeYourCustomItemParagraph1}
	</p>

	<p class="text-xs text-t-secondary sm:text-sm">
		{itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourCustomArtistParagraph2
			: $translationsStore.profilePage.profilePageChangeYourCustomMusicParagraph2}
	</p>

	{#if itemType === 'artist'}
		<ChangeCustomArtist {closeChangeCustomItemModal} />
	{:else if itemType === 'music'}
		<ChangeCustomTrack {closeChangeCustomItemModal} />
	{/if}
</Modal>
