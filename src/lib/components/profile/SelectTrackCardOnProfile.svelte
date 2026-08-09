<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let handleTrackSelection: (track: TrackSpotify) => void;
	export let choosedTrack: TrackSpotify | undefined;
	export let track: TrackSpotify;
</script>

<button
	class={`${
		choosedTrack?.id === track.id
			? 'border-brand-primary bg-brand-primary/5'
			: 'border-s-muted bg-s-muted'
	}
                        relative flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-5 transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5`}
	aria-label={$translationsStore.profilePage.profilePageSelectYourMusicChooseMusicAriaLabel}
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
		iconSvgClass={`${choosedTrack?.id === track.id ? 'text-brand-primary' : 'text-t-secondary/70'} absolute top-1.5 right-1.5 h-3.5 w-3.5 sm:top-2 sm:right-2 sm:h-4 sm:w-4`}
	/>
</button>
