<script lang="ts">
	// Components
	import EmptyTrackCard from '#lib/components/general/cards/EmptyTrackCard.svelte';

	// Stores
	import { translationsStore } from '#lib/stores/translations.store';

	// Props
	export let openSelectCustomItemModal: (itemType: 'music') => void;
</script>

<EmptyTrackCard
	openModal={() => openSelectCustomItemModal('music')}
	emptyTrackHeading3={$translationsStore.profilePage.profilePageEmptyCustomMusicHeading1}
	emptyTrackAriaLabel={$translationsStore.profilePage.profilePageEmptyCustomMusicAriaLabel}
	sessionType="profile"
	emptyTrackHeading4={$translationsStore.profilePage.profilePageEmptyCustomMusicHeading2}
	emptyTrackParagraph1={$translationsStore.profilePage.profilePageEmptyCustomMusicParagraph1}
/>
