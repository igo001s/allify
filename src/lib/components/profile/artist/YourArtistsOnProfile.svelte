<script lang="ts">
	// Assets
	import ShareIcon from '$lib/assets/icons/ShareIcon.svelte';

	// Components
	import YourArtistOnProfileItem from '$lib/components/profile/artist/YourArtistsOnProfileItem.svelte';
	import EmptyArtistOfTheMoment from '$lib/components/profile/artist/artist-of-the-moment/EmptyArtistOfTheMoment.svelte';
	import EmptyCustomArtist from '$lib/components/profile/artist/custom-artist/EmptyCustomArtist.svelte';
	import ShareDataModal from '$lib/components/general/modals/ShareDataModal.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Props
	export let openChangeYourItemsModal: (itemType: 'artist') => void;
	export let openSelectYourItemsModal: (itemType: 'artist') => void;
	export let openChangeCustomItemModal: (itemType: 'artist') => void;
	export let openSelectCustomItemModal: (itemType: 'artist') => void;

	$: artistItems = [
		{
			item: $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.oneYear[0],
			type: 'mostListenedArtist'
		},
		{ item: $userInfo?.artists?.artistOfTheMoment?.artist, type: 'artistOfTheMoment' },
		{ item: $userInfo?.artists?.customArtist?.artist, type: 'customArtist' }
	] as { item: ArtistSpotify; type: string }[];

	let showShareDataModal = false;
</script>

<section class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="heading-2">
			{$translationsStore.profilePage.profilePageYourArtistsOnProfileHeading2}
		</h2>

		<button
			class="button-outline button-outline-active button-outline-active-hover group relative h-11 w-40 gap-1.5"
			on:click={() => (showShareDataModal = true)}
		>
			<ShareIcon iconSvgClass="h-4 w-4 text-brand-primary" />

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageShareButton}
		</button>
	</div>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each artistItems as { item, type }, i (i)}
			{#if item}
				<YourArtistOnProfileItem
					artistItem={{ item, type }}
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

{#if showShareDataModal}
	<ShareDataModal
		bind:showShareDataModal
		itemType="artist"
		shareDataCloseModalButtonAriaLabel={$translationsStore.profilePage
			.profilePageShareArtistCloseModalButtonAriaLabel}
		shareDataCloseModalIconAriaLabel={$translationsStore.profilePage
			.profilePageShareArtistCloseModalIconAriaLabel}
		paragraph1={$translationsStore.profilePage.profilePageShareArtistModalParagraph1}
		paragraph2={$translationsStore.profilePage.profilePageShareArtistModalParagraph2}
		musicalItems={artistItems}
	/>
{/if}
