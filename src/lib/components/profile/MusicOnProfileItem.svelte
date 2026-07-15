<script lang="ts">
    // Types  
	import type { TrackSpotify } from "$lib/types/SpotifyData.type";

    // Props
	export let trackItem: { track: TrackSpotify; type: string };
</script>

<div>
	<div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <h3>
            {#if trackItem?.type === 'trackOfTheMoment'}
                Music of the Moment
            {:else if trackItem?.type === 'mostListenedTrackItem'}
                Most Listened Music
            {/if}
        </h3>

        <p>{trackItem?.track?.name}</p>
	</div>
</div>