<script lang="ts">
	// Assets
	import SelectArtistIcon from '$lib/assets/images/icons/SelectArtistIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openSelectCustomItemModal: (itemType: 'artist') => void;
</script>

<div class="flex w-full flex-col gap-4 xl:w-1/3">
	<h3 class="truncate text-xs font-semibold tracking-[0.18em] text-t-secondary uppercase">
		{$translationsStore.profilePage.profilePageEmptyCustomArtistHeading1}
	</h3>

	<button
		class="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-b-default p-5 text-t-primary shadow-xl sm:p-6 md:max-h-56 md:min-h-56"
		on:click={() => openSelectCustomItemModal('artist')}
	>
		<div class="flex h-16 w-16 items-center justify-center rounded-full bg-s-muted sm:h-20 sm:w-20">
			<SelectArtistIcon
				iconSvgClass="ml-1.5 h-8 w-8 sm:h-10 sm:w-10"
				iconAltText={$translationsStore.profilePage.profilePageEmptyCustomArtistAltText}
			/>
		</div>

		<div class="max-w-[16rem] text-center sm:max-w-xs">
			<h4 class="font-semibold">
				{$translationsStore.profilePage.profilePageEmptyCustomArtistHeading2}
			</h4>

			<p class="mt-1 text-xs leading-relaxed text-t-secondary">
				{$translationsStore.profilePage.profilePageEmptyCustomArtistParagraph1}
			</p>
		</div>
	</button>
</div>
