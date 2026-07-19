<script lang="ts">
	// Components
	import YourSongsOnProfileItem from './YourSongsOnProfileItem.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<section class="space-y-6">
	<h2 class="text-2xl font-semibold text-t-primary">
		{$translationsStore.profilePage.profilePageYourSongsOnProfileHeading2}
	</h2>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each [{ trackItem: $userInfo?.trackOfTheMoment, type: 'trackOfTheMoment' }, { trackItem: $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTrackItem, type: 'mostListenedTrack' }] as { trackItem, type }}
			{#if trackItem}
				<YourSongsOnProfileItem trackItem={{ track: trackItem, type }} />
			{/if}
		{/each}
	</div>
</section>
