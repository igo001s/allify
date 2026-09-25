<script lang="ts">
	// Components
	import Followers from '$lib/components/general/Followers.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';
	import ExternalLink from '$lib/components/general/ExternalLink.svelte';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let item: ArtistSpotify | TrackSpotify;
</script>

<div class="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
	<enhanced:img
		src={item.image?.url}
		alt={item.name}
		class="h-32 w-32 shrink-0 rounded-lg object-cover shadow-md sm:h-44 sm:w-44 lg:h-48 lg:w-48"
		loading="lazy"
	/>

	<div class="flex h-full w-full flex-col justify-between gap-4 sm:gap-5">
		<div class="space-y-2">
			{#if item.name}
				<p class="truncate text-lg font-semibold text-t-primary sm:text-xl lg:text-xl">
					{item.name}
				</p>
			{/if}

			{#if 'followers' in item && item.followers}
				<Followers quantityFollowers={item.followers} classFollowers="text-xs text-t-secondary" />
			{/if}

			{#if 'genres' in item && item.genres}
				<div class="flex flex-wrap gap-2">
					{#each item.genres.slice(0, 2) as genre, i (i)}
						<span
							class="max-w-full truncate rounded-lg bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
						>
							{genre}
						</span>
					{/each}
				</div>
			{/if}

			{#if 'artists' in item && item.artists}
				<p class="truncate text-xs text-t-secondary">
					{item.artists.join(', ')}
				</p>
			{/if}

			{#if 'albumName' in item && item.albumName}
				<div class="flex flex-wrap gap-2">
					<span
						class="max-w-full truncate rounded-lg bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
					>
						{item.albumName}
					</span>
				</div>
			{/if}
		</div>

		<div class="mt-auto flex w-full flex-col gap-2">
			<Popularity {item} />

			<ExternalLink
				additionalClass="w-full mt-2"
				streamingPlatform="spotify"
				externalLink={item.externalLink}
				externalLinkText={$translationsStore.generalTexts.seeArtistOnSpotify}
			/>
		</div>
	</div>
</div>
