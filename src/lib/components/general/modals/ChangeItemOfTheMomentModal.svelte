<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Components
	import Modal from '$lib/components/general/modals/Modal.svelte';
	import ChangeTrackOfTheMoment from '$lib/components/profile/track/track-of-the-moment/ChangeTrackOfTheMoment.svelte';
	import ChangeArtistOfTheMoment from '$lib/components/profile/artist/artist-of-the-moment/ChangeArtistOfTheMoment.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeChangeItemOfTheMomentModal: () => void;
	export let itemType: 'artist' | 'music';

	function getCloseModalAriaLabel() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourArtistCloseModalAriaLabel
			: $translationsStore.profilePage.profilePageChangeYourMusicCloseModalAriaLabel;
	}

	function getCloseModalAltText() {
		return itemType === 'artist'
			? $translationsStore.profilePage.profilePageChangeYourArtistCloseModalAltText
			: $translationsStore.profilePage.profilePageChangeYourMusicCloseModalAltText;
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<Modal
	closeModal={closeChangeItemOfTheMomentModal}
	closeModalAriaLabel={getCloseModalAriaLabel()}
	closeModalAltText={getCloseModalAltText()}
	additionalClasses="max-h-[90vh] w-full max-w-3xl"
>
	<div class="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
		<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageChangeYourArtistParagraph1
				: $translationsStore.profilePage.profilePageChangeYourMusicParagraph1}
		</p>

		<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageChangeYourArtistParagraph2
				: $translationsStore.profilePage.profilePageChangeYourMusicParagraph2}
		</p>

		{#if itemType === 'artist'}
			<ChangeArtistOfTheMoment {closeChangeItemOfTheMomentModal} />
		{:else}
			<ChangeTrackOfTheMoment {closeChangeItemOfTheMomentModal} />
		{/if}
	</div>
</Modal>
