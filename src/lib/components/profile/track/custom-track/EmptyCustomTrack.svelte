<script lang="ts">
	// Components
	import EmptyTrack from '$lib/components/general/EmptyTrack.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openSelectCustomItemModal: (itemType: 'music') => void;
</script>

<EmptyTrack
	openModal={() => openSelectCustomItemModal('music')}
	emptyTrackHeading3={$translationsStore.profilePage.profilePageEmptyCustomMusicHeading1}
	emptyTrackAltText={$translationsStore.profilePage.profilePageEmptyCustomMusicAltText}
	sessionType="profile"
	emptyTrackHeading4={$translationsStore.profilePage.profilePageEmptyCustomMusicHeading2}
	emptyTrackParagraph1={$translationsStore.profilePage.profilePageEmptyCustomMusicParagraph1}
/>
