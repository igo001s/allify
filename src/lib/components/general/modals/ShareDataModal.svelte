<script lang="ts">
	// App
	import { dev } from '$app/environment';

	// Components
	import Modal from './Modal.svelte';

	// Templates
	import ShareMusicalItemsOnProfileTemplate from '$lib/templates/share/ShareMusicalItemsOnProfileTemplate.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';

	// Librarys
	import { toBlob } from 'html-to-image';

	// Props
	export let itemsType: string;
	export let showShareDataModal: boolean;
	export let shareDataCloseModalButtonAriaLabel: string;
	export let shareDataCloseModalIconAriaLabel: string;
	export let paragraph1: string;
	export let paragraph2: string;
	export let musicalItems: { item: ArtistSpotify | TrackSpotify; type: string }[];

	async function handleShareData() {
		try {
			const element = document.getElementById('share-data-modal');

			if (!element) {
				throw new Error('Share data element not found.');
			}

			const blob = await toBlob(element, {
				cacheBust: true,
				width: 440,
				height: 560,
				pixelRatio: 3,
				backgroundColor: '#ffffff'
			});

			if (!blob) {
				throw new Error('Unable to generate the image.');
			}

			const file = new File(
				[blob],
				itemsType === 'artists'
					? $translationsStore.profilePage.profilePageShareArtistsModalFileName
					: $translationsStore.profilePage.profilePageShareSongsModalFileName,
				{
					type: 'image/png'
				}
			);

			if (navigator.share && navigator.canShare?.({ files: [file] })) {
				await navigator.share({
					files: [file],
					title:
						itemsType === 'artists'
							? $translationsStore.profilePage.profilePageShareArtistsModalFileTitle
							: $translationsStore.profilePage.profilePageShareSongsModalFileTitle,
					text:
						itemsType === 'artists'
							? $translationsStore.profilePage.profilePageShareArtistsModalFileText
							: $translationsStore.profilePage.profilePageShareSongsModalFileText
				});
			}
		} catch (error) {
			if (dev) {
				console.error(`Error sharing ${itemsType} data:`, error);
			}

			if (itemsType === 'artists') {
				toastStore.set({
					showToast: true,
					toastType: 'error',
					toastMessage: $translationsStore.profilePage.profilePageShareArtistsModalToastError
				});
			} else if (itemsType === 'songs') {
				toastStore.set({
					showToast: true,
					toastType: 'error',
					toastMessage: $translationsStore.profilePage.profilePageShareSongsModalToastError
				});
			}
		}
	}
</script>

<Modal
	closeModal={() => (showShareDataModal = false)}
	closeModalButtonAriaLabel={shareDataCloseModalButtonAriaLabel}
	closeModalIconAriaLabel={shareDataCloseModalIconAriaLabel}
	additionalClasses="h-fit w-full max-w-2xl overflow-y-auto"
>
	<div class="space-y-3">
		<p class="text-lg font-bold text-t-primary sm:text-xl">
			{paragraph1}
		</p>

		<p class="text-xs text-t-secondary sm:text-sm">
			{paragraph2}
		</p>
	</div>

	<ShareMusicalItemsOnProfileTemplate {musicalItems} {itemsType} />

	<div class="flex flex-col-reverse mt-2 gap-2 sm:flex-row sm:justify-end sm:gap-3">
		<button class="button-secondary px-6 py-2.5" on:click={() => (showShareDataModal = false)}>
			{$translationsStore.profilePage.profilePageShareModalCancelButtonText}
		</button>

		<button class="button-primary px-6 py-2.5" on:click={handleShareData}>
			{$translationsStore.profilePage.profilePageShareModalShareButtonText}
		</button>
	</div>
</Modal>
