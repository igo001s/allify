<script lang="ts">
	// Components
	import EmptyArtistCard from '#lib/components/general/cards/EmptyArtistCard.svelte';

	// Stores
	import { translationsStore } from '#lib/stores/translations.store';

	// Props
	export let openSelectYourItemsModal: (itemType: 'artist') => void;
</script>

<EmptyArtistCard
	openModal={() => openSelectYourItemsModal('artist')}
	emptyArtistHeading3={$translationsStore.profilePage.profilePageEmptyArtistOfTheMomentHeading1}
	emptyArtistAriaLabel={$translationsStore.profilePage.profilePageEmptyArtistOfTheMomentAriaLabel}
	sessionType="profile"
	emptyArtistHeading4={$translationsStore.profilePage.profilePageEmptyArtistOfTheMomentHeading2}
	emptyArtistParagraph1={$translationsStore.profilePage.profilePageEmptyArtistOfTheMomentParagraph1}
/>
