<script lang="ts">
	// Types
	import type { LikedTrackSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let item: LikedTrackSpotify;
	export let selectedSavedTrack: LikedTrackSpotify | null;
	export let showSelectedSavedTrackModal: boolean;
</script>

<button
	class="flex w-40 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-xl bg-s-muted/90 p-3 transition-all hover:scale-102 sm:w-44"
	onclick={() => {
		selectedSavedTrack = item;
		showSelectedSavedTrackModal = true;
	}}
>
	{#if item.album.image?.url}
		<img
			src={item.album.image?.url}
			alt={item.name}
			class="h-36 w-36 rounded-xl object-cover"
			loading="lazy"
		/>
	{/if}

	<div class="flex w-full flex-col gap-0.5 text-center">
		{#if item.name}
			<p class="line-clamp-1 text-sm font-semibold text-t-primary">
				{item.name}
			</p>
		{/if}

		{#if item.artists}
			<p class="line-clamp-1 text-xs text-t-secondary">
				<span>{item.artists.join(', ')}</span>
			</p>
		{/if}

		{#if item.album.name}
			<p class="line-clamp-1 text-xs text-t-secondary/70">
				{item.album.name}
			</p>
		{/if}
	</div>
</button>
