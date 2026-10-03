<script lang="ts">
	// Assets
	import ShareIcon from '$lib/assets/icons/ShareIcon.svelte';

	// Components
	import YourArtistOnProfileItem from '$lib/components/profile/artist/YourArtistsOnProfileItem.svelte';
	import EmptyArtistOfTheMoment from '$lib/components/profile/artist/artist-of-the-moment/EmptyArtistOfTheMoment.svelte';
	import EmptyCustomArtist from '$lib/components/profile/artist/custom-artist/EmptyCustomArtist.svelte';
	import ShareDataModal from '$lib/components/general/modals/ShareDataModal.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Types
	import type { ArtistItems } from '$lib/types/Artists.type';
	import type { ShareDataContent } from '$lib/types/Share.type';

	// Props
	export let openChangeYourItemsModal: (itemType: 'artist') => void;
	export let openSelectYourItemsModal: (itemType: 'artist') => void;
	export let openChangeCustomItemModal: (itemType: 'artist') => void;
	export let openSelectCustomItemModal: (itemType: 'artist') => void;

	let showShareDataModal = false;

	$: artistItems = [
		{
			type: 'mostListenedArtist',
			title: $translationsStore.profilePage.profilePageYourArtistsOnProfileHeading3v1,
			item: $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.oneYear[0]
		},
		{
			type: 'artistOfTheMoment',
			title: $translationsStore.profilePage.profilePageYourArtistsOnProfileHeading3v2,
			item: $userInfo?.artists?.artistOfTheMoment?.artist
		},
		{
			type: 'customArtist',
			title: $userInfo?.artists?.customArtist?.title,
			item: $userInfo?.artists?.customArtist?.artist
		}
	] as ArtistItems[];

	function buildShareDataContent(dataType: 'Artists'): ShareDataContent {
		return {
			shareDataModalUserImage: $userInfo?.image ? $userInfo.image : '',
			shareDataModalUserName: $userInfo?.name ? $userInfo?.name : '',
			shareDataCloseModalButtonAriaLabel:
				$translationsStore.profilePage[`profilePageShare${dataType}CloseModalButtonAriaLabel`],
			shareDataCloseModalIconAriaLabel:
				$translationsStore.profilePage[`profilePageShare${dataType}CloseModalIconAriaLabel`],
			shareDataType: $translationsStore.profilePage.profilePageShareModalPreviewProfile,
			shareDataModalParagraph1:
				$translationsStore.profilePage[`profilePageShare${dataType}ModalParagraph1`],
			shareDataModalParagraph2:
				$translationsStore.profilePage[`profilePageShare${dataType}ModalParagraph2`],
			shareDataModalPreviewParagraph1:
				$translationsStore.profilePage[`profilePageShare${dataType}ModalPreviewParagraph1`],
			shareDataModalPreviewParagraph2:
				$translationsStore.profilePage[`profilePageShare${dataType}ModalPreviewParagraph2`],
			shareDataModalPreviewParagraph3:
				$translationsStore.profilePage[`profilePageShare${dataType}ModalPreviewParagraph3`],
			fileName: $translationsStore.profilePage[`profilePageShare${dataType}ModalFileName`],
			fileTitle: $translationsStore.profilePage[`profilePageShare${dataType}ModalFileTitle`],
			fileText: $translationsStore.profilePage[`profilePageShare${dataType}ModalFileText`],
			toastErrorMessage:
				$translationsStore.profilePage[`profilePageShare${dataType}ModalToastError`]
		};
	}

	function handleOpenShareDataModal() {
		if (!artistItems.some((artist) => artist.item === undefined)) {
			showShareDataModal = true;
		} else {
			toastStore.set({
				showToast: true,
				toastType: 'warning',
				toastMessage: $translationsStore.profilePage.profilePageShareArtistsToastWarning
			});
		}
	}
</script>

<section class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="heading-2">
			{$translationsStore.profilePage.profilePageYourArtistsOnProfileHeading2}
		</h2>

		<button
			class="button-outline button-outline-active button-outline-active-hover group relative h-11 w-40 gap-1.5"
			on:click={handleOpenShareDataModal}
		>
			<ShareIcon iconSvgClass="h-4 w-4 text-brand-primary" />

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShareButton}
		</button>
	</div>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each artistItems as { type, title, item }, i (i)}
			{#if item}
				<YourArtistOnProfileItem
					artistItem={{ type, title, item }}
					{openChangeYourItemsModal}
					{openChangeCustomItemModal}
				/>
			{:else if type === 'artistOfTheMoment'}
				<EmptyArtistOfTheMoment {openSelectYourItemsModal} />
			{:else if type === 'customArtist'}
				<EmptyCustomArtist {openSelectCustomItemModal} />
			{/if}
		{/each}
	</div>
</section>

{#if showShareDataModal}
	<ShareDataModal
		bind:showShareDataModal
		shareDataFrom="profile"
		dataToShare={artistItems}
		buildShareDataContent={buildShareDataContent('Artists')}
	/>
{/if}
