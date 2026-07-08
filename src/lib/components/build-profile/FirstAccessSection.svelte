<script lang="ts">
	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeModal: () => void;
	export let goToNextStep: () => void;
</script>

<div class="flex flex-col gap-3.5">
	<p class="text-xl font-bold text-t-primary sm:text-2xl">
		{$translationsStore.generalTexts.buildProfileFirstAccessSectionParagraph1.replace(
			'{name}',
			$userInfo?.name || ''
		)}
	</p>

	<p class="text-xs font-medium tracking-widest text-t-secondary">
		{$translationsStore.generalTexts.buildProfileFirstAccessSectionParagraph2}
	</p>

	<div class="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
		<button
			on:click={closeModal}
			class="flex w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:w-auto"
		>
			{$translationsStore.generalTexts.buildProfileFirstAccessSectionButtonCompleteLater}
		</button>

		<button
			on:click={goToNextStep}
			class="flex w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 sm:w-auto"
		>
			{$translationsStore.generalTexts.buildProfileFirstAccessSectionButtonCompleteProfile}
		</button>
	</div>
</div>
