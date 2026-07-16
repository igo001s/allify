<script lang="ts">
	// Components
	import MusicOnProfileItem from './MusicOnProfileItem.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<section class="space-y-6">
	<h2 class="text-2xl font-semibold text-t-primary">Music</h2>

	<div class="flex w-full gap-10">
		{#each [{ trackItem: $userInfo?.trackOfTheMoment, type: 'trackOfTheMoment' }, { trackItem: $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTrackItem, type: 'mostListenedTrackItem' }] as { trackItem, type }}
			{#if trackItem}
				<MusicOnProfileItem trackItem={{ track: trackItem, type }} />
			{/if}
		{/each}
	</div>
</section>
