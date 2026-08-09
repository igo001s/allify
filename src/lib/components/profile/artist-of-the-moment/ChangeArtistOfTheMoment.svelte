<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';

	// Components
	import ChangeArtistCardOnProfile from '$lib/components/profile/ChangeArtistCardOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { updateArtistOfTheMoment } from '$lib/services/user/updates/updateArtistOfTheMoment';

	// Types
	import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let closeChangeItemOfTheMomentModal: () => void;

	let choosedArtist: ArtistSpotify | undefined = undefined;

	function handleArtistSelection(artist: ArtistSpotify) {
		if (choosedArtist?.id === artist.id) {
			choosedArtist = undefined;
			return;
		}

		choosedArtist = artist;
	}

	async function handleChangeArtistOfTheMoment() {
		if (!choosedArtist || !$userInfo?._id) return;

		const updatedArtist = await updateArtistOfTheMoment(
			$userInfo._id,
			choosedArtist,
			$userInfo.email,
			$userInfo.tickets,
			$userInfo.artists?.artistOfTheMoment?.nextFreeUpdate
		);

		if (updatedArtist) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					artists: {
						...currentUser.artists,
						artistOfTheMoment: {
							artist: updatedArtist.artist,
							nextFreeUpdate: updatedArtist.nextFreeUpdate
						}
					}
				};
			});
		}

		closeChangeItemOfTheMomentModal();
	}
</script>

<div class="flex w-full flex-col gap-4">
	<div class="max-h-60 overflow-y-auto pr-2 sm:max-h-96">
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems ?? [] as artist}
				<ChangeArtistCardOnProfile
					{artist}
					{choosedArtist}
					{handleArtistSelection}
					userInfoType="artistOfTheMoment"
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
		{#if $userInfo?.artists?.artistOfTheMoment?.nextFreeUpdate && new Date($userInfo.artists.artistOfTheMoment.nextFreeUpdate) > new Date()}
			{$translationsStore.profilePage.profilePageChangeYourArtistTimeToNextFreeUpdate}

			<strong class="font-semibold text-t-primary">
				{new Date($userInfo.artists.artistOfTheMoment.nextFreeUpdate).toLocaleString(
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
			on:click={closeChangeItemOfTheMomentModal}
		>
			{$translationsStore.profilePage.profilePageChangeYourItemsModalCloseModal}
		</button>

		<button
			disabled={!choosedArtist}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={handleChangeArtistOfTheMoment}
		>
			{$translationsStore.profilePage.profilePageChangeYourItemsModalSaveChanges}

			{#if $userInfo?.artists?.artistOfTheMoment?.nextFreeUpdate && new Date($userInfo.artists.artistOfTheMoment.nextFreeUpdate) > new Date()}
				<div
					class="ml-2 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-brand-primary shadow-sm"
				>
					<img
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
