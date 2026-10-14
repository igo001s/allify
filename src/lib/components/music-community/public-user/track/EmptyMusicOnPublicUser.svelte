<script lang="ts">
	// Components
	import EmptyTrackCard from '#lib/components/general/cards/EmptyTrackCard.svelte';

	// Stores
	import { translationsStore } from '#lib/stores/translations.store';

	// Props
	export let publicUserName: string;
	export let musicType: string;

	$: emptyMusicHeading3 =
		musicType === 'trackOfTheMoment'
			? $translationsStore.musicCommunityPage.publicUser
					.musicCommunityPagePublicUserEmptyMusicOnPublicUserHeading3v1
			: musicType === 'customTrack'
				? $translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserEmptyMusicOnPublicUserHeading3v2
				: '';

	$: emptyMusicHeading4 =
		musicType === 'trackOfTheMoment'
			? $translationsStore.musicCommunityPage.publicUser
					.musicCommunityPagePublicUserEmptyMusicOnPublicUserHeading4v1
			: musicType === 'customTrack'
				? $translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserEmptyMusicOnPublicUserHeading4v2
				: '';
</script>

<EmptyTrackCard
	openModal={undefined}
	emptyTrackHeading3={emptyMusicHeading3}
	emptyTrackAriaLabel={$translationsStore.musicCommunityPage.publicUser
		.musicCommunityPagePublicUserEmptyMusicOnPublicUserAriaLabel}
	sessionType="public-user"
	emptyTrackHeading4={emptyMusicHeading4}
	emptyTrackParagraph1={$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserEmptyMusicOnPublicUserParagraph1.replace(
		'{publicUserName}',
		publicUserName
	)}
/>
