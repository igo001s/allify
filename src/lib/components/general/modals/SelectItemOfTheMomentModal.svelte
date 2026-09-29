<script lang="ts">
	// Components
	import Modal from '$lib/components/general/modals/Modal.svelte';
	import SelectArtistOfTheMoment from '$lib/components/profile/artist/artist-of-the-moment/SelectArtistOfTheMoment.svelte';
	import SelectTrackOfTheMoment from '$lib/components/profile/track/track-of-the-moment/SelectTrackOfTheMoment.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeSelectItemOfTheMomentModal: () => void;
	export let itemType: 'artist' | 'music';

	function getCloseModalButtonAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageSelectYourArtistCloseModalButtonAriaLabel
			: $translationsStore.profilePage.profilePageSelectYourMusicCloseModalButtonAriaLabel;
	}

	function getCloseModalIconAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageSelectYourArtistCloseModalIconAriaLabel
			: $translationsStore.profilePage.profilePageSelectYourMusicCloseModalIconAriaLabel;
	}
</script>

<Modal
	closeModal={closeSelectItemOfTheMomentModal}
	closeModalButtonAriaLabel={getCloseModalButtonAriaLabel()}
	closeModalIconAriaLabel={getCloseModalIconAriaLabel()}
	additionalClasses="max-h-[90vh] w-full max-w-3xl"
>
	<p class="text-lg font-bold text-t-primary sm:text-xl">
		{itemType === 'artist'
			? $translationsStore.profilePage.profilePageSelectYourArtistParagraph1
			: $translationsStore.profilePage.profilePageSelectYourMusicParagraph1}
	</p>

	<p class="text-xs text-t-secondary sm:text-sm">
		{itemType === 'artist'
			? $translationsStore.profilePage.profilePageSelectYourArtistParagraph2
			: $translationsStore.profilePage.profilePageSelectYourMusicParagraph2}
	</p>

	{#if itemType === 'artist'}
		<SelectArtistOfTheMoment {closeSelectItemOfTheMomentModal} />
	{:else}
		<SelectTrackOfTheMoment {closeSelectItemOfTheMomentModal} />
	{/if}
</Modal>
