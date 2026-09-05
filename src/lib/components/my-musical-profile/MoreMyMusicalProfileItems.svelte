<script lang="ts">
	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import Ticket from '$lib/components/general/Ticket.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { updateMostListenedTracksNewLimit } from '$lib/services/user/updates/updateMostListenedTracksNewLimit';
	import { updateMostListenedArtistsNewLimit } from '$lib/services/user/updates/updateMostListenedArtistsNewLimit';

	// MongoDb
	import type { ObjectId } from 'mongodb';

	// Props
	export let additionalItemsType: 'artists' | 'tracks';

	let loadingMoreItems = false;

	async function handleLoadMoreMusicalItems() {
		loadingMoreItems = true;

		const userId = $userInfo?._id as ObjectId;
		const artistsLimit = $userInfo?.connectedStreamings.spotify?.mostListenedArtists
			?.artistsLimit as number;
		const tracksLimit = $userInfo?.connectedStreamings.spotify?.mostListenedTracks
			?.tracksLimit as number;
		const userTickets = $userInfo?.tickets as number;

		if (additionalItemsType === 'artists') {
			const updateMostListenedArtistsNewLimitResponse = await updateMostListenedArtistsNewLimit(
				userId,
				artistsLimit,
				userTickets,
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems,
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate
			);

			if (!updateMostListenedArtistsNewLimitResponse.error) {
				userInfo.update((currentUser) => {
					if (!currentUser || !currentUser.connectedStreamings.spotify) return currentUser;

					return {
						...currentUser,
						connectedStreamings: {
							...currentUser.connectedStreamings,
							spotify: {
								...currentUser.connectedStreamings.spotify,
								mostListenedArtists: {
									artistsLimit: updateMostListenedArtistsNewLimitResponse.limit,
									mostListenedArtistItem:
										updateMostListenedArtistsNewLimitResponse.mostListenedArtist,
									mostListenedArtistsItems:
										updateMostListenedArtistsNewLimitResponse.mostListenedArtists,
									nextFreeUpdate: updateMostListenedArtistsNewLimitResponse.nextFreeUpdate
								}
							}
						}
					};
				});

				toastStore.set({
					showToast: true,
					toastType: 'success',
					toastMessage:
						$translationsStore.myMusicalProfilePage
							.myMusicalProfilePageUpdateMostListenedArtistsSuccessToast
				});
			} else {
				loadingMoreItems = false;

				if (updateMostListenedArtistsNewLimitResponse.errorType === 'ticketUsageFailed') return;

				toastStore.set({
					showToast: true,
					toastType: 'error',
					toastMessage:
						$translationsStore.myMusicalProfilePage
							.myMusicalProfilePageUpdateMostListenedArtistsErrorToast
				});
			}
		} else if (additionalItemsType === 'tracks') {
			const updateMostListenedTracksNewLimitResponse = await updateMostListenedTracksNewLimit(
				userId,
				tracksLimit,
				userTickets,
				$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems,
				$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate
			);

			if (!updateMostListenedTracksNewLimitResponse.error) {
				userInfo.update((currentUser) => {
					if (!currentUser || !currentUser.connectedStreamings.spotify) return currentUser;

					return {
						...currentUser,
						connectedStreamings: {
							...currentUser.connectedStreamings,
							spotify: {
								...currentUser.connectedStreamings.spotify,
								mostListenedTracks: {
									tracksLimit: updateMostListenedTracksNewLimitResponse.limit,
									mostListenedTrackItem: updateMostListenedTracksNewLimitResponse.mostListenedTrack,
									mostListenedTracksItems:
										updateMostListenedTracksNewLimitResponse.mostListenedTracks,
									nextFreeUpdate: updateMostListenedTracksNewLimitResponse.nextFreeUpdate
								}
							}
						}
					};
				});

				toastStore.set({
					showToast: true,
					toastType: 'success',
					toastMessage:
						$translationsStore.myMusicalProfilePage
							.myMusicalProfilePageUpdateMostListenedTracksSuccessToast
				});
			} else {
				loadingMoreItems = false;

				if (updateMostListenedTracksNewLimitResponse.errorType === 'ticketUsageFailed') return;

				toastStore.set({
					showToast: true,
					toastType: 'error',
					toastMessage:
						$translationsStore.myMusicalProfilePage
							.myMusicalProfilePageUpdateMostListenedTracksErrorToast
				});
			}
		}

		setTimeout(() => {
			loadingMoreItems = false;
		}, 1000);
	}
</script>

<button class="button-cta mx-auto" onclick={handleLoadMoreMusicalItems} disabled={loadingMoreItems}>
	<div
		class="flex w-full items-center justify-center gap-3 text-center sm:flex-row sm:text-left"
		class:invisible={loadingMoreItems}
	>
		<span class="text-sm leading-none">
			{#if additionalItemsType === 'artists'}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShowMoreFiveArtistsButton}
			{:else}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShowMoreFiveTracksButton}
			{/if}
		</span>

		{#if additionalItemsType === 'artists' && $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate && new Date($userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate) > new Date()}
			<Ticket usingTicket={true} />
		{/if}

		{#if additionalItemsType === 'tracks' && $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate && new Date($userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate) > new Date()}
			<Ticket usingTicket={true} />
		{/if}
	</div>

	{#if loadingMoreItems}
		<div class="absolute inset-0 flex items-center justify-center">
			<DotsLoading dotsTheme="base-light" />
		</div>
	{/if}
</button>
