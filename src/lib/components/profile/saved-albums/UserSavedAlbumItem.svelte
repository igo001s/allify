<script lang="ts">
	// Props
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { AlbumSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let item: AlbumSpotify;
	export let selectedSavedAlbum: AlbumSpotify | undefined = undefined;
	export let showSelectedSavedAlbumModal: boolean = false;
</script>

<button
	class="flex w-40 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-xl bg-s-muted/90 p-3 transition-all hover:scale-102 sm:w-44"
	onclick={() => {
		selectedSavedAlbum = item;
		showSelectedSavedAlbumModal = true;
	}}
>
	<img
		src={item.images?.[0]?.url}
		alt={item.name}
		class="h-36 w-36 rounded-xl object-cover"
		loading="lazy"
		decoding="async"
		fetchpriority="low"
	/>

	<div class="flex w-full flex-col gap-0.5 text-center">
		<p class="line-clamp-1 text-sm font-semibold text-t-primary">
			{item.name}
		</p>

		<p class="line-clamp-1 text-xs text-t-secondary">
			{item.artists.join(', ')}
		</p>

		<p class="text-xs text-t-secondary/70">
			{item.tracks.total}
			{item.tracks.total === 1
				? $translationsStore.profilePage.profilePageUserAlbumItemTracks.slice(0, -1)
				: $translationsStore.profilePage.profilePageUserAlbumItemTracks}
		</p>
	</div>
</button>
