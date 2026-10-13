<script lang="ts">
	// Components
	import MostListenedItemCard from '$lib/components/general/cards/MostListenedItemCard.svelte';
	import MoreMyMusicalProfileItems from './MoreMyMusicalProfileItems.svelte';
	import PossibleActionsMyMusicalProfile from './PossibleActionsMyMusicalProfile.svelte';
	import ShareDataModal from '../general/modals/ShareDataModal.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';
	import type { TrackItems } from '$lib/types/Tracks.type';
	import type { ArtistItems } from '$lib/types/Artists.type';
	import type { ShareDataContent } from '$lib/types/Share.type';

	// Props
	export let sessionType: 'artists' | 'tracks';

	let periodTime: 'oneYear' | 'sixMonths' | 'fourWeeks' = 'oneYear';
	let showShareDataModal: boolean = false;
	let currentBatch = 0;
	let batchs: (ArtistSpotify | TrackSpotify)[][];

	const periodTimeArr = ['oneYear', 'sixMonths', 'fourWeeks'] as [
		'oneYear',
		'sixMonths',
		'fourWeeks'
	];

	$: mostListenedItems =
		sessionType === 'artists'
			? ($userInfo?.connectedStreamings?.spotify?.mostListenedArtists?.[periodTime] as
					ArtistSpotify[] | undefined)
			: ($userInfo?.connectedStreamings?.spotify?.mostListenedTracks?.[periodTime] as
					TrackSpotify[] | undefined);
	$: artists = $userInfo?.connectedStreamings.spotify?.mostListenedArtists;
	$: tracks = $userInfo?.connectedStreamings.spotify?.mostListenedTracks;
	$: shouldShowMusicalItems =
		sessionType === 'artists' ? (artists?.artistsLimit ?? 0) < 30 : (tracks?.tracksLimit ?? 0) < 30;
	$: hasNextFreeUpdate =
		sessionType === 'artists'
			? artists?.nextFreeUpdate !== undefined
			: tracks?.nextFreeUpdate !== undefined;
	$: shouldShowNextFreeUpdateDate =
		sessionType === 'artists'
			? artists?.nextFreeUpdate !== undefined && new Date(artists.nextFreeUpdate) > new Date()
			: tracks?.nextFreeUpdate !== undefined && new Date(tracks.nextFreeUpdate) > new Date();
	$: shareData = [1, 2, 3].map((top) => {
		return {
			type: 'ranking',
			title: `${top}º lugar`,
			item: mostListenedItems![top - 1]
		};
	}) as TrackItems[] | ArtistItems[];
	$: {
		batchs = [];

		if (mostListenedItems) {
			for (let i = 0; i < mostListenedItems.length; i += 6) {
				batchs.push(mostListenedItems.slice(i, i + 6));
			}
		}
	}

	function handleSelectPeriod(period: 'oneYear' | 'sixMonths' | 'fourWeeks') {
		periodTime = period;

		currentBatch = 0;
	}

	function buildShareDataContent(dataType: 'Artists' | 'Songs'): ShareDataContent {
		return {
			shareDataModalUserImage: $userInfo?.image ? $userInfo?.image : '',
			shareDataModalUserName: $userInfo?.name ? $userInfo?.name : '',
			shareDataCloseModalButtonAriaLabel:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}CloseModalButtonAriaLabel`
				],
			shareDataCloseModalIconAriaLabel:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}CloseModalIconAriaLabel`
				],
			shareDataType:
				$translationsStore.myMusicalProfilePage[`myMusicalProfilePageShareModalPreview`],
			shareDataModalParagraph1:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalParagraph1`
				],
			shareDataModalParagraph2:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalParagraph2`
				],
			shareDataModalPreviewParagraph1:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalPreviewParagraph1`
				],
			shareDataModalPreviewParagraph2:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalPreviewParagraph2`
				],
			shareDataModalPreviewParagraph3:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalPreviewParagraph3`
				],
			fileName:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalFileName`
				],
			fileTitle:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalFileTitle`
				],
			fileText:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalFileText`
				],
			toastErrorMessage:
				$translationsStore.myMusicalProfilePage[
					`myMusicalProfilePageShare${dataType}ModalToastError`
				]
		};
	}
