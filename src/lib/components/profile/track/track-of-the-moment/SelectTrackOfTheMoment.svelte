<script lang="ts">
	// Components
	import SelectTrackCardOnProfile from '../SelectTrackCardOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { updateTrackOfTheMoment } from '$lib/services/user/updates/updateTrackOfTheMoment';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let closeSelectItemOfTheMomentModal: () => void;

	let choosedTrack: TrackSpotify | undefined = undefined;

	function handleTrackSelection(track: TrackSpotify) {
		if (choosedTrack?.id === track.id) {
			choosedTrack = undefined;
			return;
		}

		choosedTrack = track;
	}

	async function handleSelectTrackOfTheMoment() {
		if (!choosedTrack || !$userInfo?._id) return;

		const updateTrackOfTheMomentResponse = await updateTrackOfTheMoment(
			$userInfo._id,
			choosedTrack,
			$userInfo.tickets,
			$userInfo.tracks?.trackOfTheMoment?.nextFreeUpdate
		);

		if (!updateTrackOfTheMomentResponse?.error) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					tracks: {
						...currentUser.tracks,
						trackOfTheMoment: {
							track: updateTrackOfTheMomentResponse.track,
							nextFreeUpdate: updateTrackOfTheMomentResponse.nextFreeUpdate
						}
					}
				};
			});

			closeSelectItemOfTheMomentModal();

			toastStore.set({
				showToast: true,
				toastType: 'success',
				toastMessage: $translationsStore.profilePage.profilePageSelectYourTrackSuccessToastMessage
			});
		} else {
			if (updateTrackOfTheMomentResponse.errorType === 'ticketUsageFailed') return;

			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage: $translationsStore.profilePage.profilePageSelectYourTrackErrorToastMessage
			});
		}

		return;
	}
</script>

<div class="flex w-full flex-col gap-4">
	<div class="max-h-60 overflow-y-auto pr-2 sm:max-h-96">
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems ?? [] as track}
				<SelectTrackCardOnProfile {track} {choosedTrack} {handleTrackSelection} />
			{/each}
		</div>

		{#if $userInfo?.tracks?.tracksWhoWereWithYou?.length}
			<div class="mt-4 flex flex-col gap-3">
				<p class="text-sm font-semibold text-t-primary">
					{$translationsStore.profilePage.profilePageChangeYourTracksWhoWereWithYou}
				</p>

				<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
					{#each $userInfo?.tracks?.tracksWhoWereWithYou as track}
						<SelectTrackCardOnProfile {track} {choosedTrack} {handleTrackSelection} />
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<p class="text-center text-[10px] leading-relaxed text-t-secondary sm:text-[11px]">
		{$translationsStore.profilePage.profilePageSelectYourMusicUnlockMoreMusic}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button class="button-secondary px-6 py-2.5" on:click={closeSelectItemOfTheMomentModal}>
			{$translationsStore.profilePage.profilePageSelectYourItemsModalCloseModal}
		</button>

		<button
			disabled={!choosedTrack}
			class="button-primary px-6 py-2.5"
			on:click={handleSelectTrackOfTheMoment}
		>
			{$translationsStore.profilePage.profilePageSelectYourItemsModalSaveChanges}
		</button>
	</div>
</div>
