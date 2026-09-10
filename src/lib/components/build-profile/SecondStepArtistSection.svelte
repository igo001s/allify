<script lang="ts">
	// Components
	import SelectItemCard from '../general/cards/SelectItemCard.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Props
	export let goToNextStep: () => void;
	export let backToPreviousStep: () => void;
	export let buildProfileArtist: ArtistSpotify | undefined = undefined;

	function handleArtistSelection(artist: ArtistSpotify) {
		if (buildProfileArtist?.id === artist.id) {
			buildProfileArtist = undefined;
			return;
		}

		buildProfileArtist = artist;
	}
</script>

<div class="flex w-full flex-col gap-3 sm:gap-4">
	<p class="text-lg font-bold text-t-primary sm:text-xl">
		{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph1}
	</p>

	<p class="text-xs text-t-secondary sm:text-sm">
		{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph2}
	</p>

	<div class="mt-1 flex flex-col gap-4 sm:mt-2">
		<p class="text-xs font-semibold text-t-primary sm:text-sm">
			{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph3}
		</p>

		<div
			class="grid max-h-60 grid-cols-2 gap-4 overflow-y-auto pr-2 sm:max-h-96 sm:grid-cols-3 sm:gap-6 md:grid-cols-4"
		>
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems as artist}
				<SelectItemCard
					handleItemSelection={handleArtistSelection}
					item={artist}
					itemAriaLabel={$translationsStore.generalTexts
						.buildProfileSecondStepArtistSectionSelectArtistAriaLabel}
					itemType="artist"
					selected={buildProfileArtist?.id === artist.id}
				/>
			{/each}
		</div>

		<p class="text-center text-[10px] text-t-secondary sm:text-[11px]">
			{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph4}
		</p>
	</div>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button on:click={backToPreviousStep} class="button-secondary px-6 py-2.5">
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button
			on:click={goToNextStep}
			disabled={!buildProfileArtist}
			class={`${buildProfileArtist ? 'button-primary' : 'button-disable'} px-6 py-2.5`}
		>
			{$translationsStore.generalTexts.buildProfileNextStepButton}
		</button>
	</div>
</div>
