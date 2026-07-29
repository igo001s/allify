<script lang="ts">
	// Assets
	import SelectMusicIcon from '$lib/assets/images/icons/SelectMusicIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openSelectYourItemsModal: (itemType: 'music') => void;
</script>

<div class="flex w-full flex-col gap-4 2xl:w-2/6">
	<h3 class="text-xs font-semibold uppercase tracking-[0.18em] text-t-secondary">
		{$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentHeading1}
	</h3>

	<button
		class="flex h-full cursor-pointer flex-col items-center justify-center min-h-56 max-h-56 gap-2 rounded-xl border border-b-default p-6 text-t-primary shadow-xl transition-all duration-300"
		on:click={() => openSelectYourItemsModal('music')}
	>
		<div class="flex h-20 w-20 items-center justify-center rounded-full bg-s-muted">
			<SelectMusicIcon
				iconSvgClass="ml-1.5 h-10 w-10"
				iconAltText={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentAltText}
			/>
		</div>

		<div class="max-w-xs text-center">
			<h4 class="font-semibold">
				{$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentHeading2}
			</h4>

			<p class="mt-1 text-xs leading-relaxed text-t-secondary">
				{$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentParagraph1}
			</p>
		</div>
	</button>
</div>