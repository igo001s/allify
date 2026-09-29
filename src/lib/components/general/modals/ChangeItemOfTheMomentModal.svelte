<script lang="ts">
	// Components
	import Modal from '$lib/components/general/modals/Modal.svelte';
	import ChangeTrackOfTheMoment from '$lib/components/profile/track/track-of-the-moment/ChangeTrackOfTheMoment.svelte';
	import ChangeArtistOfTheMoment from '$lib/components/profile/artist/artist-of-the-moment/ChangeArtistOfTheMoment.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeChangeItemOfTheMomentModal: () => void;
	export let itemType: 'artist' | 'music';

	function getCloseModalButtonAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourArtistCloseModalButtonAriaLabel
			: $translationsStore.profilePage.profilePageChangeYourMusicCloseModalButtonAriaLabel;
	}

	function getCloseModalIconAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourArtistCloseModalIconAriaLabel
			: $translationsStore.profilePage.profilePageChangeYourMusicCloseModalIconAriaLabel;
	}
</script>

<Modal
	closeModal={closeChangeItemOfTheMomentModal}
	closeModalButtonAriaLabel={getCloseModalButtonAriaLabel()}
	closeModalIconAriaLabel={getCloseModalIconAriaLabel()}
	additionalClasses="max-h-[90vh] w-full max-w-3xl"
>
	<p class="text-lg font-bold text-t-primary sm:text-xl">
		{itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourArtistParagraph1
			: $translationsStore.profilePage.profilePageChangeYourMusicParagraph1}
	</p>

	<p class="text-xs text-t-secondary sm:text-sm">
		{itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourArtistParagraph2
			: $translationsStore.profilePage.profilePageChangeYourMusicParagraph2}
	</p>

	{#if itemType === 'artist'}
		<ChangeArtistOfTheMoment {closeChangeItemOfTheMomentModal} />
	{:else}
		<ChangeTrackOfTheMoment {closeChangeItemOfTheMomentModal} />
	{/if}
</Modal>
