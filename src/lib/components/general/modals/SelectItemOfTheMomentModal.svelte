<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Components
	import Modal from '$lib/components/general/modals/Modal.svelte';
	import SelectArtistOfTheMoment from '$lib/components/profile/artist/artist-of-the-moment/SelectArtistOfTheMoment.svelte';
	import SelectTrackOfTheMoment from '$lib/components/profile/track/track-of-the-moment/SelectTrackOfTheMoment.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeSelectItemOfTheMomentModal: () => void;
	export let itemType: 'artist' | 'music';

	function getCloseModalAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageSelectYourArtistCloseModalAriaLabel
			: $translationsStore.profilePage.profilePageSelectYourMusicCloseModalAriaLabel;
	}

	function getCloseModalAltText() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageSelectYourArtistCloseModalAltText
			: $translationsStore.profilePage.profilePageSelectYourMusicCloseModalAltText;
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<Modal
	closeModal={closeSelectItemOfTheMomentModal}
	closeModalAriaLabel={getCloseModalAriaLabel()}
	closeModalAltText={getCloseModalAltText()}
	additionalClasses="max-h-[90vh] w-full max-w-3xl"
>
	<div class="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
		<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageSelectYourArtistParagraph1
				: $translationsStore.profilePage.profilePageSelectYourMusicParagraph1}
		</p>

		<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageSelectYourArtistParagraph2
				: $translationsStore.profilePage.profilePageSelectYourMusicParagraph2}
		</p>

		{#if itemType === 'artist'}
			<SelectArtistOfTheMoment {closeSelectItemOfTheMomentModal} />
		{:else}
			<SelectTrackOfTheMoment {closeSelectItemOfTheMomentModal} />
		{/if}
	</div>
</Modal>
