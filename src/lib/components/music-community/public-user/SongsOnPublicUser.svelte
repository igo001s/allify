<script lang="ts">
	// Components
	import SongsOnPublicUserItem from '$lib/components/music-community/public-user/SongsOnPublicUserItem.svelte';
	import EmptyMusicOnPublicUser from '$lib/components/music-community/public-user/EmptyMusicOnPublicUser.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { PublicUserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let publicUser: PublicUserInfo;

	$: songsItems = [
		{
			trackItem: publicUser?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTrackItem,
			type: 'mostListenedTrack'
		},
		{ trackItem: publicUser?.tracks?.trackOfTheMoment?.track, type: 'trackOfTheMoment' },
		{ trackItem: publicUser?.tracks?.customTrack?.track, type: 'customTrack' }
	];
</script>

<section class="space-y-7">
	<h2 class="text-xl font-semibold text-t-primary sm:text-2xl">
		{$translationsStore.musicCommunityPage.publicUser
			.musicCommunityPagePublicUserSongsOnPublicUserHeading2}
		{publicUser?.name}
	</h2>

	<div class="flex flex-col gap-8 xl:flex-row">
		{#each songsItems as { trackItem, type }}
			{#if trackItem}
				<SongsOnPublicUserItem trackItem={{ track: trackItem, type }} {publicUser} />
			{:else}
				<EmptyMusicOnPublicUser publicUserName={publicUser?.name} musicType={type} />
			{/if}
		{/each}
	</div>
</section>
