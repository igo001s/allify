<script lang="ts">
	// Components
	import EmptyArtistCard from '#lib/components/general/cards/EmptyArtistCard.svelte';

	// Stores
	import { translationsStore } from '#lib/stores/translations.store';

	// Props
	export let openSelectCustomItemModal: (itemType: 'artist') => void;
</script>

<EmptyArtistCard
	openModal={() => openSelectCustomItemModal('artist')}
	emptyArtistHeading3={$translationsStore.profilePage.profilePageEmptyCustomArtistHeading1}
	emptyArtistAriaLabel={$translationsStore.profilePage.profilePageEmptyCustomArtistAriaLabel}
	sessionType="profile"
	emptyArtistHeading4={$translationsStore.profilePage.profilePageEmptyCustomArtistHeading2}
	emptyArtistParagraph1={$translationsStore.profilePage.profilePageEmptyCustomArtistParagraph1}
/>
