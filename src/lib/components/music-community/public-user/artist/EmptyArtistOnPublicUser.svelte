<script lang="ts">
	// Components
	import EmptyArtistCard from '#lib/components/general/cards/EmptyArtistCard.svelte';

	// Stores
	import { translationsStore } from '#lib/stores/translations.store';

	// Props
	export let publicUserName: string;
	export let artistType: string;

	$: emptyArtistHeading3 =
		artistType === 'artistOfTheMoment'
			? $translationsStore.musicCommunityPage.publicUser
					.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading3v1
			: artistType === 'customArtist'
				? $translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading3v2
				: '';

	$: emptyArtistHeading4 =
		artistType === 'artistOfTheMoment'
			? $translationsStore.musicCommunityPage.publicUser
					.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading4v1
			: artistType === 'customArtist'
				? $translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading4v2
				: '';
</script>

<EmptyArtistCard
	openModal={undefined}
	{emptyArtistHeading3}
	emptyArtistAriaLabel={$translationsStore.musicCommunityPage.publicUser
		.musicCommunityPagePublicUserEmptyArtistOnPublicUserAriaLabel}
	sessionType="public-user"
	{emptyArtistHeading4}
	emptyArtistParagraph1={$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserEmptyArtistOnPublicUserParagraph1.replace(
		'{publicUserName}',
		publicUserName
	)}
/>
