<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let handleArtistSelection: (artist: ArtistSpotify) => void;
	export let choosedArtist: ArtistSpotify | undefined;
	export let artist: ArtistSpotify;
</script>

<button
	class={`${
		choosedArtist?.id === artist.id
			? 'border-brand-primary bg-brand-primary/5'
			: 'border-s-muted bg-s-muted'
	}
	relative flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 px-2 py-5 transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5`}
	aria-label={$translationsStore.profilePage.profilePageSelectYourArtistChooseArtistAriaLabel}
	on:click={() => handleArtistSelection(artist)}
>
	{#if artist.image}
		<enhanced:img
			src={artist.image.url}
			alt={artist.name}
			class="h-14 w-14 rounded-lg object-cover sm:h-20 sm:w-20"
			loading="lazy"
		/>
	{/if}

	<div class="flex w-full flex-col gap-0.5 text-center">
		<p class="line-clamp-2 text-[11px] leading-tight font-semibold text-t-primary sm:text-xs">
			{artist.name}
		</p>

		<p class="line-clamp-1 text-[9px] text-t-secondary/70 sm:text-[10px]">
			{artist.followers.toLocaleString()}
			{$translationsStore.profilePage.profilePageSelectYourArtistChooseArtistFollowers}
		</p>
	</div>

	<SpotifyIcon
		iconSvgClass={`${choosedArtist?.id === artist.id ? 'text-brand-primary' : 'text-t-secondary/70'} absolute top-1.5 right-1.5 h-3.5 w-3.5 sm:top-2 sm:right-2 sm:h-4 sm:w-4`}
	/>
</button>
