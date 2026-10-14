<script lang="ts">
	// Components
	import EmptyTrackCard from '#lib/components/general/cards/EmptyTrackCard.svelte';

	// Stores
	import { translationsStore } from '#lib/stores/translations.store';

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

<EmptyTrackCard
	openModal={undefined}
	emptyTrackHeading3={getEmptyMusicHeading3()}
	emptyTrackAriaLabel={$translationsStore.musicCommunityPage.publicUser
		.musicCommunityPagePublicUserEmptyMusicOnPublicUserAriaLabel}
	sessionType="public-user"
	emptyTrackHeading4={getEmptyMusicHeading4()}
	emptyTrackParagraph1={$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserEmptyMusicOnPublicUserParagraph1.replace(
		'{publicUserName}',
		publicUserName
	)}
/>
