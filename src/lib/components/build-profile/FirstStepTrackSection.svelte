<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/SpotifyData.type';

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
	<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
		{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph1}
	</p>

	<p class="text-xs leading-relaxed text-t-secondary text-justify sm:text-sm">
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
				<button
					class={`${
						buildProfileTrack?.id === track.id
							? 'border-brand-primary bg-brand-primary/5'
							: 'border-s-muted bg-s-muted'
					}
						relative flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 py-3.5 px-2 transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5`}
					aria-label={$translationsStore.generalTexts
						.buildProfileFirstStepTrackSectionSelectTrackAriaLabel}
					on:click={() => handleTrackSelection(track)}
				>
					{#if track.image}
						<img
							src={track.image.url}
							alt={track.name}
							class="h-14 w-14 rounded-lg object-cover sm:h-20 sm:w-20"
							loading="lazy"
						/>
					{/if}

					<div class="flex w-full flex-col gap-0.5 text-center">
						<p class="line-clamp-2 text-[11px] leading-tight font-semibold text-t-primary sm:text-xs">
							{track.name}
						</p>

						<p class="line-clamp-1 text-[10px] text-t-secondary sm:text-[11px]">
							{track.artists.join(', ')}
						</p>

						<p class="line-clamp-1 text-[9px] text-t-secondary/70 sm:text-[10px]">
							{track.albumName}
						</p>
					</div>

					<SpotifyIcon
						iconSvgClass={`${buildProfileTrack?.id === track.id ? 'text-brand-primary' : 'text-t-secondary/70'} absolute top-1.5 right-1.5 h-3.5 w-3.5 sm:top-2 sm:right-2 sm:h-4 sm:w-4`}
					/>
				</button>
			{/each}
		</div>

		<p class="text-center text-[10px] leading-relaxed text-t-secondary sm:text-[11px]">
			{$translationsStore.generalTexts.buildProfileFirstStepTrackSectionParagraph4}
		</p>
	</div>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button
			on:click={backToPreviousStep}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
		>
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button
			on:click={goToNextStep}
			disabled={!buildProfileTrack}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
		>
			{$translationsStore.generalTexts.buildProfileNextStepButton}
		</button>
	</div>
</div>
