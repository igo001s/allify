<script lang="ts">
	// Components
	import SelectTrackCardOnProfile from '../SelectTrackCardOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { updateTrackOfTheMoment } from '$lib/services/user/updates/updateTrackOfTheMoment';

	// Types
	import type { TrackSpotify } from '$lib/types/SpotifyData.type';

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

		const updatedTrack = await updateTrackOfTheMoment($userInfo?._id, choosedTrack);

		if (updatedTrack) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					tracks: {
						...currentUser.tracks,
						trackOfTheMoment: {
							track: updatedTrack.track,
							updatedAt: updatedTrack.updatedAt
						}
					}
				};
			});
		}

		closeSelectItemOfTheMomentModal();
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
		<button
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={closeSelectItemOfTheMomentModal}
		>
			{$translationsStore.profilePage.profilePageSelectYourItemsModalCloseModal}
		</button>

		<button
			disabled={!choosedTrack}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={handleSelectTrackOfTheMoment}
		>
			{$translationsStore.profilePage.profilePageSelectYourItemsModalSaveChanges}
		</button>
	</div>
</div>
