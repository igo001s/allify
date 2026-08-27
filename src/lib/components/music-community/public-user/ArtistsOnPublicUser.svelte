<script lang="ts">
	// Components
	import ArtistsOnPublicUserItem from "./ArtistsOnPublicUserItem.svelte";

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { PublicUserInfo } from "$lib/types/UserInfo.type";

	// Props
	export let publicUser: PublicUserInfo | null;

	$: artistItems = [
		{
			artistItem: publicUser?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistItem,
			type: 'mostListenedArtist'
		},
		{ artistItem: publicUser?.artists?.artistOfTheMoment?.artist, type: 'artistOfTheMoment' },
		{ artistItem: publicUser?.artists?.customArtist?.artist, type: 'customArtist' }
	];
</script>

<section class="space-y-6">
	<h2 class="text-xl font-semibold text-t-primary sm:text-2xl">
		{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserArtistsOnPublicUserHeading2} {publicUser?.name}
	</h2>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each artistItems as { artistItem, type }}
			{#if artistItem}
				<ArtistsOnPublicUserItem artistItem={{ artist: artistItem, type }} {publicUser} />
			{:else}
				<p>Sem artista disponível</p>
			{/if}
		{/each}
	</div>
</section>