<script lang="ts">
	// Assets
	import ReloadIcon from '$lib/assets/images/icons/ReloadIcon.svelte';
	import ShareIcon from '$lib/assets/images/icons/ShareIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { updateMostListenedArtists } from '$lib/services/user/updates/updateMostListenedArtists';
	import { updateMostListenedTracks } from '$lib/services/user/updates/updateMostListenedTracks';

	// Props
	export let lastSync: Date | undefined;
	export let sessionType: 'artists' | 'tracks';

	async function handleUpdateClick() {
		if (sessionType === 'artists') {
			if (
				$userInfo?.email &&
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.artistsLimit
			) {
				const response = await updateMostListenedArtists(
					$userInfo?._id,
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.artistsLimit,
					$userInfo?.tickets,
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems
				);

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
									updatedAt: response.updatedAt,
									mostListenedArtistItem: response.mostListenedArtist,
									mostListenedArtistsItems: response.mostListenedArtists
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
					$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems
				);

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
									updatedAt: response.updatedAt,
									mostListenedTrackItem: response.mostListenedTrack,
									mostListenedTracksItems: response.mostListenedTracks
								}
							}
						},
						tracks: {
							tracksWhoWereWithYou: response.tracksWhoWereWithYou
						}
					};
				});

				toastStore.set({
					showToast: true,
					toastType: 'success',
					toastMessage:
						$translationsStore.myMusicalProfilePage.myMusicalProfilePageUpdateTracksSuccessToast
				});
			}
		}
	}
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
	<span class="flex flex-col gap-1 text-xs text-t-secondary sm:gap-2 md:flex-row">
		{$translationsStore.myMusicalProfilePage.myMusicalProfilePageLastUpdate}

		<strong class="font-medium text-t-primary">
			{lastSync
				? new Date(lastSync).toLocaleString($translationsStore.locale, {
						dateStyle: 'short',
						timeStyle: 'short'
					})
				: '-'}
		</strong>
	</span>

	<div class="flex gap-3">
		<button
			on:click={handleUpdateClick}
			class="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand-primary/20 bg-white px-4 py-2.5 text-xs font-medium text-brand-primary transition-all hover:border-brand-primary/40 hover:bg-brand-primary/5 sm:flex-none"
		>
			<ReloadIcon
				iconSvgClass="h-4 w-4 text-brand-primary transition-transform duration-200 group-hover:rotate-90"
				iconAltText={$translationsStore.myMusicalProfilePage.myMusicalProfilePageReloadIconAltText}
			/>

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageButtonUpdate}
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
