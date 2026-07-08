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

<div class="flex flex-col gap-3.5">
	<p class="text-xl font-bold text-t-primary sm:text-2xl">
		{$translationsStore.generalTexts.buildProfileFirstStepArtistSectionParagraph1}
	</p>

	<p class="text-sm text-t-secondary">
		{$translationsStore.generalTexts.buildProfileFirstStepArtistSectionParagraph2}
	</p>

	<div class="mt-2 flex flex-col gap-4">
		<p class="text-sm font-semibold text-t-primary">
			{$translationsStore.generalTexts.buildProfileFirstStepArtistSectionParagraph3}
		</p>

		<div
			class="grid h-96 max-h-96 grid-cols-2 justify-center gap-4 overflow-y-auto pr-2 sm:grid-cols-3 md:grid-cols-4"
		>
			{#each $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems as artist}
				<button
					class={`${buildProfileArtist?.id === artist.id ? 'border-brand-primary' : 'border-s-muted'} relative mx-auto flex w-36 shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 bg-s-muted p-2.5 transition-all duration-200 hover:bg-s-muted/60`}
					aria-label={$translationsStore.generalTexts
						.buildProfileFirstStepArtistSectionSelectArtistAriaLabel}
					on:click={() => handleArtistSelection(artist)}
				>
					{#if artist.image}
						<img
							src={artist.image?.url}
							alt={artist.name}
							class="h-20 w-20 rounded-lg object-cover"
							loading="lazy"
						/>
					{/if}

					<div class="flex w-full flex-col gap-1.5 text-center">
						<p class="line-clamp-2 text-center text-xs leading-tight font-semibold text-t-primary">
							{artist.name}
						</p>

						<p class="line-clamp-1 text-center text-[10px] text-t-secondary/70">
							{artist.followers.toLocaleString()} seguidores
						</p>
					</div>

					<SpotifyIcon
						iconSvgClass={`${buildProfileArtist?.id === artist.id ? 'text-brand-primary' : 'text-t-secondary/70'} absolute top-1.5 right-1.5 w-4 h-4`}
					/>
				</button>
			{/each}
		</div>

		<p class="mt-2 text-center text-[11px] text-t-secondary">
			{$translationsStore.generalTexts.buildProfileFirstStepArtistSectionParagraph4}
		</p>
	</div>

	<div class="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
		<button
			on:click={backToPreviousStep}
			class="flex w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:w-auto"
		>
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button
			on:click={goToNextStep}
			disabled={!buildProfileArtist}
			class="flex w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:w-auto"
		>
			{$translationsStore.generalTexts.buildProfileNextStepButton}
		</button>
	</div>
</div>