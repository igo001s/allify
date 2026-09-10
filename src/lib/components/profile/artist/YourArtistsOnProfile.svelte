<script lang="ts">
	// Components
	import YourArtistOnProfileItem from '$lib/components/profile/artist/YourArtistsOnProfileItem.svelte';
	import EmptyArtistOfTheMoment from '$lib/components/profile/artist/artist-of-the-moment/EmptyArtistOfTheMoment.svelte';
	import EmptyCustomArtist from '$lib/components/profile/artist/custom-artist/EmptyCustomArtist.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openChangeYourItemsModal: (itemType: 'artist') => void;
	export let openSelectYourItemsModal: (itemType: 'artist') => void;
	export let openChangeCustomItemModal: (itemType: 'artist') => void;
	export let openSelectCustomItemModal: (itemType: 'artist') => void;

	$: artistItems = [
		{
			artistItem:
				$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistItem,
			type: 'mostListenedArtist'
		},
		{ artistItem: $userInfo?.artists?.artistOfTheMoment?.artist, type: 'artistOfTheMoment' },
		{ artistItem: $userInfo?.artists?.customArtist?.artist, type: 'customArtist' }
	];
</script>

<section class="space-y-6">
	<h2 class="heading-2">
		{$translationsStore.profilePage.profilePageYourArtistsOnProfileHeading2}
	</h2>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each artistItems as { artistItem, type }}
			{#if artistItem}
				<YourArtistOnProfileItem
					artistItem={{ item: artistItem, type }}
					{openChangeYourItemsModal}
					{openChangeCustomItemModal}
				/>
			{:else if type === 'artistOfTheMoment'}
				<EmptyArtistOfTheMoment {openSelectYourItemsModal} />
			{:else if type === 'customArtist'}
				<EmptyCustomArtist {openSelectCustomItemModal} />
			{/if}
		{/each}
	</div>
</section>
