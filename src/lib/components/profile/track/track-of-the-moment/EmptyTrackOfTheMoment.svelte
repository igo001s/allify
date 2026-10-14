<script lang="ts">
	// Components
	import EmptyTrackCard from '#lib/components/general/cards/EmptyTrackCard.svelte';

	// Stores
	import { translationsStore } from '#lib/stores/translations.store';

	// Props
	export let openSelectYourItemsModal: (itemType: 'music') => void;
</script>

<EmptyTrackCard
	openModal={() => openSelectYourItemsModal('music')}
	emptyTrackHeading3={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentHeading1}
	emptyTrackAriaLabel={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentAriaLabel}
	sessionType="profile"
	emptyTrackHeading4={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentHeading2}
	emptyTrackParagraph1={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentParagraph1}
/>
