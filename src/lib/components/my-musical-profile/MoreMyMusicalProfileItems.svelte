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

	// MongoDB
	import type { ObjectId } from 'mongodb';

	// Types
	import type { UserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let additionalItemsType: 'artists' | 'tracks';

	// Reactive values
	$: artists = $userInfo?.connectedStreamings.spotify?.mostListenedArtists;
	$: tracks = $userInfo?.connectedStreamings.spotify?.mostListenedTracks;
	$: shouldUseArtistsTicket =
		additionalItemsType === 'artists' &&
		artists?.nextFreeUpdate !== undefined &&
		new Date(artists.nextFreeUpdate) > new Date();
	$: shouldUseTracksTicket =
		additionalItemsType === 'tracks' &&
		tracks?.nextFreeUpdate !== undefined &&
		new Date(tracks.nextFreeUpdate) > new Date();

	let loadingMoreItems = false;

	async function handleLoadMoreMusicalItems() {
		loadingMoreItems = true;

		const userId = $userInfo?._id as ObjectId;
		const userTickets = $userInfo?.tickets as number;

		if (additionalItemsType === 'artists') {
			const updateMostListenedArtistsNewLimitResponse = await updateMostListenedArtistsNewLimit(
				userId,
				artists?.artistsLimit as number,
				userTickets,
				artists,
				artists?.nextFreeUpdate
			);

			if (!updateMostListenedArtistsNewLimitResponse.error) {
				userInfo.update((currentUser: UserInfo | undefined) => {
					if (!currentUser || !currentUser.connectedStreamings.spotify) {
						return currentUser;
					}

					return {
						...currentUser,
						connectedStreamings: {
							...currentUser.connectedStreamings,
							spotify: {
								...currentUser.connectedStreamings.spotify,
								mostListenedArtists: {
									artistsLimit: updateMostListenedArtistsNewLimitResponse.limit,
									nextFreeUpdate: updateMostListenedArtistsNewLimitResponse.nextFreeUpdate,
									fourWeeks: updateMostListenedArtistsNewLimitResponse.fourWeeks,
									sixMonths: updateMostListenedArtistsNewLimitResponse.sixMonths,
									oneYear: updateMostListenedArtistsNewLimitResponse.oneYear,
									uniqueArtists: updateMostListenedArtistsNewLimitResponse.uniqueArtists
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

				loadingMoreItems = false;
				return;
			}

			if (updateMostListenedArtistsNewLimitResponse.errorType === 'ticketUsageFailed') {
				loadingMoreItems = false;
				return;
			}

			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage:
					$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageUpdateMostListenedArtistsErrorToast
			});

			loadingMoreItems = false;
			return;
		}

		if (additionalItemsType === 'tracks') {
			const updateMostListenedTracksNewLimitResponse = await updateMostListenedTracksNewLimit(
				userId,
				tracks?.tracksLimit as number,
				userTickets,
				tracks,
				tracks?.nextFreeUpdate
			);

			if (!updateMostListenedTracksNewLimitResponse.error) {
				userInfo.update((currentUser: UserInfo | undefined) => {
					if (!currentUser || !currentUser.connectedStreamings.spotify) {
						return currentUser;
					}

					return {
						...currentUser,
						connectedStreamings: {
							...currentUser.connectedStreamings,
							spotify: {
								...currentUser.connectedStreamings.spotify,
								mostListenedTracks: {
									tracksLimit: updateMostListenedTracksNewLimitResponse.limit,
									nextFreeUpdate: updateMostListenedTracksNewLimitResponse.nextFreeUpdate,
									fourWeeks: updateMostListenedTracksNewLimitResponse.fourWeeks,
									sixMonths: updateMostListenedTracksNewLimitResponse.sixMonths,
									oneYear: updateMostListenedTracksNewLimitResponse.oneYear,
									uniqueTracks: updateMostListenedTracksNewLimitResponse.uniqueTracks
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

				loadingMoreItems = false;
				return;
			}

			if (updateMostListenedTracksNewLimitResponse.errorType === 'ticketUsageFailed') {
				loadingMoreItems = false;
				return;
			}

			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage:
					$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageUpdateMostListenedTracksErrorToast
			});

			loadingMoreItems = false;
			return;
		}

		loadingMoreItems = false;
	}
</script>

<button
	class="button-cta mx-auto w-full lg:w-90 lg:max-w-90"
	onclick={handleLoadMoreMusicalItems}
	disabled={loadingMoreItems}
>
	{#if !loadingMoreItems}
		<div class="flex w-full items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
			<span class="text-sm leading-none">
				{#if additionalItemsType === 'artists'}
					{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShowMoreFiveArtistsButton}
				{:else}
					{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShowMoreFiveTracksButton}
				{/if}
			</span>

			{#if shouldUseArtistsTicket || shouldUseTracksTicket}
				<Ticket usingTicket={true} />
			{/if}
		</div>
	{:else}
		<div class="flex items-center justify-center">
			<DotsLoading dotsTheme="base-light" />
		</div>
	{/if}
</button>
