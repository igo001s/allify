<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

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
			const response = await updateMostListenedArtistsNewLimit(
				userId,
				artistsLimit,
				userTickets,
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems,
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate
			);

			if (!response) {
				loadingMoreItems = false;

				return;
			}

			userInfo.update((currentUser) => {
				if (!currentUser || !currentUser.connectedStreamings.spotify) return currentUser;

				return {
					...currentUser,
					connectedStreamings: {
						...currentUser.connectedStreamings,
						spotify: {
							...currentUser.connectedStreamings.spotify,
							connected: currentUser.connectedStreamings.spotify.connected,
							mostListenedArtists: {
								artistsLimit: response.limit,
								mostListenedArtistItem: response.mostListenedArtist,
								mostListenedArtistsItems: response.mostListenedArtists,
								nextFreeUpdate: response.nextFreeUpdate
							}
						}
					}
				};
			});

			setTimeout(() => {
				loadingMoreItems = false;
			}, 1000);
		} else if (additionalItemsType === 'tracks') {
			const response = await updateMostListenedTracksNewLimit(
				userId,
				tracksLimit,
				userTickets,
				$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems,
				$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate
			);

			if (!response) {
				loadingMoreItems = false;

				return;
			}

			userInfo.update((currentUser) => {
				if (!currentUser || !currentUser.connectedStreamings.spotify) return currentUser;

				return {
					...currentUser,
					connectedStreamings: {
						...currentUser.connectedStreamings,
						spotify: {
							...currentUser.connectedStreamings.spotify,
							connected: currentUser.connectedStreamings.spotify.connected,
							mostListenedTracks: {
								tracksLimit: response.limit,
								mostListenedTrackItem: response.mostListenedTrack,
								mostListenedTracksItems: response.mostListenedTracks,
								nextFreeUpdate: response.nextFreeUpdate
							}
						}
					}
				};
			});

			setTimeout(() => {
				loadingMoreItems = false;
			}, 1000);
		}
	}
</script>

<button
	class="relative mx-auto flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-brand-primary px-6 py-3.5 text-sm font-semibold text-t-inverse shadow-lg shadow-brand-primary/25 transition-all duration-300 hover:scale-102 hover:bg-brand-primary-dark sm:w-fit"
	onclick={handleLoadMoreMusicalItems}
	disabled={loadingMoreItems}
>
	<div
		class="flex w-full items-center justify-center gap-3 text-center sm:flex-row sm:text-left"
		class:invisible={loadingMoreItems}
	>
		<span class="text-sm leading-none font-semibold">
			{#if additionalItemsType === 'artists'}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShowMoreFiveArtistsButton}
			{:else}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShowMoreFiveTracksButton}
			{/if}
		</span>

		<div
			class="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-brand-primary shadow-sm"
		>
			<img src={TicketIcon} alt={$translationsStore.generalTexts.ticketAltText} class="h-4 w-4" />

			<span class="text-xs leading-none font-bold">-1</span>
		</div>
	</div>

	{#if loadingMoreItems}
		<div class="absolute inset-0 flex items-center justify-center">
			<DotsLoading dotsTheme="base-light" />
		</div>
	{/if}
</button>
