<script lang="ts">
	// Components
	import EmptyTrack from '$lib/components/general/EmptyTrack.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openSelectYourItemsModal: (itemType: 'music') => void;
</script>

<EmptyTrack
	openModal={() => openSelectYourItemsModal('music')}
	emptyTrackHeading3={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentHeading1}
	emptyTrackAltText={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentAltText}
	sessionType="profile"
	emptyTrackHeading4={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentHeading2}
	emptyTrackParagraph1={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentParagraph1}
/>
