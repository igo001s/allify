<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Components
	import Modal from '$lib/components/general/modals/Modal.svelte';
	import SelectCustomArtist from '$lib/components/profile/artist/custom-artist/SelectCustomArtist.svelte';
	import SelectCustomTrack from '$lib/components/profile/track/custom-track/SelectCustomTrack.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeSelectCustomItemModal: () => void;
	export let itemType: 'artist' | 'music';

	function getCloseModalAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageSelectYourCustomArtistCloseModalAriaLabel
			: $translationsStore.profilePage.profilePageSelectYourCustomMusicCloseModalAriaLabel;
	}

	function getCloseModalAltText() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageSelectYourCustomArtistCloseModalAltText
			: $translationsStore.profilePage.profilePageSelectYourCustomMusicCloseModalAltText;
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<Modal
	closeModal={closeSelectCustomItemModal}
	closeModalAriaLabel={getCloseModalAriaLabel()}
	closeModalAltText={getCloseModalAltText()}
	additionalClasses="max-h-[90vh] w-full max-w-3xl"
>
	<div class="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
		<p class="text-lg font-bold text-t-primary sm:text-xl">
			{$translationsStore.profilePage.profilePageSelectYourCustomItemParagraph1}
		</p>

		<p class="text-xs text-t-secondary sm:text-sm">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageSelectYourCustomArtistParagraph2
				: $translationsStore.profilePage.profilePageSelectYourCustomMusicParagraph2}
		</p>

		{#if itemType === 'artist'}
			<SelectCustomArtist {closeSelectCustomItemModal} />
		{:else if itemType === 'music'}
			<SelectCustomTrack {closeSelectCustomItemModal} />
		{/if}
	</div>
</Modal>
