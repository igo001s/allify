<script lang="ts">
	// Components
	import SelectItemCard from '../general/cards/SelectItemCard.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let goToNextStep: () => void;
	export let backToPreviousStep: () => void;
	export let buildProfileTrack: TrackSpotify | undefined = undefined;

	function handleTrackSelection(track: TrackSpotify) {
		if (buildProfileTrack?.id === track.id) {
			buildProfileTrack = undefined;
			return;
		}

		buildProfileTrack = track;
	}
</script>

<p class="build-profile-modal-title">
	{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph1}
</p>

<p class="build-profile-modal-description">
	{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph2}
</p>

<div class="build-profile-modal-selection">
	<p class="label">
		{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph3}
	</p>

	<div class="grid">
		{#each $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.uniqueTracks as track, i (i)}
			<SelectItemCard
				{handleTrackSelection}
				item={track}
				itemAriaLabel={$translationsStore.generalTexts
					.buildProfileFirstStepTrackSectionSelectTrackAriaLabel}
				itemType="track"
				selected={buildProfileTrack?.id === track.id}
			/>
		{/each}
	</div>

	<p class="build-profile-modal-hint">
		{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph4}
	</p>
</div>

<div class="build-profile-modal-footer">
	<button on:click={backToPreviousStep} class="button-secondary">
		{$translationsStore.generalTexts.buildProfileBackStepButton}
	</button>

	<button
		on:click={goToNextStep}
		disabled={!buildProfileTrack}
		class={`${buildProfileTrack ? 'button-primary' : 'button-disable'}`}
	>
		{$translationsStore.generalTexts.buildProfileNextStepButton}
	</button>
</div>
