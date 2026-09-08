<script lang="ts">
	// Components
	import EmptyArtist from '$lib/components/general/EmptyArtist.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let publicUserName: string;
	export let artistType: string;

	function getEmptyArtistHeading3(): string {
		if (artistType === 'artistOfTheMoment') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading3v1;
		} else if (artistType === 'customArtist') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading3v2;
		}

		return '';
	}

	function getEmptyArtistHeading4(): string {
		if (artistType === 'artistOfTheMoment') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading4v1;
		} else if (artistType === 'customArtist') {
			return $translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading4v2;
		}

		return '';
	}
</script>

<EmptyArtist
	openModal={undefined}
	emptyArtistHeading3={getEmptyArtistHeading3()}
	emptyArtistAltText={$translationsStore.musicCommunityPage.publicUser
		.musicCommunityPagePublicUserEmptyArtistOnPublicUserAltText}
	sessionType="public-user"
	emptyArtistHeading4={getEmptyArtistHeading4()}
	emptyArtistParagraph1={$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserEmptyArtistOnPublicUserParagraph1.replace(
		'{publicUserName}',
		publicUserName
	)}
/>
