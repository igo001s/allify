<script lang="ts">
	// Components
	import ArtistOnProfileItem from './ArtistOnProfileItem.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<section class="space-y-6">
	<h2 class="text-2xl font-semibold text-t-primary">Artists</h2>

	<div class="flex w-full gap-10">
		{#each [{ artistItem: $userInfo?.artistOfTheMoment, type: 'artistOfTheMoment' }, { artistItem: $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistItem, type: 'mostListenedArtistItem' }] as { artistItem, type }}
			{#if artistItem}
				<ArtistOnProfileItem artistItem={{ artist: artistItem, type }} />
			{/if}
		{/each}
	</div>
</section>
