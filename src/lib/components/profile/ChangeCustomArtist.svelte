<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { updateCustomArtist } from '$lib/services/user/updates/updateCustomArtist';

	// Types
	import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let closeChangeCustomItemModal: () => void;

	let choosedArtistTitle: string | undefined = $userInfo?.customArtist?.title || '';
	let choosedArtist: ArtistSpotify | undefined = $userInfo?.customArtist?.artist || undefined;

	function handleArtistSelection(artist: ArtistSpotify) {
		if (choosedArtist?.id === artist.id) {
			choosedArtist = undefined;
			return;
		}

		choosedArtist = artist;
	}

	async function handleChangeCustomArtist() {
		if (!choosedArtistTitle || !choosedArtist || !$userInfo?._id) return;

		const updatedArtist = await updateCustomArtist(
			$userInfo?._id,
			choosedArtistTitle,
			choosedArtist,
			$userInfo?.email,
			$userInfo?.tickets,
			$userInfo?.customArtist?.nextFreeUpdate
		);

		if (updatedArtist) {
			userInfo.update((currentUser) => {
				if (!currentUser) return currentUser;

				return {
					...currentUser,
					customArtist: {
						title: updatedArtist.title,
						artist: updatedArtist.artist,
						nextFreeUpdate: updatedArtist.nextFreeUpdate
					}
				};
			});
		}

		closeChangeCustomItemModal();
	}
</script>

<div class="flex w-full flex-col gap-4">
	<label class="my-2 flex flex-col gap-1.5 text-sm font-medium text-t-primary">
		{$translationsStore.profilePage.profilePageChangeYourCustomArtistTitleInputLabel}

		<input
			type="text"
			class="mt-1 w-full rounded-lg border border-b-default bg-s-muted px-3.5 py-2.5 text-xs text-t-primary transition-all outline-none placeholder:text-t-secondary/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
			placeholder={$translationsStore.profilePage
				.profilePageChangeYourCustomArtistTitleInputPlaceholder}
			bind:value={choosedArtistTitle}
		/>
	</label>

	<div
		class="grid max-h-60 grid-cols-2 gap-4 overflow-y-auto pr-2 sm:max-h-96 sm:grid-cols-3 sm:gap-6 md:grid-cols-4"
	>
		{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems as artist}
			<button
				class={`${
					choosedArtist?.id === artist.id ||
					(!choosedArtist && $userInfo?.customArtist?.artist?.id === artist.id)
						? 'border-brand-primary bg-brand-primary/5'
						: 'border-s-muted bg-s-muted'
				}
						relative flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-5 transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5`}
				aria-label={$translationsStore.profilePage.profilePageChangeYourArtistChooseArtistAriaLabel}
				disabled={choosedArtist === undefined && $userInfo?.customArtist?.artist?.id === artist.id}
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
						{$translationsStore.profilePage.profilePageChangeYourCustomArtistUnlockMoreMusic}
					</p>
				</div>

				<SpotifyIcon
					iconSvgClass={`${choosedArtist?.id === artist.id || (!choosedArtist && $userInfo?.customArtist?.artist?.id === artist.id) ? 'text-brand-primary' : 'text-t-secondary/70'} absolute top-1.5 right-1.5 h-3.5 w-3.5 sm:top-2 sm:right-2 sm:h-4 sm:w-4`}
				/>
			</button>
		{/each}
	</div>

	<p class="text-center text-[10px] leading-relaxed text-t-secondary sm:text-[11px]">
		{#if $userInfo?.customArtist?.nextFreeUpdate && new Date($userInfo.customArtist.nextFreeUpdate) > new Date()}
			{$translationsStore.profilePage.profilePageChangeYourArtistTimeToNextFreeUpdate}

			<strong class="font-semibold text-t-primary">
				{new Date($userInfo.customArtist.nextFreeUpdate).toLocaleString($translationsStore.locale, {
					dateStyle: 'short',
					timeStyle: 'short'
				})}
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
				($userInfo?.customArtist?.artist?.id === choosedArtist?.id &&
					$userInfo?.customArtist?.title === choosedArtistTitle)}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
			on:click={handleChangeCustomArtist}
		>
			{$translationsStore.profilePage.profilePageChangeYourCustomItemModalSaveChanges}

			{#if $userInfo?.customArtist?.nextFreeUpdate && new Date($userInfo.customArtist.nextFreeUpdate) > new Date()}
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
