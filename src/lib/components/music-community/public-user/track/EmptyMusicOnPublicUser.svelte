<script lang="ts">
	// Components
	import EmptyTrack from '$lib/components/general/EmptyTrack.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let publicUserName: string;
	export let musicType: string;

	function getEmptyMusicHeading3(): string {
		if (musicType === 'trackOfTheMoment') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyMusicOnPublicUserHeading3v1;
		} else if (musicType === 'customTrack') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyMusicOnPublicUserHeading3v2;
		}

		return '';
	}

	function getEmptyMusicHeading4(): string {
		if (musicType === 'trackOfTheMoment') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyMusicOnPublicUserHeading4v1;
		} else if (musicType === 'customTrack') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyMusicOnPublicUserHeading4v2;
		}

		return '';
	}
</script>

<EmptyTrack
	openModal={undefined}
	emptyTrackHeading3={getEmptyMusicHeading3()}
	emptyTrackAltText={$translationsStore.musicCommunityPage.publicUser
		.musicCommunityPagePublicUserEmptyMusicOnPublicUserAltText}
	sessionType="public-user"
	emptyTrackHeading4={getEmptyMusicHeading4()}
	emptyTrackParagraph1={$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserEmptyMusicOnPublicUserParagraph1.replace(
		'{publicUserName}',
		publicUserName
	)}
/>
