<script lang="ts">
	// Components
	import Followers from '$lib/components/general/Followers.svelte';
	import Popularity from '../general/Popularity.svelte';
	import ExternalLink from '../general/ExternalLink.svelte';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let artist: ArtistSpotify;
</script>

<div class="flex w-full flex-col gap-4 sm:flex-row sm:gap-6">
	<enhanced:img
		src={artist.image?.url}
		alt={artist.name}
		class="h-20 w-20 shrink-0 rounded-lg object-cover shadow-md sm:h-28 sm:w-28 lg:h-48 lg:w-48"
		loading="lazy"
	/>

	<div class="flex flex-1 flex-col gap-4 sm:gap-5">
		<div class="space-y-2">
			{#if artist.name}
				<p class="truncate text-lg font-semibold text-t-primary sm:text-xl lg:text-2xl">
					{artist.name}
				</p>
			{/if}

			{#if artist.followers}
				<Followers quantityFollowers={artist.followers} classFollowers="text-xs text-t-secondary" />
			{/if}

			{#if artist.genres}
				<div class="flex flex-wrap gap-2">
					{#each artist.genres.slice(0, 2) as genre}
						<span
							class="max-w-full truncate rounded-lg bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
						>
							{genre}
						</span>
					{/each}
				</div>
			{/if}
		</div>

		<div class="mt-auto flex w-full flex-col gap-2">
			<Popularity item={artist} />

			<ExternalLink
				additionalClass="w-full mt-2"
				streamingPlatform="spotify"
				externalLink={artist.externalLink}
				externalLinkText={$translationsStore.generalTexts.seeArtistOnSpotify}
			/>
		</div>
	</div>
</div>
