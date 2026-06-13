<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let item: any;
	export let showSelectedPlaylistModal: boolean;
	export let selectedPlaylist: any;

	function selectPlaylist() {
		selectedPlaylist = item;
		showSelectedPlaylistModal = true;
		document.body.style.overflow = 'hidden';
	}
</script>

<button
	class="flex w-40 shrink-0 cursor-pointer flex-col items-center gap-2 rounded-lg bg-s-muted/90 p-3 transition-all hover:scale-102 sm:w-44"
	on:click={selectPlaylist}
>
	{#if item.image?.url}
		<img
			src={item.image?.url}
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

		{#if item.owner}
			<p class="line-clamp-1 text-xs text-t-secondary">
				{$translationsStore.profilePage.profilePageUserPlaylistItemBy}
				{item.owner}
			</p>
		{/if}

		{#if item.tracks}
			<p class="text-xs text-t-secondary/70">
				{item.tracks.total}
				{item.tracks.total === 1
					? $translationsStore.profilePage.profilePageUserPlaylistItemMusics.slice(0, -1)
					: $translationsStore.profilePage.profilePageUserPlaylistItemMusics}
			</p>
		{/if}
	</div>
</button>
