<script lang="ts">
	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeModal: () => void;
	export let goToNextStep: () => void;
</script>

<div class="flex w-full flex-col gap-3 sm:gap-4">
	<p class="text-lg font-bold text-t-primary sm:text-xl">
		{$translationsStore.generalTexts.buildProfileFirstAccessSectionParagraph1.replace(
			'{name}',
			$userInfo?.name || ''
		)}
	</p>

	<p class="text-xs text-t-secondary sm:text-sm">
		{$translationsStore.generalTexts.buildProfileFirstAccessSectionParagraph2}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button on:click={closeModal} class="button-secondary px-6 py-2.5">
			{$translationsStore.generalTexts.buildProfileFirstAccessSectionButtonCompleteLater}
		</button>

		<button on:click={goToNextStep} class="button-primary px-6 py-2.5">
			{$translationsStore.generalTexts.buildProfileFirstAccessSectionButtonCompleteProfile}
		</button>
	</div>
</div>
