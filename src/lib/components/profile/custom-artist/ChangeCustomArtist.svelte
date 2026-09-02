<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp?enhanced';

	// Components
	import ChangeArtistCardOnProfile from '$lib/components/profile/ChangeArtistCardOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { updateCustomArtist } from '$lib/services/user/updates/updateCustomArtist';

	// Utils
	import { validateCustomItemTitle } from '$lib/utils/validateCustomItemTitle';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Props
	export let closeChangeCustomItemModal: () => void;

	let choosedArtistTitle: string | undefined = $userInfo?.artists?.customArtist?.title || '';
	let choosedArtist: ArtistSpotify | undefined =
		$userInfo?.artists?.customArtist?.artist || undefined;

	let isArtistTitleValid: { typeError: string; error: boolean } = { typeError: '', error: false };

	function handleArtistSelection(artist: ArtistSpotify) {
		if (choosedArtist?.id === artist.id) {
			choosedArtist = undefined;
			return;
		}

		choosedArtist = artist;
	}

	function handleArtistTitleInput() {
		isArtistTitleValid = validateCustomItemTitle(choosedArtistTitle || '');
	}

	async function handleChangeCustomArtist() {
		if (!choosedArtistTitle || !choosedArtist || !$userInfo?._id) return;

		const updateCustomArtistResponse = await updateCustomArtist(
			$userInfo?._id,
			choosedArtistTitle,
			choosedArtist,
			$userInfo?.tickets,
			$userInfo?.artists?.customArtist?.nextFreeUpdate
		);

		if (!updateCustomArtistResponse.error) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					artists: {
						...currentUser.artists,
						customArtist: {
							title: updateCustomArtistResponse.title,
							artist: updateCustomArtistResponse.artist,
							nextFreeUpdate: updateCustomArtistResponse.nextFreeUpdate
						}
					}
				};
			});

			closeChangeCustomItemModal();

			toastStore.set({
				showToast: true,
				toastType: 'success',
				toastMessage:
					$translationsStore.profilePage.profilePageChangeCustomArtistSuccessToastMessage
			});

			return;
		} else {
			if (updateCustomArtistResponse.errorType === 'ticketUsageFailed') return;

			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage: $translationsStore.profilePage.profilePageChangeCustomArtistErrorToastMessage
			});

			return;
		}
	}
</script>

<div class="flex w-full flex-col gap-4">
	<label class="my-2 flex flex-col gap-1.5 text-sm font-medium text-t-primary">
		{$translationsStore.profilePage.profilePageChangeYourCustomArtistTitleInputLabel}

		<input
			type="text"
			minlength="1"
			maxlength="56"
			class="mt-1 w-full rounded-lg border border-b-default bg-s-muted px-3.5 py-2.5 text-xs text-t-primary transition-all outline-none placeholder:text-t-secondary/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
			placeholder={$translationsStore.profilePage
				.profilePageChangeYourCustomArtistTitleInputPlaceholder}
			on:input={handleArtistTitleInput}
			bind:value={choosedArtistTitle}
		/>

		<div class="flex items-start justify-between gap-3">
			{#if isArtistTitleValid.error}
				<span class="mt-1 text-[10px] text-status-error sm:text-[11px]">
					{#if isArtistTitleValid.typeError === 'emptyOrTooLong'}
						{$translationsStore.profilePage
							.profilePageChangeYourCustomArtistTitleInputErrorEmptyOrTooLongMessage}
					{:else if isArtistTitleValid.typeError === 'invalidCharacters'}
						{$translationsStore.profilePage
							.profilePageChangeYourCustomArtistTitleInputErrorInvalidCharactersMessage}
					{/if}
				</span>
			{:else}
				<span></span>
			{/if}

			{#if choosedArtistTitle}
				<span
					class={`mt-1 shrink-0 text-[10px] sm:text-[11px] ${choosedArtistTitle.length >= 56 ? 'text-status-error' : 'text-t-secondary'}`}
				>
					{choosedArtistTitle.length}/56
				</span>
			{/if}
		</div>
	</label>

	<div class="max-h-60 overflow-y-auto pr-2 sm:max-h-96">
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems ?? [] as artist}
				<ChangeArtistCardOnProfile
					{artist}
					{choosedArtist}
					{handleArtistSelection}
					userInfoType="customArtist"
				/>
			{/each}
		</div>

		{#if $userInfo?.artists?.artistsWhoWereWithYou?.length}
			<div class="mt-4 flex flex-col gap-3">
				<p class="text-sm font-semibold text-t-primary">
					{$translationsStore.profilePage.profilePageChangeYourArtistsWhoWereWithYou}
				</p>

				<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
					{#each $userInfo.artists.artistsWhoWereWithYou as artist}
						<ChangeArtistCardOnProfile
							{artist}
							{choosedArtist}
							{handleArtistSelection}
							userInfoType="artistsWhoWereWithYou"
						/>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	<p class="text-center text-[10px] leading-relaxed text-t-secondary sm:text-[11px]">
		{#if $userInfo?.artists?.customArtist?.nextFreeUpdate && new Date($userInfo.artists.customArtist.nextFreeUpdate) > new Date()}
			{$translationsStore.profilePage.profilePageChangeYourArtistTimeToNextFreeUpdate}

			<strong class="font-medium text-t-primary">
				{new Date($userInfo.artists.customArtist.nextFreeUpdate).toLocaleString(
					$translationsStore.locale,
					{
						dateStyle: 'short',
						timeStyle: 'short'
					}
				)}
			</strong>
		{:else}
			{$translationsStore.profilePage.profilePageChangeYourArtistUnlockMoreMusic}
		{/if}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={closeChangeCustomItemModal}
		>
			{$translationsStore.profilePage.profilePageChangeYourCustomItemModalCloseModal}
		</button>

		<button
			disabled={!choosedArtist ||
				!choosedArtistTitle ||
				isArtistTitleValid.error === true ||
				($userInfo?.artists?.customArtist?.artist?.id === choosedArtist?.id &&
					$userInfo?.artists?.customArtist?.title === choosedArtistTitle)}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={handleChangeCustomArtist}
		>
			{$translationsStore.profilePage.profilePageChangeYourCustomItemModalSaveChanges}

			{#if $userInfo?.artists?.customArtist?.nextFreeUpdate && new Date($userInfo.artists.customArtist.nextFreeUpdate) > new Date()}
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
