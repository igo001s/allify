<script lang="ts">
	// Components
	import ExternalLink from '../../general/ExternalLink.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';
	import Followers from '$lib/components/general/Followers.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let item: ArtistSpotify | TrackSpotify;
	export let index: number;
	export let itemType: 'artists' | 'tracks';
</script>

<div
	class={`flex flex-col gap-3 rounded-lg p-6.5 ring-2 sm:flex-row sm:items-center sm:gap-4 sm:p-5 ${
		index === 0
			? 'ring-top-1'
			: index === 1
				? 'ring-top-2'
				: index === 2
					? 'ring-top-3'
					: 'ring-black/10'
	}`}
>
	<div class="relative mx-auto h-32 w-32 shrink-0 sm:h-48 sm:w-48">
		<enhanced:img
			src={item.image?.url}
			alt={item.name}
			class="h-full w-full rounded-lg object-cover shadow-md"
			loading={index < 6 && itemType === 'artists' ? 'eager' : 'lazy'}
			fetchpriority={index < 6 && itemType === 'artists' ? 'high' : 'low'}
			decoding={index < 6 && itemType === 'artists' ? 'sync' : 'async'}
		/>

		<span
			class={`absolute top-2 left-2 rounded-md px-2 py-0.5 text-xs font-semibold text-white shadow-sm ${
				index === 0
					? 'bg-top-1'
					: index === 1
						? 'bg-top-2'
						: index === 2
							? 'bg-top-3'
							: 'bg-black/50'
			}`}
		>
			{index + 1}
		</span>
	</div>

	<div class="flex w-full min-w-0 flex-col justify-between gap-3 sm:h-full sm:gap-4">
		<div class="space-y-1.5">
			{#if item.name}
				<p class="text-center text-sm font-semibold text-t-primary sm:text-left sm:text-base">
					{item.name}
				</p>
			{/if}

			{#if 'followers' in item && item.followers}
				<Followers
					quantityFollowers={item.followers}
					classFollowers="text-[11px] text-t-secondary text-center sm:text-left"
				/>
			{/if}

			{#if 'genres' in item && item.genres}
				<div class="flex flex-wrap justify-center gap-1.5 sm:justify-start">
					{#each item.genres.slice(0, 2) as genre}
						<span
							class="max-w-full rounded-lg bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
						>
							{genre}
						</span>
					{/each}
				</div>
			{/if}

			{#if 'artists' in item && item.artists}
				<p class="text-center text-[11px] text-t-secondary sm:text-left">
					{item.artists.join(', ')}
				</p>
			{/if}

			{#if 'albumName' in item && item.albumName}
				<div class="flex flex-wrap justify-center gap-1.5 sm:justify-start">
					<span
						class="max-w-full rounded-lg bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
					>
						{item.albumName}
					</span>
				</div>
			{/if}
		</div>

		<div class="mx-auto mt-3 flex w-11/12 flex-col gap-2 sm:mx-0 sm:mt-0 sm:w-full">
			<Popularity {item} />

			<ExternalLink
				additionalClass="mt-2 w-full"
				streamingPlatform="spotify"
				externalLink={item.externalLink}
				externalLinkText={$translationsStore.generalTexts.seeArtistOnSpotify}
			/>
		</div>
	</div>
</div>
