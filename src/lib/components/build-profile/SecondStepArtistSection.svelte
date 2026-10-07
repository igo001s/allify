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

<p class="build-profile-modal-title">
	{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph1}
</p>

<p class="build-profile-modal-description">
	{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph2}
</p>

<div class="build-profile-modal-selection">
	<p class="label">
		{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph3}
	</p>

	<div class="grid">
		{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.uniqueArtists as artist, i (i)}
			<SelectItemCard
				{handleArtistSelection}
				item={artist}
				itemAriaLabel={$translationsStore.generalTexts
					.buildProfileSecondStepArtistSectionSelectArtistAriaLabel}
				itemType="artist"
				selected={buildProfileArtist?.id === artist.id}
			/>
		{/each}
	</div>

	<p class="build-profile-modal-hint">
		{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph4}
	</p>
</div>

<div class="build-profile-modal-footer">
	<button on:click={backToPreviousStep} class="button-secondary">
		{$translationsStore.generalTexts.buildProfileBackStepButton}
	</button>

	<button
		on:click={goToNextStep}
		disabled={!buildProfileArtist}
		class={buildProfileArtist ? 'button-primary' : 'button-disable'}
	>
		{$translationsStore.generalTexts.buildProfileNextStepButton}
	</button>
</div>
