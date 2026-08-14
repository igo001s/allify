<script lang="ts">
	// Assets
	import ReloadIcon from '$lib/assets/images/icons/ReloadIcon.svelte';
	import ShareIcon from '$lib/assets/images/icons/ShareIcon.svelte';
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { updateMostListenedArtists } from '$lib/services/user/updates/updateMostListenedArtists';
	import { updateMostListenedTracks } from '$lib/services/user/updates/updateMostListenedTracks';

	// Props
	export let nextFreeUpdate: Date | undefined;
	export let sessionType: 'artists' | 'tracks';

	let loadingUpdateItem = false;

	async function handleUpdateClick() {
		loadingUpdateItem = true;

		if (sessionType === 'artists') {
			if (
				$userInfo?.email &&
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.artistsLimit
			) {
				const response = await updateMostListenedArtists(
					$userInfo?._id,
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.artistsLimit,
					$userInfo?.tickets,
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems,
					nextFreeUpdate
				);

				if (!response) {
					loadingUpdateItem = false;

					return;
				}

				toastStore.set({
					showToast: true,
					toastType: 'success',
					toastMessage:
						$translationsStore.myMusicalProfilePage.myMusicalProfilePageUpdateArtistsSuccessToast
				});

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
						},
						artists: {
							artistsWhoWereWithYou: response.artistsWhoWereWithYou
						}
					};
				});
			}
		} else if (sessionType === 'tracks') {
			if (
				$userInfo?.email &&
				$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.tracksLimit
			) {
				const response = await updateMostListenedTracks(
					$userInfo?._id,
					$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.tracksLimit,
					$userInfo?.tickets,
					$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems,
					nextFreeUpdate
				);

				if (!response) {
					loadingUpdateItem = false;

					return;
				}

				toastStore.set({
					showToast: true,
					toastType: 'success',
					toastMessage:
						$translationsStore.myMusicalProfilePage.myMusicalProfilePageUpdateTracksSuccessToast
				});

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
						},
						tracks: {
							tracksWhoWereWithYou: response.tracksWhoWereWithYou
						}
					};
				});
			}
		}

		loadingUpdateItem = false;
	}
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
	<span class="flex flex-col gap-1 text-xs text-t-secondary sm:gap-2 md:flex-row">
		{#if sessionType === 'tracks' && $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate && new Date($userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate) > new Date()}
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdate}

			<strong class="font-medium text-t-primary">
				{new Date(
					$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate
				).toLocaleString($translationsStore.locale, {
					dateStyle: 'short',
					timeStyle: 'short'
				})}
			</strong>
		{:else if sessionType === 'tracks' && $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate && new Date($userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate) < new Date()}
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdateAvailable}
		{/if}

		{#if sessionType === 'artists' && $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate && new Date($userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate) > new Date()}
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdate}

			<strong class="font-medium text-t-primary">
				{new Date(
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate
				).toLocaleString($translationsStore.locale, {
					dateStyle: 'short',
					timeStyle: 'short'
				})}
			</strong>
		{:else if sessionType === 'artists' && $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate && new Date($userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate) < new Date()}
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdateAvailable}
		{/if}
	</span>

	<div class="flex gap-3">
		<button
			on:click={handleUpdateClick}
			disabled={loadingUpdateItem}
			class="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand-primary/20 bg-white px-4 py-2.5 text-xs font-medium text-brand-primary transition-all hover:border-brand-primary/40 hover:bg-brand-primary/5 sm:flex-none"
		>
			{#if loadingUpdateItem}
				<DotsLoading dotsTheme="base-primary" animationClass="h-1 w-1" />
			{:else}
				<ReloadIcon
					iconSvgClass="h-4 w-4 text-brand-primary transition-transform duration-200 group-hover:rotate-90"
					iconAltText={$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageReloadIconAltText}
				/>

				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageButtonUpdate}
			{/if}
		</button>

		<button
			class="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand-primary/20 bg-white px-4 py-2.5 text-xs font-medium text-brand-primary transition-all hover:border-brand-primary/40 hover:bg-brand-primary/5 sm:flex-none"
		>
			<ShareIcon
				iconSvgClass="h-4 w-4 text-brand-primary"
				iconAltText={$translationsStore.myMusicalProfilePage.myMusicalProfilePageShareIconAltText}
			/>

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShareButton}
		</button>
	</div>
</div>
