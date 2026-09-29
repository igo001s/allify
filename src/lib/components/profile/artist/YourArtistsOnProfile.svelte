<script lang="ts">
	// Assets
	import ShareIcon from '$lib/assets/icons/ShareIcon.svelte';

	// Components
	import YourArtistOnProfileItem from '$lib/components/profile/artist/YourArtistsOnProfileItem.svelte';
	import EmptyArtistOfTheMoment from '$lib/components/profile/artist/artist-of-the-moment/EmptyArtistOfTheMoment.svelte';
	import EmptyCustomArtist from '$lib/components/profile/artist/custom-artist/EmptyCustomArtist.svelte';
	import ShareData from '$lib/components/general/modals/ShareData.svelte';

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
			artistItem: $userInfo?.connectedStreamings.spotify?.mostListenedArtists?.oneYear[0],
			type: 'mostListenedArtist'
		},
		{ artistItem: $userInfo?.artists?.artistOfTheMoment?.artist, type: 'artistOfTheMoment' },
		{ artistItem: $userInfo?.artists?.customArtist?.artist, type: 'customArtist' }
	];

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
		{#each artistItems as { artistItem, type }, i (i)}
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

{#if showShareDataModal}
	<ShareData 
		bind:showShareDataModal
		shareDataCloseModalButtonAriaLabel={$translationsStore.profilePage.profilePageShareArtistCloseModalButtonAriaLabel}
		shareDataCloseModalIconAriaLabel={$translationsStore.profilePage.profilePageShareArtistCloseModalIconAriaLabel}
		paragraph1={$translationsStore.profilePage.profilePageShareArtistParagraph1}
		paragraph2={$translationsStore.profilePage.profilePageShareArtistParagraph2}
	/>
{/if}