<script lang="ts">
	// Assets
	import EditArtistIcon from '$lib/assets/icons/EditArtistIcon.svelte';
	import EditMusicIcon from '$lib/assets/icons/EditMusicIcon.svelte';

	// Props
	export let handleEditButtonClick: (() => void) | undefined = undefined;
	export let showEditButtonAriaLabel: string | undefined = undefined;
	export let showEditIconAriaLabel: string | undefined = undefined;
	export let itemType: 'artist' | 'music';
</script>

<button
	class="absolute top-3 right-3 cursor-pointer text-t-primary hover:scale-105 hover:text-brand-primary sm:top-5 sm:right-5"
	aria-label={showEditButtonAriaLabel}
	on:click={handleEditButtonClick}
>
	{#if itemType === 'artist'}
		<EditArtistIcon iconSvgClass="h-5 w-5 sm:h-6 sm:w-6" iconAriaLabel={showEditIconAriaLabel} />
	{:else if itemType === 'music'}
		<EditMusicIcon iconSvgClass="h-5 w-5 sm:h-6 sm:w-6" iconAriaLabel={showEditIconAriaLabel} />
	{/if}
</button>
