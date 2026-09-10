<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';

	// Props
	export let handleItemSelection: (Item: any) => void;
	export let item: TrackSpotify | ArtistSpotify;
	export let itemAriaLabel: string;
	export let itemType: 'track' | 'artist';
	export let selected: boolean;
	export let disabled: boolean = false;
</script>

<button
	class={`${selected ? 'border-brand-primary bg-brand-primary/5' : 'border-s-muted bg-s-muted'}
						relative flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-3.5 hover:border-brand-primary hover:bg-brand-primary/5`}
	aria-label={itemAriaLabel}
	on:click={() => handleItemSelection(item)}
	{disabled}
>
	{#if item.image}
		<enhanced:img
			src={item.image.url}
			alt={item.name}
			class="h-14 w-14 rounded-lg object-cover sm:h-20 sm:w-20"
			loading="lazy"
		/>
	{/if}

	<div class="flex w-full flex-col gap-0.5 text-center">
		<p class="line-clamp-2 text-[11px] font-semibold text-t-primary sm:text-xs">
			{item.name}
		</p>

		{#if itemType === 'track' && 'artists' in item}
			<p class="text-[10px] text-t-secondary sm:text-[11px]">
				{item.artists.join(', ')}
			</p>
			<p class="text-[9px] text-t-secondary/70 sm:text-[10px]">
				{item.albumName}
			</p>
		{:else if 'followers' in item}
			<p class="text-[9px] text-t-secondary/70 sm:text-[10px]">
				{item.followers.toLocaleString()}
				{$translationsStore.generalTexts.buildProfileSecondStepArtistSectionSelectArtistFollowers}
			</p>
		{/if}
	</div>

	<SpotifyIcon
		iconSvgClass={`${selected ? 'text-brand-primary' : 'text-t-secondary/70'} absolute top-1.5 right-1.5 h-3.5 w-3.5 sm:top-2 sm:right-2 sm:h-4 sm:w-4`}
	/>
</button>
