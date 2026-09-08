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

	function getCloseModalAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourCustomArtistCloseModalAriaLabel
			: $translationsStore.profilePage.profilePageChangeYourCustomMusicCloseModalAriaLabel;
	}

	function getCloseModalAltText() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourCustomArtistCloseModalAltText
			: $translationsStore.profilePage.profilePageChangeYourCustomMusicCloseModalAltText;
	}
</script>

<Modal
	closeModal={closeChangeCustomItemModal}
	closeModalAriaLabel={getCloseModalAriaLabel()}
	closeModalAltText={getCloseModalAltText()}
>
	<div class="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
		<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
			{$translationsStore.profilePage.profilePageChangeYourCustomItemParagraph1}
		</p>

		<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageChangeYourCustomArtistParagraph2
				: $translationsStore.profilePage.profilePageChangeYourCustomMusicParagraph2}
		</p>

		{#if itemType === 'artist'}
			<ChangeCustomArtist {closeChangeCustomItemModal} />
		{:else if itemType === 'music'}
			<ChangeCustomTrack {closeChangeCustomItemModal} />
		{/if}
	</div>
</Modal>
