<script lang="ts">
	// Assets
	import ReloadIcon from '$lib/assets/images/icons/ReloadIcon.svelte';
	import ShareIcon from '$lib/assets/images/icons/ShareIcon.svelte';
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import TicketLabel from '$lib/components/general/TicketLabel.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { updateMostListenedArtists } from '$lib/services/user/updates/updateMostListenedArtists';
	import { updateMostListenedTracks } from '$lib/services/user/updates/updateMostListenedTracks';

	import type { UserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let sessionType: 'artists' | 'tracks';

	// Reactive values
	$: artists = $userInfo?.connectedStreamings.spotify?.mostListenedArtists;
	$: tracks = $userInfo?.connectedStreamings.spotify?.mostListenedTracks;
	$: shouldShowArtistsNextFreeUpdateInfo = (artists?.artistsLimit ?? 0) >= 50;
	$: shouldShowTracksNextFreeUpdateInfo = (tracks?.tracksLimit ?? 0) >= 50;
	$: shouldShowArtistsNextFreeUpdateDate =
		shouldShowArtistsNextFreeUpdateInfo &&
		artists?.nextFreeUpdate !== undefined &&
		new Date(artists.nextFreeUpdate) > new Date();
	$: shouldShowTracksNextFreeUpdateDate =
		shouldShowTracksNextFreeUpdateInfo &&
		tracks?.nextFreeUpdate !== undefined &&
		new Date(tracks.nextFreeUpdate) > new Date();

	let loadingUpdateItem = false;

	async function handleUpdateClick() {
		loadingUpdateItem = true;

		if (sessionType === 'artists') {
			if ($userInfo?._id && artists?.artistsLimit) {
				const updateMostListenedArtistsResponse = await updateMostListenedArtists(
					$userInfo._id,
					artists.artistsLimit,
					$userInfo.tickets,
					artists,
					artists.nextFreeUpdate
				);

				if (!updateMostListenedArtistsResponse.error) {
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
										artistsLimit: updateMostListenedArtistsResponse.limit,
										fourWeeks: updateMostListenedArtistsResponse.fourWeeks,
										sixMonths: updateMostListenedArtistsResponse.sixMonths,
										oneYear: updateMostListenedArtistsResponse.oneYear,
										uniqueArtists: updateMostListenedArtistsResponse.uniqueArtists,
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
					if (updateMostListenedArtistsResponse.errorType === 'ticketUsageFailed') {
						loadingUpdateItem = false;
						return;
					}

					toastStore.set({
						showToast: true,
						toastType: 'error',
						toastMessage:
							$translationsStore.myMusicalProfilePage.myMusicalProfilePageUpdateArtistsErrorToast
					});
				}
			}
		} else {
			if ($userInfo?._id && tracks?.tracksLimit) {
				const updateMostListenedTracksResponse = await updateMostListenedTracks(
					$userInfo._id,
					tracks.tracksLimit,
					$userInfo.tickets,
					tracks,
					tracks.nextFreeUpdate
				);

				if (!updateMostListenedTracksResponse.error) {
					userInfo.update((currentUser) => {
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
										tracksLimit: updateMostListenedTracksResponse.limit,
										fourWeeks: updateMostListenedTracksResponse.fourWeeks,
										sixMonths: updateMostListenedTracksResponse.sixMonths,
										oneYear: updateMostListenedTracksResponse.oneYear,
										uniqueTracks: updateMostListenedTracksResponse.uniqueTracks,
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
					if (updateMostListenedTracksResponse.errorType === 'ticketUsageFailed') {
						loadingUpdateItem = false;
						return;
					}

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
	}
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
	<span class="flex flex-col gap-1 text-xs text-t-secondary sm:gap-2 md:flex-row">
		{#if sessionType === 'tracks' && shouldShowTracksNextFreeUpdateInfo}
			{#if shouldShowTracksNextFreeUpdateDate && tracks?.nextFreeUpdate}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdate}

				<strong class="font-medium text-t-primary">
					{new Date(tracks.nextFreeUpdate).toLocaleString($translationsStore.locale, {
						dateStyle: 'short',
						timeStyle: 'short'
					})}
				</strong>
			{:else}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdateAvailable}
			{/if}
		{/if}

		{#if sessionType === 'artists' && shouldShowArtistsNextFreeUpdateInfo}
			{#if shouldShowArtistsNextFreeUpdateDate && artists?.nextFreeUpdate}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageNextFreeUpdate}

				<strong class="font-medium text-t-primary">
					{new Date(artists.nextFreeUpdate).toLocaleString($translationsStore.locale, {
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
		{#if (sessionType === 'tracks' && shouldShowTracksNextFreeUpdateInfo) || (sessionType === 'artists' && shouldShowArtistsNextFreeUpdateInfo)}
			<button
				on:click={handleUpdateClick}
				disabled={loadingUpdateItem}
				class="button-outline button-outline-active button-outline-active-hover group relative h-11 w-40 gap-1.5"
			>
				{#if loadingUpdateItem}
					<DotsLoading dotsTheme="base-primary" animationClass="h-1 w-1" />
				{:else}
					<ReloadIcon iconSvgClass="h-4 w-4 text-brand-primary group-hover:rotate-90" />
					{$translationsStore.myMusicalProfilePage.myMusicalProfilePageButtonUpdate}

					{#if sessionType === 'artists' && shouldShowArtistsNextFreeUpdateDate}
						<TicketLabel />
					{:else if sessionType === 'tracks' && shouldShowTracksNextFreeUpdateDate}
						<TicketLabel />
					{/if}
				{/if}
			</button>
		{/if}

		<button
			class="button-outline button-outline-active button-outline-active-hover group relative h-11 w-40 gap-1.5"
		>
			<ShareIcon iconSvgClass="h-4 w-4 text-brand-primary" />

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShareButton}
		</button>
	</div>
</div>
