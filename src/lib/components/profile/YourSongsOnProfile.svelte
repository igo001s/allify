<script lang="ts">
	// Components
	import YourSongsOnProfileItem from './YourSongsOnProfileItem.svelte';
	import EmptyTrackOfTheMoment from './EmptyTrackOfTheMoment.svelte';
	import EmptyCustomTrack from './EmptyCustomTrack.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openChangeYourItemsModal: (itemType: 'music') => void;
	export let openSelectYourItemsModal: (itemType: 'music') => void;
	export let openChangeCustomItemModal: (itemType: 'music') => void;
	export let openSelectCustomItemModal: (itemType: 'music') => void;

	$: songsItems = [
		{
			trackItem: $userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTrackItem,
			type: 'mostListenedTrack'
		},
		{ trackItem: $userInfo?.trackOfTheMoment?.track, type: 'trackOfTheMoment' },
		{ trackItem: $userInfo?.customTrack?.track, type: 'customTrack' }
	];
</script>

<section class="space-y-7">
	<h2 class="text-xl font-semibold text-t-primary sm:text-2xl">
		{$translationsStore.profilePage.profilePageYourSongsOnProfileHeading2}
	</h2>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each songsItems as { trackItem, type }}
			{#if trackItem}
				<YourSongsOnProfileItem
					trackItem={{ track: trackItem, type }}
					{openChangeYourItemsModal}
					{openChangeCustomItemModal}
				/>
			{:else if type === 'trackOfTheMoment'}
				<EmptyTrackOfTheMoment {openSelectYourItemsModal} />
			{:else if type === 'customTrack'}
				<EmptyCustomTrack {openSelectCustomItemModal} />
			{/if}
		{/each}
	</div>
</section>
