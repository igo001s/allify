<script lang="ts">
	// Components
	import ArtistOnProfileItem from "./ArtistOnProfileItem.svelte";
    
	// Stores
	import { userInfo } from "$lib/stores/userInfo.store";
</script>

<div>
    <h2>Artists</h2>

	<div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
		{#each [{ artistItem: $userInfo?.artistOfTheMoment, type: 'artistOfTheMoment' }, { artistItem: $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistItem, type: 'mostListenedArtistItem' }] as {artistItem, type}}
			{#if artistItem && type}
				<ArtistOnProfileItem artistItem={{ artist: artistItem, type }} />
			{/if}
		{/each}
	</div>
</div>