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
				$userInfo?._id &&
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.artistsLimit
			) {
				const updateMostListenedArtistsResponse = await updateMostListenedArtists(
					$userInfo?._id,
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.artistsLimit,
					$userInfo?.tickets,
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems,
					nextFreeUpdate
				);

				if (!updateMostListenedArtistsResponse.error) {
					userInfo.update((currentUser) => {
						if (!currentUser || !currentUser.connectedStreamings.spotify) return currentUser;

						return {
							...currentUser,
							connectedStreamings: {
								...currentUser.connectedStreamings,
								spotify: {
									...currentUser.connectedStreamings.spotify,
									mostListenedArtists: {
										artistsLimit: updateMostListenedArtistsResponse.limit,
										mostListenedArtistItem: updateMostListenedArtistsResponse.mostListenedArtist,
										mostListenedArtistsItems: updateMostListenedArtistsResponse.mostListenedArtists,
										nextFreeUpdate: updateMostListenedArtistsResponse.nextFreeUpdate
									}
								}
							},
							artists: {
								artistsWhoWereWithYou: updateMostListenedArtistsResponse.artistsWhoWereWithYou
							}
						};
					});

					toastStore.set({
						showToast: true,
						toastType: 'success',
						toastMessage:
							$translationsStore.myMusicalProfilePage.myMusicalProfilePageUpdateArtistsSuccessToast
					});
				} else {
					toastStore.set({
						showToast: true,
						toastType: 'error',
						toastMessage:
							$translationsStore.myMusicalProfilePage.myMusicalProfilePageUpdateArtistsErrorToast
					});
				}
			}
		} else if (sessionType === 'tracks') {
			if (
				$userInfo?._id &&
				$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.tracksLimit
			) {
				const updateMostListenedTracksResponse = await updateMostListenedTracks(
					$userInfo?._id,
					$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.tracksLimit,
					$userInfo?.tickets,
					$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems,
					nextFreeUpdate
				);

				if (!updateMostListenedTracksResponse.error) {
					userInfo.update((currentUser) => {
						if (!currentUser || !currentUser.connectedStreamings.spotify) return currentUser;

						return {
							...currentUser,
							connectedStreamings: {
								...currentUser.connectedStreamings,
								spotify: {
									...currentUser.connectedStreamings.spotify,
									mostListenedTracks: {
										tracksLimit: updateMostListenedTracksResponse.limit,
										mostListenedTrackItem: updateMostListenedTracksResponse.mostListenedTrack,
										mostListenedTracksItems: updateMostListenedTracksResponse.mostListenedTracks,
										nextFreeUpdate: updateMostListenedTracksResponse.nextFreeUpdate
									}
								}
							},
							tracks: {
								tracksWhoWereWithYou: updateMostListenedTracksResponse.tracksWhoWereWithYou
							}
						};
					});

					toastStore.set({
						showToast: true,
						toastType: 'success',
						toastMessage:
							$translationsStore.myMusicalProfilePage.myMusicalProfilePageUpdateTracksSuccessToast
					});
				} else {
					toastStore.set({
						showToast: true,
						toastType: 'error',
						toastMessage:
							$translationsStore.myMusicalProfilePage.myMusicalProfilePageUpdateTracksErrorToast
					});
				}
			}
		}

		loadingUpdateItem = false;

		return;
	}
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
	<span class="flex flex-col gap-1 text-xs text-t-secondary sm:gap-2 md:flex-row">
		{#if sessionType === 'tracks' && $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.nextFreeUpdate}
			{#if new Date($userInfo.connectedStreamings.spotify.mostListenedTracks.nextFreeUpdate) > new Date()}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdate}

				<strong class="font-medium text-t-primary">
					{new Date(
						$userInfo.connectedStreamings.spotify.mostListenedTracks.nextFreeUpdate
					).toLocaleString($translationsStore.locale, {
						dateStyle: 'short',
						timeStyle: 'short'
					})}
				</strong>
			{:else}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdateAvailable}
			{/if}
		{/if}

		{#if sessionType === 'artists' && $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.nextFreeUpdate}
			{#if new Date($userInfo.connectedStreamings.spotify.mostListenedArtists.nextFreeUpdate) > new Date()}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdate}

				<strong class="font-medium text-t-primary">
					{new Date(
						$userInfo.connectedStreamings.spotify.mostListenedArtists.nextFreeUpdate
					).toLocaleString($translationsStore.locale, {
						dateStyle: 'short',
						timeStyle: 'short'
					})}
				</strong>
			{:else}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdateAvailable}
			{/if}
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
