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

	$: periodTime = 'oneYear' as 'oneYear' | 'sixMonths' | 'fourWeeks';
	$: mostListenedItems =
		sessionType === 'artists'
			? ($userInfo?.connectedStreamings?.spotify?.mostListenedArtists?.[periodTime] as
					| ArtistSpotify[]
					| undefined)
			: ($userInfo?.connectedStreamings?.spotify?.mostListenedTracks?.[periodTime] as
					| TrackSpotify[]
					| undefined);

	function shouldShowMusicalItems(type: 'artists' | 'tracks'): boolean {
		if (type === 'artists') {
			return ($userInfo?.connectedStreamings.spotify?.mostListenedArtists?.artistsLimit ?? 0) < 50;
		}

		return ($userInfo?.connectedStreamings.spotify?.mostListenedTracks?.tracksLimit ?? 0) < 50;
	}

	function hasNextFreeUpdate(type: 'artists' | 'tracks'): boolean {
		if (type === 'artists') {
			return (
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate !== undefined
			);
		}

		return $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate !== undefined;
	}

	function shouldShowNextFreeUpdateDate(type: 'artists' | 'tracks'): boolean {
		if (type === 'artists') {
			const nextFreeUpdate =
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate;

			return nextFreeUpdate !== undefined && new Date(nextFreeUpdate) > new Date();
		}

		const nextFreeUpdate =
			$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate;

		return nextFreeUpdate !== undefined && new Date(nextFreeUpdate) > new Date();
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
						onclick={() => (periodTime = period as typeof periodTime)}
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

			<div class="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-2 2xl:grid-cols-3">
				{#each mostListenedItems as item, i (item.id)}
					<MostListenedItemCard {item} index={i} itemType={sessionType} />
				{/each}
			</div>
		</div>

		<span class="text-center text-xs text-t-secondary">
			{#if shouldShowMusicalItems(sessionType)}
				{#if shouldShowNextFreeUpdateDate(sessionType)}
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
				{:else if hasNextFreeUpdate(sessionType)}
					{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageNextFreeUpdateShowMoreFiveArtistsAvailable}
				{/if}
			{:else}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageFiftyArtistsReached}
			{/if}
		</span>

		{#if shouldShowMusicalItems(sessionType)}
			<MoreMyMusicalProfileItems additionalItemsType={sessionType} />
		{/if}
	</div>
</div>
