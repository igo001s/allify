<script lang="ts">
	// Components
	import MostListenedItemCard from '$lib/components/general/cards/MostListenedItemCard.svelte';
	import MoreMyMusicalProfileItems from './MoreMyMusicalProfileItems.svelte';
	import PossibleActionsMyMusicalProfile from './PossibleActionsMyMusicalProfile.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let sessionType: 'artists' | 'tracks';

	// Reactive values
	$: mostListenedItems =
		sessionType === 'artists'
			? ($userInfo?.connectedStreamings?.spotify?.mostListenedArtists?.[periodTime] as
					ArtistSpotify[] | undefined)
			: ($userInfo?.connectedStreamings?.spotify?.mostListenedTracks?.[periodTime] as
					TrackSpotify[] | undefined);
	$: artists = $userInfo?.connectedStreamings.spotify?.mostListenedArtists;
	$: tracks = $userInfo?.connectedStreamings.spotify?.mostListenedTracks;
	$: shouldShowMusicalItems =
		sessionType === 'artists' ? (artists?.artistsLimit ?? 0) < 50 : (tracks?.tracksLimit ?? 0) < 50;
	$: hasNextFreeUpdate =
		sessionType === 'artists'
			? artists?.nextFreeUpdate !== undefined
			: tracks?.nextFreeUpdate !== undefined;
	$: shouldShowNextFreeUpdateDate =
		sessionType === 'artists'
			? artists?.nextFreeUpdate !== undefined && new Date(artists.nextFreeUpdate) > new Date()
			: tracks?.nextFreeUpdate !== undefined && new Date(tracks.nextFreeUpdate) > new Date();

	let periodTime: 'oneYear' | 'sixMonths' | 'fourWeeks' = 'oneYear';
	let currentBatch = 0;
	let batchs: (ArtistSpotify | TrackSpotify)[][];

	$: {
		batchs = [];

		if (mostListenedItems) {
			for (let i = 0; i < mostListenedItems.length; i += 6) {
				batchs.push(mostListenedItems.slice(i, i + 6));
			}
		}
	}
</script>

<div class="flex flex-col gap-10">
	<div class="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
		<h2 class="heading-2">
			{#if sessionType === 'artists'}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtistsHeading2}
			{:else if sessionType === 'tracks'}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracksHeading2}
			{/if}
		</h2>

		<PossibleActionsMyMusicalProfile {sessionType} />
	</div>

	<div class="flex flex-col gap-12 lg:gap-16">
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-4 sm:flex-row sm:self-end">
				{#each ['oneYear', 'sixMonths', 'fourWeeks'] as period, i (i)}
					<button
						class={`button-primary px-4.5 py-2.5 text-center text-xs sm:w-fit sm:text-base ${periodTime === period ? 'bg-brand-primary-dark!' : ''}`}
						aria-pressed={periodTime === period}
						disabled={periodTime === period}
						on:click={() => (periodTime = period as typeof periodTime)}
					>
						{#if period === 'oneYear'}
							{$translationsStore.myMusicalProfilePage.myMusicalProfilePagePeriodButtonOneYear}
						{:else if period === 'sixMonths'}
							{$translationsStore.myMusicalProfilePage.myMusicalProfilePagePeriodButtonSixMonths}
						{:else if period === 'fourWeeks'}
							{$translationsStore.myMusicalProfilePage.myMusicalProfilePagePeriodButtonFourWeeks}
						{/if}
					</button>
				{/each}
			</div>

			<div class="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2 lg:grid-rows-2 2xl:grid-cols-3">
				{#each batchs[currentBatch] as item, i (item.id)}
					<MostListenedItemCard {item} index={i} itemType={sessionType} {currentBatch} />
				{/each}
			</div>

			{#if mostListenedItems?.length && mostListenedItems?.length > 6}
				<div class="itesm-center mx-auto flex gap-4">
					{#each batchs, i (i)}
						<button
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