</script>

<div class="flex flex-col gap-8">
	<div class="mb-3 flex flex-col gap-4 md:flex-row md:justify-between">
		<h2 class="heading-2">
			{#if sessionType === 'artists'}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtistsHeading2}
			{:else if sessionType === 'tracks'}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracksHeading2}
			{/if}
		</h2>

		<div class="space-y-8">
			<PossibleActionsMyMusicalProfile bind:showShareDataModal {sessionType} />

			<div class="flex w-full flex-row gap-1 rounded-lg bg-s-muted p-1 sm:self-end md:w-fit">
				{#each periodTimeArr as period (period)}
					<button
						type="button"
						aria-pressed={periodTime === period}
						class={`w-1/3 rounded-md px-4 py-2 text-xs md:w-fit md:px-6.5 md:py-2.5 ${
							periodTime === period
								? 'bg-brand-primary font-medium text-t-inverse'
								: 'cursor-pointer text-t-secondary hover:bg-brand-primary/10 hover:text-t-primary'
						}`}
						on:click={() => handleSelectPeriod(period)}
					>
						{#if period === 'oneYear'}
							{$translationsStore.myMusicalProfilePage.myMusicalProfilePagePeriodButtonOneYear}
						{:else if period === 'sixMonths'}
							{$translationsStore.myMusicalProfilePage.myMusicalProfilePagePeriodButtonSixMonths}
						{:else}
							{$translationsStore.myMusicalProfilePage.myMusicalProfilePagePeriodButtonFourWeeks}
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<div class="flex flex-col gap-12 lg:gap-16">
		<div class="flex flex-col gap-8">
			<div class="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2 lg:grid-rows-2 2xl:grid-cols-3">
				{#each batchs[currentBatch] as item, i (item.id)}
					<MostListenedItemCard {item} index={i} itemType={sessionType} {currentBatch} />
				{/each}
			</div>

			{#if mostListenedItems?.length && mostListenedItems?.length > 6}
				<div class="itesm-center mx-auto flex gap-4">
					{#each batchs, i (i)}
						<button
							type="button"
							class={`${currentBatch === i ? 'border-brand-primary bg-brand-primary/20 font-medium' : 'cursor-pointer border-transparent hover:bg-brand-primary/10'} rounded-lg border px-3 py-1.5 text-xs lg:px-4 lg:py-2 lg:text-sm`}
							on:click={() => (currentBatch = i)}
						>
							{i + 1}
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<span class="text-center text-xs text-t-secondary">
			{#if shouldShowMusicalItems}
				{#if shouldShowNextFreeUpdateDate}
					{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageNextFreeUpdateShowMoreFiveArtists}

					<strong class="font-medium text-t-primary">
						{#if sessionType === 'artists' && $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate}
							{new Date(
								$userInfo.connectedStreamings.spotify.mostListenedArtists.nextFreeUpdate
							).toLocaleString($translationsStore.locale, {
								dateStyle: 'short',
								timeStyle: 'short'
							})}
						{:else if sessionType === 'tracks' && $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate}
							{new Date(
								$userInfo.connectedStreamings.spotify.mostListenedTracks.nextFreeUpdate
							).toLocaleString($translationsStore.locale, {
								dateStyle: 'short',
								timeStyle: 'short'
							})}
						{/if}
					</strong>
				{:else if hasNextFreeUpdate}
					{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageNextFreeUpdateShowMoreFiveArtistsAvailable}
				{/if}
			{:else}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageFiftyArtistsReached}
			{/if}
		</span>

		{#if shouldShowMusicalItems}
			<MoreMyMusicalProfileItems additionalItemsType={sessionType} />
		{/if}
	</div>
</div>

{#if showShareDataModal}
	<ShareDataModal
		bind:showShareDataModal
		shareDataFrom="myMusicalProfile"
		dataToShare={shareData}
		buildShareDataContent={buildShareDataContent(sessionType === 'artists' ? 'Artists' : 'Songs')}
	/>
{/if}
