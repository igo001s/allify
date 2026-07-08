<script lang="ts">
	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeModal: () => void;
	export let goToNextStep: () => void;
</script>

<div class="flex w-full flex-col gap-4">
	<p class="text-xl font-bold leading-tight text-t-primary sm:text-2xl">
		{$translationsStore.generalTexts.buildProfileFirstAccessSectionParagraph1.replace(
			'{name}',
			$userInfo?.name || ''
		)}
	</p>

	<p
		class="text-sm leading-relaxed text-t-secondary sm:text-xs sm:tracking-widest"
	>
		{$translationsStore.generalTexts.buildProfileFirstAccessSectionParagraph2}
	</p>

	<div class="mt-2 flex flex-col gap-3 sm:mt-4 sm:flex-row sm:justify-end">
		<button
			on:click={closeModal}
			class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-5 py-2 text-sm font-semibold text-t-primary transition hover:scale-102 sm:min-h-10 sm:w-auto sm:text-xs"
		>
			{$translationsStore.generalTexts.buildProfileFirstAccessSectionButtonCompleteLater}
		</button>

		<button
			on:click={goToNextStep}
			class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-5 py-2 text-sm font-semibold text-s-default transition hover:scale-102 sm:min-h-10 sm:w-auto sm:text-xs"
		>
			{$translationsStore.generalTexts.buildProfileFirstAccessSectionButtonCompleteProfile}
		</button>
	</div>
</div>
