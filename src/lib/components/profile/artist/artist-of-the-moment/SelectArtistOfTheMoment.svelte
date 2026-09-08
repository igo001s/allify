<script lang="ts">
	// Components
	import SelectArtistCardOnProfile from '$lib/components/profile/artist/SelectArtistCardOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { updateArtistOfTheMoment } from '$lib/services/user/updates/updateArtistOfTheMoment';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Props
	export let closeSelectItemOfTheMomentModal: () => void;

	let choosedArtist: ArtistSpotify | undefined = undefined;

	function handleArtistSelection(artist: ArtistSpotify) {
		if (choosedArtist?.id === artist.id) {
			choosedArtist = undefined;
			return;
		}

		choosedArtist = artist;
	}

	async function handleSelectArtistOfTheMoment() {
		if (!choosedArtist || !$userInfo?._id) return;

		const updateArtistOfTheMomentResponse = await updateArtistOfTheMoment(
			$userInfo._id,
			choosedArtist,
			$userInfo.tickets,
			$userInfo.artists?.artistOfTheMoment?.nextFreeUpdate
		);

		if (!updateArtistOfTheMomentResponse?.error) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					artists: {
						...currentUser.artists,
						artistOfTheMoment: {
							artist: updateArtistOfTheMomentResponse.artist,
							nextFreeUpdate: updateArtistOfTheMomentResponse.nextFreeUpdate
						}
					}
				};
			});

			closeSelectItemOfTheMomentModal();

			toastStore.set({
				showToast: true,
				toastType: 'success',
				toastMessage: $translationsStore.profilePage.profilePageSelectYourArtistSuccessToastMessage
			});
		} else {
			if (updateArtistOfTheMomentResponse.errorType === 'ticketUsageFailed') return;

			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage: $translationsStore.profilePage.profilePageSelectYourArtistErrorToastMessage
			});
		}

		return;
	}
</script>

<div class="flex w-full flex-col gap-4">
	<div class="max-h-60 overflow-y-auto pr-2 sm:max-h-96">
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems as artist}
				<SelectArtistCardOnProfile {artist} {choosedArtist} {handleArtistSelection} />
			{/each}
		</div>

		{#if $userInfo?.artists?.artistsWhoWereWithYou?.length}
			<div class="mt-4 flex flex-col gap-3">
				<p class="text-sm font-semibold text-t-primary">
					{$translationsStore.profilePage.profilePageSelectYourArtistsWhoWereWithYou}
				</p>

				<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
					{#each $userInfo.artists.artistsWhoWereWithYou as artist}
						<SelectArtistCardOnProfile {artist} {choosedArtist} {handleArtistSelection} />
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<p class="text-center text-[10px] leading-relaxed text-t-secondary sm:text-[11px]">
		{$translationsStore.profilePage.profilePageSelectYourArtistUnlockMoreMusic}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button class="button-secondary px-6 py-2.5" on:click={closeSelectItemOfTheMomentModal}>
			{$translationsStore.profilePage.profilePageSelectYourItemsModalCloseModal}
		</button>

		<button
			disabled={!choosedArtist}
			class="button-primary gap-3 px-6 py-2.5"
			on:click={handleSelectArtistOfTheMoment}
		>
			{$translationsStore.profilePage.profilePageSelectYourItemsModalSaveChanges}
		</button>
	</div>
</div>
