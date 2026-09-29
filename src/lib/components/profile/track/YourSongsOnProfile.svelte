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

	// Props
	export let openChangeYourItemsModal: (itemType: 'music') => void;
	export let openSelectYourItemsModal: (itemType: 'music') => void;
	export let openChangeCustomItemModal: (itemType: 'music') => void;
	export let openSelectCustomItemModal: (itemType: 'music') => void;

	$: songsItems = [
		{
			trackItem: $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.oneYear[0],
			type: 'mostListenedTrack'
		},
		{ trackItem: $userInfo?.tracks?.trackOfTheMoment?.track, type: 'trackOfTheMoment' },
		{ trackItem: $userInfo?.tracks?.customTrack?.track, type: 'customTrack' }
	];

	let showShareDataModal = false;
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
		{#each songsItems as { trackItem, type }, i (i)}
			{#if trackItem}
				<YourSongsOnProfileItem
					trackItem={{ item: trackItem, type }}
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
		shareDataCloseModalButtonAriaLabel={$translationsStore.profilePage
			.profilePageShareSongsCloseModalButtonAriaLabel}
		shareDataCloseModalIconAriaLabel={$translationsStore.profilePage
			.profilePageShareSongsCloseModalIconAriaLabel}
		paragraph1={$translationsStore.profilePage.profilePageShareSongsParagraph1}
		paragraph2={$translationsStore.profilePage.profilePageShareSongsParagraph2}
		cancelButtonText={$translationsStore.profilePage.profilePageShareSongsCancelButtonText}
		shareButtonText={$translationsStore.profilePage.profilePageShareSongsShareButtonText}
	/>
{/if}
