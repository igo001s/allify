<script lang="ts">
	// Components
	import MusicOnProfileItem from "./MusicOnProfileItem.svelte";
    
	// Stores
	import { userInfo } from "$lib/stores/userInfo.store";
</script>

<div>
    <h2>Music</h2>

	<div class="flex flex-col gap-4 lg:flex-row lg:gap-8">
		{#each [{ trackItem: $userInfo?.trackOfTheMoment, type: 'trackOfTheMoment' }, { trackItem: $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTrackItem, type: 'mostListenedTrackItem' }] as {trackItem, type}}
			{#if trackItem && type}
				<MusicOnProfileItem trackItem={{ track: trackItem, type }} />
			{/if}
		{/each}
	</div>
</div>