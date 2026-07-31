<script lang="ts">
	// Assets
	import SelectMusicIcon from '$lib/assets/images/icons/SelectMusicIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let openSelectYourItemsModal: (itemType: 'music') => void;
</script>

<div class="flex w-full flex-col gap-3 sm:gap-4 xl:w-1/3">
	<h3 class="text-xs font-semibold tracking-[0.18em] text-t-secondary uppercase">
		{$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentHeading1}
	</h3>

	<button
		class="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-b-default p-5 text-t-primary shadow-xl sm:p-6 md:max-h-56 md:min-h-56"
		on:click={() => openSelectYourItemsModal('music')}
	>
		<div class="flex h-16 w-16 items-center justify-center rounded-full bg-s-muted sm:h-20 sm:w-20">
			<SelectMusicIcon
				iconSvgClass="ml-1.5 h-8 w-8 sm:h-10 sm:w-10"
				iconAltText={$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentAltText}
			/>
		</div>

		<div class="max-w-[16rem] text-center sm:max-w-xs">
			<h4 class="font-semibold">
				{$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentHeading2}
			</h4>

			<p class="mt-1 text-xs leading-relaxed text-t-secondary">
				{$translationsStore.profilePage.profilePageEmptyMusicOfTheMomentParagraph1}
			</p>
		</div>
	</button>
</div>
