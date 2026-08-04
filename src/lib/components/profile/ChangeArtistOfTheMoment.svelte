<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';

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

		const updatedArtist = await updateArtistOfTheMoment($userInfo?._id, choosedArtist);

		if (updatedArtist) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					artistOfTheMoment: {
						artist: updatedArtist.artist,
						nextFreeUpdate: updatedArtist.nextFreeUpdate
					}
				};
			});
		}

		closeChangeItemOfTheMomentModal();
	}
</script>

<div class="flex w-full flex-col gap-4">
	<div
		class="grid max-h-60 grid-cols-2 gap-4 overflow-y-auto pr-2 sm:max-h-96 sm:grid-cols-3 sm:gap-6 md:grid-cols-4"
	>
		{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems as artist}
			<button
				class={`${
					choosedArtist?.id === artist.id ||
					(!choosedArtist && $userInfo?.artistOfTheMoment?.artist?.id === artist.id)
						? 'border-brand-primary bg-brand-primary/5'
						: 'border-s-muted bg-s-muted'
				}
						relative flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-5 transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5`}
				aria-label={$translationsStore.profilePage.profilePageChangeYourArtistChooseArtistAriaLabel}
				disabled={choosedArtist === undefined &&
					$userInfo?.artistOfTheMoment?.artist?.id === artist.id}
				on:click={() => handleArtistSelection(artist)}
			>
				{#if artist.image}
					<img
						src={artist.image.url}
						alt={artist.name}
						class="h-14 w-14 rounded-lg object-cover sm:h-20 sm:w-20"
						loading="lazy"
					/>
				{/if}

				<div class="flex w-full flex-col gap-0.5 text-center">
					<p class="line-clamp-2 text-[11px] leading-tight font-semibold text-t-primary sm:text-xs">
						{artist.name}
					</p>

					<p class="line-clamp-1 text-[9px] text-t-secondary/70 sm:text-[10px]">
						{artist.followers.toLocaleString()}
						{$translationsStore.profilePage.profilePageChangeYourArtistChooseArtistFollowers}
					</p>
				</div>

				<SpotifyIcon
					iconSvgClass={`${choosedArtist?.id === artist.id || (!choosedArtist && $userInfo?.artistOfTheMoment?.artist?.id === artist.id) ? 'text-brand-primary' : 'text-t-secondary/70'} absolute top-1.5 right-1.5 h-3.5 w-3.5 sm:top-2 sm:right-2 sm:h-4 sm:w-4`}
				/>
			</button>
		{/each}
	</div>

	<p class="text-center text-[10px] leading-relaxed text-t-secondary sm:text-[11px]">
		{$translationsStore.profilePage.profilePageChangeYourArtistUnlockMoreMusic}
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
		</button>
	</div>
</div>
