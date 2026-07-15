<script lang="ts">
    // Types  
	import type { ArtistSpotify } from "$lib/types/SpotifyData.type";

    // Props
	export let artistItem: { artist: ArtistSpotify; type: string };
</script>

<div>
	<div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <h3>
            {#if artistItem?.type === 'artistOfTheMoment'}
                Artist of the Moment
            {:else if artistItem?.type === 'mostListenedArtistItem'}
                Most Listened Artist
            {/if}
        </h3>

        <p>{artistItem?.artist?.name}</p>
	</div>
</div>