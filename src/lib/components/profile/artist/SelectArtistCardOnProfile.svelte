<script lang="ts">
	// Components
	import SelectItemCard from '../../general/cards/SelectItemCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';

	// Props
	export let handleArtistSelection: (artist: ArtistSpotify) => void;
	export let choosedArtist: ArtistSpotify | undefined;
	export let artist: ArtistSpotify;
</script>

<SelectItemCard
	handleItemSelection={handleArtistSelection}
	itemAriaLabel={$translationsStore.profilePage.profilePageSelectYourArtistChooseArtistAriaLabel}
	item={artist}
	itemType="artist"
	selected={choosedArtist?.id === artist.id}
/>
