<script lang="ts">
	// Components
	import EmptyArtist from '$lib/components/general/EmptyArtist.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openSelectYourItemsModal: (itemType: 'artist') => void;
</script>

<EmptyArtist
	openModal={() => openSelectYourItemsModal('artist')}
	emptyArtistHeading3={$translationsStore.profilePage.profilePageEmptyArtistOfTheMomentHeading1}
	emptyArtistAltText={$translationsStore.profilePage.profilePageEmptyArtistOfTheMomentAltText}
	sessionType="public-user"
	emptyArtistHeading4={$translationsStore.profilePage.profilePageEmptyArtistOfTheMomentHeading2}
	emptyArtistParagraph1={$translationsStore.profilePage.profilePageEmptyArtistOfTheMomentParagraph1}
/>
