<script lang="ts">
	// Components
	import SelectArtistCardOnProfile from '$lib/components/profile/SelectArtistCardOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { updateCustomArtist } from '$lib/services/user/updates/updateCustomArtist';

	// Utils
	import { validateCustomItemTitle } from '$lib/utils/validateCustomItemTitle';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Props
	export let closeSelectCustomItemModal: () => void;

	let choosedArtistTitle: string | undefined = '';
	let choosedArtist: ArtistSpotify | undefined = undefined;

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

	async function handleSelectCustomArtist() {
		if (!choosedArtistTitle || !choosedArtist || !$userInfo?._id) return;

		const updatedArtist = await updateCustomArtist(
			$userInfo?._id,
			choosedArtistTitle,
			choosedArtist
		);

		if (updatedArtist) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					artists: {
						...currentUser.artists,
						customArtist: {
							title: updatedArtist.title,
							artist: updatedArtist.artist,
							nextFreeUpdate: updatedArtist.nextFreeUpdate
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
		{$translationsStore.profilePage.profilePageSelectYourCustomArtistTitleInputLabel}

		<input
			type="text"
			minlength="1"
			maxlength="56"
			class="mt-1 w-full rounded-lg border border-b-default bg-s-muted px-3.5 py-2.5 text-xs text-t-primary transition-all outline-none placeholder:text-t-secondary/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
			placeholder={$translationsStore.profilePage
				.profilePageSelectYourCustomArtistTitleInputPlaceholder}
			on:input={handleArtistTitleInput}
			bind:value={choosedArtistTitle}
		/>

		{#if isArtistTitleValid.error}
			<span class="mt-1 text-[10px] text-status-error sm:text-[11px]">
				{#if isArtistTitleValid.typeError === 'emptyOrTooLong'}
					{$translationsStore.profilePage
						.profilePageSelectYourCustomArtistTitleInputErrorEmptyOrTooLongMessage}
				{:else if isArtistTitleValid.typeError === 'invalidCharacters'}
					{$translationsStore.profilePage
						.profilePageSelectYourCustomArtistTitleInputErrorInvalidCharactersMessage}
				{/if}
			</span>
		{/if}
	</label>

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
		{$translationsStore.profilePage.profilePageSelectYourCustomArtistUnlockMoreMusic}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={closeSelectCustomItemModal}
		>
			{$translationsStore.profilePage.profilePageSelectYourCustomItemModalCloseModal}
		</button>

		<button
			disabled={!choosedArtistTitle || !choosedArtist || isArtistTitleValid.error === true}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={handleSelectCustomArtist}
		>
			{$translationsStore.profilePage.profilePageSelectYourCustomItemModalSaveChanges}
		</button>
	</div>
</div>
