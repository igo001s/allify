<script lang="ts">
	// Assets
	import ShareIcon from '$lib/assets/icons/ShareIcon.svelte';

	// Components
	import YourSongsOnProfileItem from '$lib/components/profile/track/YourSongsOnProfileItem.svelte';
	import EmptyTrackOfTheMoment from '$lib/components/profile/track/track-of-the-moment/EmptyTrackOfTheMoment.svelte';
	import EmptyCustomTrack from '$lib/components/profile/track/custom-track/EmptyCustomTrack.svelte';
	import ShareDataModal from '$lib/components/general/modals/ShareDataModal.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackItems } from '$lib/types/Tracks.type';
	import type { ShareDataContent } from '$lib/types/Share.type';

	// Props
	export let openChangeYourItemsModal: (itemType: 'music') => void;
	export let openSelectYourItemsModal: (itemType: 'music') => void;
	export let openChangeCustomItemModal: (itemType: 'music') => void;
	export let openSelectCustomItemModal: (itemType: 'music') => void;

	let showShareDataModal = false;

	$: songsItems = [
		{
			type: 'mostListenedTrack',
			title: $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v1,
			item: $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.oneYear[0]
		},
		{
			type: 'trackOfTheMoment',
			title: $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v2,
			item: $userInfo?.tracks?.trackOfTheMoment?.track
		},
		{
			type: 'customTrack',
			title: $userInfo?.tracks?.customTrack?.title,
			item: $userInfo?.tracks?.customTrack?.track
		}
	] as TrackItems[];

	function buildShareDataContent(dataType: 'Songs'): ShareDataContent {
		return {
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
</script>

<section class="space-y-7">
	<div class="flex items-center justify-between">
		<h2 class="heading-2">
			{$translationsStore.profilePage.profilePageYourSongsOnProfileHeading2}
		</h2>

		<button
			class="button-outline button-outline-active button-outline-active-hover group relative h-11 w-40 gap-1.5"
			on:click={() => (showShareDataModal = true)}
		>
			<ShareIcon iconSvgClass="h-4 w-4 text-brand-primary" />

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShareButton}
		</button>
	</div>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each songsItems as { type, title, item }, i (i)}
			{#if item}
				<YourSongsOnProfileItem
					trackItem={{ type, title, item }}
					{openChangeYourItemsModal}
					{openChangeCustomItemModal}
				/>
			{:else if type === 'trackOfTheMoment'}
				<EmptyTrackOfTheMoment {openSelectYourItemsModal} />
			{:else if type === 'customTrack'}
				<EmptyCustomTrack {openSelectCustomItemModal} />
			{/if}
		{/each}
	</div>
</section>

{#if showShareDataModal}
	<ShareDataModal
		bind:showShareDataModal
		shareDataFrom="profile"
		dataToShare={songsItems}
		buildShareDataContent={buildShareDataContent('Songs')}
	/>
{/if}
