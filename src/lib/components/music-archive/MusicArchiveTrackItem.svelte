<script lang="ts">
	// Components
	import Popularity from '../general/Popularity.svelte';
	import ExternalLink from '../general/ExternalLink.svelte';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let track: TrackSpotify;
</script>

<div class="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
	<enhanced:img
		src={track.image?.url}
		alt={track.name}
		class="h-32 w-32 shrink-0 rounded-lg object-cover shadow-md sm:h-44 sm:w-44 lg:h-48 lg:w-48"
		loading="lazy"
	/>

	<div class="flex h-full w-full flex-col justify-between gap-4 sm:gap-5">
		<div class="space-y-2">
			{#if track.name}
				<p class="truncate text-lg font-semibold text-t-primary sm:text-xl lg:text-xl">
					{track.name}
				</p>
			{/if}

			{#if track.artists}
				<p class="truncate text-xs text-t-secondary">
					{track.artists.join(', ')}
				</p>
			{/if}

			{#if track.albumName}
				<div class="flex flex-wrap gap-2">
					<span
						class="max-w-full truncate rounded-lg bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
					>
						{track.albumName}
					</span>
				</div>
			{/if}
		</div>

		<div class="mt-auto flex w-full flex-col gap-2">
			<Popularity item={track} />

			<ExternalLink
				additionalClass="w-full mt-2"
				streamingPlatform="spotify"
				externalLink={track.externalLink}
				externalLinkText={$translationsStore.generalTexts.seeMusicOnSpotify}
			/>
		</div>
	</div>
</div>
