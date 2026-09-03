<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp?enhanced';

	// Components
	import ChangeTrackCardOnProfile from '../ChangeTrackCardOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { updateCustomTrack } from '$lib/services/user/updates/updateCustomTrack';

	// Utils
	import { validateCustomItemTitle } from '$lib/utils/validateCustomItemTitle';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let closeChangeCustomItemModal: () => void;

	let choosedTrackTitle: string | undefined = $userInfo?.tracks?.customTrack?.title || '';
	let choosedTrack: TrackSpotify | undefined = $userInfo?.tracks?.customTrack?.track || undefined;

	let isTrackTitleValid: { typeError: string; error: boolean } | boolean;

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

	async function handleChangeCustomTrack() {
		if (!choosedTrackTitle || !choosedTrack || !$userInfo?._id) return;

		const updatedTrackResponse = await updateCustomTrack(
			$userInfo?._id,
			choosedTrackTitle,
			choosedTrack,
			$userInfo?.tickets,
			$userInfo?.tracks?.customTrack?.nextFreeUpdate
		);

		if (!updatedTrackResponse.error) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					tracks: {
						...currentUser.tracks,
						customTrack: {
							title: updatedTrackResponse.title,
							track: updatedTrackResponse.track,
							nextFreeUpdate: updatedTrackResponse.nextFreeUpdate
						}
					}
				};
			});

			closeChangeCustomItemModal();

			toastStore.set({
				showToast: true,
				toastType: 'success',
				toastMessage: $translationsStore.profilePage.profilePageChangeCustomTrackSuccessToastMessage
			});

			return;
		} else {
			if (updatedTrackResponse.errorType === 'ticketUsageFailed') return;

			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage: $translationsStore.profilePage.profilePageChangeCustomTrackErrorToastMessage
			});

			return;
		}
	}
</script>

<div class="flex w-full flex-col gap-4">
	<label class="my-2 flex flex-col gap-1.5 text-sm font-medium text-t-primary">
		{$translationsStore.profilePage.profilePageChangeYourCustomMusicTitleInputLabel}

		<input
			type="text"
			minlength="1"
			maxlength="56"
			class="mt-1 w-full rounded-lg border border-b-default bg-s-muted px-3.5 py-2.5 text-xs text-t-primary transition-all outline-none placeholder:text-t-secondary/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
			placeholder={$translationsStore.profilePage
				.profilePageChangeYourCustomMusicTitleInputPlaceholder}
			on:input={handleTrackTitleInput}
			bind:value={choosedTrackTitle}
		/>

		<div class="flex items-start justify-between gap-3">
			{#if typeof isTrackTitleValid === 'object' && isTrackTitleValid.error}
				<span class="mt-1 text-[10px] text-status-error sm:text-[11px]">
					{#if isTrackTitleValid.typeError === 'emptyOrTooLong'}
						{$translationsStore.profilePage
							.profilePageChangeYourCustomMusicTitleInputErrorEmptyOrTooLongMessage}
					{:else if isTrackTitleValid.typeError === 'invalidCharacters'}
						{$translationsStore.profilePage
							.profilePageChangeYourCustomMusicTitleInputErrorInvalidCharactersMessage}
					{/if}
				</span>
			{:else}
				<span></span>
			{/if}

			{#if choosedTrackTitle}
				<span
					class={`mt-1 shrink-0 text-[10px] sm:text-[11px] ${choosedTrackTitle.length >= 56 ? 'text-status-error' : 'text-t-secondary'}`}
				>
					{choosedTrackTitle.length}/56
				</span>
			{/if}
		</div>
	</label>

	<div class="max-h-60 overflow-y-auto pr-2 sm:max-h-96">
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems ?? [] as track}
				<ChangeTrackCardOnProfile
					{track}
					{choosedTrack}
					{handleTrackSelection}
					userInfoType="customTrack"
				/>
			{/each}
		</div>

		{#if $userInfo?.tracks?.tracksWhoWereWithYou?.length}
			<div class="mt-4 flex flex-col gap-3">
				<p class="text-sm font-semibold text-t-primary">
					{$translationsStore.profilePage.profilePageChangeYourTracksWhoWereWithYou}
				</p>

				<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
					{#each $userInfo?.tracks?.tracksWhoWereWithYou as track}
						<ChangeTrackCardOnProfile
							{track}
							{choosedTrack}
							{handleTrackSelection}
							userInfoType="tracksWhoWereWithYou"
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<p class="text-center text-[10px] leading-relaxed text-t-secondary sm:text-[11px]">
		{#if $userInfo?.tracks?.customTrack?.nextFreeUpdate && new Date($userInfo.tracks.customTrack.nextFreeUpdate) > new Date()}
			{$translationsStore.profilePage.profilePageChangeYourMusicTimeToNextFreeUpdate}

			<strong class="font-medium text-t-primary">
				{new Date($userInfo.tracks.customTrack.nextFreeUpdate).toLocaleString(
					$translationsStore.locale,
					{
						dateStyle: 'short',
						timeStyle: 'short'
					}
				)}
			</strong>
		{:else}
			{$translationsStore.profilePage.profilePageChangeYourMusicUnlockMoreMusic}
		{/if}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={closeChangeCustomItemModal}
		>
			{$translationsStore.profilePage.profilePageChangeYourItemsModalCloseModal}
		</button>

		<button
			disabled={!choosedTrack ||
				!choosedTrackTitle ||
				(typeof isTrackTitleValid === 'object' && isTrackTitleValid.error === true) ||
				($userInfo?.tracks?.customTrack?.track?.id === choosedTrack?.id &&
					$userInfo?.tracks?.customTrack?.title === choosedTrackTitle)}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={handleChangeCustomTrack}
		>
			{$translationsStore.profilePage.profilePageChangeYourItemsModalSaveChanges}

			{#if $userInfo?.tracks?.customTrack?.nextFreeUpdate && new Date($userInfo.tracks.customTrack.nextFreeUpdate) > new Date()}
				<div
					class="ml-2 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-brand-primary shadow-sm"
				>
					<enhanced:img
						src={TicketIcon}
						alt={$translationsStore.generalTexts.ticketAltText}
						class="h-3 w-3"
					/>

					<span class="text-[11px] leading-none font-bold">-1</span>
				</div>
			{/if}
		</button>
	</div>
</div>
