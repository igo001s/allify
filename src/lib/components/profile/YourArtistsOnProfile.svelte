<script lang="ts">
	// Components
	import YourArtistOnProfileItem from './YourArtistsOnProfileItem.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	const artistItems = [
		{
			artistItem:
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistItem,
			type: 'mostListenedArtist'
		},
		{ artistItem: $userInfo?.artistOfTheMoment, type: 'artistOfTheMoment' }
	];
</script>

<section class="space-y-6">
	<h2 class="text-2xl font-semibold text-t-primary">
		{$translationsStore.profilePage.profilePageYourArtistsOnProfileHeading2}
	</h2>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each artistItems as { artistItem, type }}
			{#if artistItem}
				<YourArtistOnProfileItem artistItem={{ artist: artistItem, type }} />
			{/if}
		{/each}
	</div>
</section>
