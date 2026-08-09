<script lang="ts">
	// Components
	import SelectTrackCardOnProfile from '../SelectTrackCardOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { updateCustomTrack } from '$lib/services/user/updates/updateCustomTrack';

	// Utils
	import { validateCustomItemTitle } from '$lib/utils/validateCustomItemTitle';

	// Types
	import type { TrackSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let closeSelectCustomItemModal: () => void;

	let choosedTrackTitle: string | undefined = '';
	let choosedTrack: TrackSpotify | undefined = undefined;

	let isTrackTitleValid: { typeError: string; error: boolean } = { typeError: '', error: false };

	function handleTrackSelection(track: TrackSpotify) {
		if (choosedTrack?.id === track.id) {
			choosedTrack = undefined;
			return;
		}

		choosedTrack = track;
	}

	function handleTrackTitleInput() {
		isTrackTitleValid = validateCustomItemTitle(choosedTrackTitle || '');
	}

	async function handleSelectCustomTrack() {
		if (!choosedTrackTitle || !choosedTrack || !$userInfo?._id) return;

		const updatedTrack = await updateCustomTrack($userInfo?._id, choosedTrackTitle, choosedTrack);

		if (updatedTrack) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					tracks: {
						...currentUser.tracks,
						customTrack: {
							title: updatedTrack.title,
							track: updatedTrack.track,
							nextFreeUpdate: updatedTrack.nextFreeUpdate
						}
					}
				};
			});
		}

		closeSelectCustomItemModal();
	}
</script>

<div class="flex w-full flex-col gap-4">
	<label class="my-2 flex flex-col gap-1.5 text-sm font-medium text-t-primary">
		{$translationsStore.profilePage.profilePageSelectYourCustomMusicTitleInputLabel}

		<input
			type="text"
			minlength="1"
			maxlength="56"
			class="mt-1 w-full rounded-lg border border-b-default bg-s-muted px-3.5 py-2.5 text-xs text-t-primary transition-all outline-none placeholder:text-t-secondary/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
			placeholder={$translationsStore.profilePage
				.profilePageSelectYourCustomMusicTitleInputPlaceholder}
			on:input={handleTrackTitleInput}
			bind:value={choosedTrackTitle}
		/>

		{#if isTrackTitleValid.error}
			<span class="mt-1 text-[10px] text-status-error sm:text-[11px]">
				{#if isTrackTitleValid.typeError === 'emptyOrTooLong'}
					{$translationsStore.profilePage
						.profilePageSelectYourCustomMusicTitleInputErrorEmptyOrTooLongMessage}
				{:else if isTrackTitleValid.typeError === 'invalidCharacters'}
					{$translationsStore.profilePage
						.profilePageSelectYourCustomMusicTitleInputErrorInvalidCharactersMessage}
				{/if}
			</span>
		{/if}
	</label>

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
		{$translationsStore.profilePage.profilePageSelectYourCustomMusicUnlockMoreMusic}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={closeSelectCustomItemModal}
		>
			{$translationsStore.profilePage.profilePageSelectYourCustomItemModalCloseModal}
		</button>

		<button
			disabled={!choosedTrackTitle || !choosedTrack || isTrackTitleValid.error === true}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={handleSelectCustomTrack}
		>
			{$translationsStore.profilePage.profilePageSelectYourCustomItemModalSaveChanges}
		</button>
	</div>
</div>
