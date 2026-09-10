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

<div class="flex w-full flex-col gap-3 sm:gap-4">
	<p class="text-lg font-bold text-t-primary sm:text-xl">
		{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph1}
	</p>

	<p class="text-xs text-t-secondary sm:text-sm">
		{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph2}
	</p>

	<div class="mt-1 flex flex-col gap-4 sm:mt-2">
		<p class="text-xs font-semibold text-t-primary sm:text-sm">
			{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph3}
		</p>

		<div
			class="grid max-h-60 grid-cols-2 gap-4 overflow-y-auto pr-2 sm:max-h-96 sm:grid-cols-3 sm:gap-6 md:grid-cols-4"
		>
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems as track}
				<SelectItemCard
					handleItemSelection={handleTrackSelection}
					item={track}
					itemAriaLabel={$translationsStore.generalTexts
						.buildProfileFirstStepTrackSectionSelectTrackAriaLabel}
					itemType="track"
					selected={buildProfileTrack?.id === track.id}
				/>
			{/each}
		</div>

		<p class="text-center text-[10px] text-t-secondary sm:text-[11px]">
			{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph4}
		</p>
	</div>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button on:click={backToPreviousStep} class="button-secondary px-6 py-2.5">
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button
			on:click={goToNextStep}
			disabled={!buildProfileTrack}
			class={`${buildProfileTrack ? 'button-primary' : 'button-disable'} px-6 py-2.5`}
		>
			{$translationsStore.generalTexts.buildProfileNextStepButton}
		</button>
	</div>
</div>
