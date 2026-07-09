<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

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

<div class="flex w-full flex-col gap-4">
	<p class="text-xl leading-tight font-bold text-t-primary sm:text-2xl">
		{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph1}
	</p>

	<p class="text-sm leading-relaxed text-t-secondary">
		{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph2}
	</p>

	<div class="mt-2 flex flex-col gap-4">
		<p class="text-sm font-semibold text-t-primary">
			{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph3}
		</p>

		<div
			class="grid max-h-80 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:max-h-96 sm:grid-cols-3 sm:gap-4 md:grid-cols-4"
		>
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems as artist}
				<button
					class={`${buildProfileArtist?.id === artist.id ? 'border-brand-primary' : 'border-s-muted'} relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 bg-s-muted p-2.5 transition-all duration-200 hover:bg-s-muted/60`}
					aria-label={$translationsStore.generalTexts
						.buildProfileSecondStepArtistSectionSelectArtistAriaLabel}
					on:click={() => handleArtistSelection(artist)}
				>
					{#if artist.image}
						<img
							src={artist.image.url}
							alt={artist.name}
							class="h-18 w-18 rounded-lg object-cover sm:h-20 sm:w-20"
							loading="lazy"
						/>
					{/if}

					<div class="flex w-full flex-col gap-1 text-center">
						<p class="line-clamp-2 text-xs leading-tight font-semibold text-t-primary">
							{artist.name}
						</p>

						<p class="line-clamp-1 text-[10px] text-t-secondary/70">
							{artist.followers.toLocaleString()} seguidores
						</p>
					</div>

					<SpotifyIcon
						iconSvgClass={`${buildProfileArtist?.id === artist.id ? 'text-brand-primary' : 'text-t-secondary/70'} absolute top-2 right-2 h-4 w-4`}
					/>
				</button>
			{/each}
		</div>

		<p class="text-center text-[11px] leading-relaxed text-t-secondary">
			{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionParagraph4}
		</p>
	</div>

	<div class="mt-2 flex flex-col-reverse gap-3 sm:mt-4 sm:flex-row sm:justify-end">
		<button
			on:click={backToPreviousStep}
			class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-5 py-2 text-sm font-semibold text-t-primary transition hover:scale-102 sm:min-h-10 sm:w-auto sm:text-xs"
		>
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button
			on:click={goToNextStep}
			disabled={!buildProfileArtist}
			class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-5 py-2 text-sm font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-10 sm:w-auto sm:text-xs"
		>
			{$translationsStore.generalTexts.buildProfileNextStepButton}
		</button>
	</div>
</div>
