<script lang="ts">
	// Components
	import EmptyArtist from '$lib/components/general/EmptyArtist.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openSelectCustomItemModal: (itemType: 'artist') => void;
</script>

<EmptyArtist
	openModal={() => openSelectCustomItemModal('artist')}
	emptyArtistHeading3={$translationsStore.profilePage.profilePageEmptyCustomArtistHeading1}
	emptyArtistAltText={$translationsStore.profilePage.profilePageEmptyCustomArtistAltText}
	sessionType="profile"
	emptyArtistHeading4={$translationsStore.profilePage.profilePageEmptyCustomArtistHeading2}
	emptyArtistParagraph1={$translationsStore.profilePage.profilePageEmptyCustomArtistParagraph1}
/>
