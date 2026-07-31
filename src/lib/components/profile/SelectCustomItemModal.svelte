<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Components
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';
	import SelectCustomArtist from '$lib/components/profile/SelectCustomArtist.svelte';
	import SelectCustomTrack from '$lib/components/profile/SelectCustomTrack.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeSelectCustomItemModal: () => void;
	export let itemType: 'artist' | 'music';

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-5 backdrop-blur-md"
>
	<div
		class="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-b-default bg-s-default shadow-xl"
	>
		<button
			class="absolute top-2 right-2 z-10 cursor-pointer opacity-70 transition hover:scale-102 hover:opacity-100"
			on:click={closeSelectCustomItemModal}
			aria-label={itemType === 'artist'
				? $translationsStore.profilePage.profilePageSelectYourCustomArtistCloseModalAriaLabel
				: $translationsStore.profilePage.profilePageSelectYourCustomMusicCloseModalAriaLabel}
		>
			<CloseIcon
				iconAltText={itemType === 'artist'
					? $translationsStore.profilePage.profilePageSelectYourCustomArtistCloseModalAltText
					: $translationsStore.profilePage.profilePageSelectYourCustomMusicCloseModalAltText}
				iconSvgClass="h-5 w-5 text-brand-primary"
			/>
		</button>

		<div class="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
			<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
				{$translationsStore.profilePage.profilePageSelectYourCustomItemParagraph1}
			</p>

			<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
				{itemType === 'artist'
					? $translationsStore.profilePage.profilePageSelectYourCustomArtistParagraph2
					: $translationsStore.profilePage.profilePageSelectYourCustomMusicParagraph2}
			</p>

			{#if itemType === 'artist'}
				<SelectCustomArtist {closeSelectCustomItemModal} />
			{:else if itemType === 'music'}
				<SelectCustomTrack {closeSelectCustomItemModal} />
			{/if}
		</div>
	</div>
</div>
