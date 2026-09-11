<script lang="ts">
	// Components
	import SelectVisibilityCard from '$lib/components/build-profile/SelectVisibilityCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let goToNextStep: () => void;
	export let backToPreviousStep: () => void;
	export let buildProfileVisibility: 'public' | 'private' | undefined = undefined;
</script>

<div class="flex w-full flex-col gap-3 sm:gap-4">
	<p class="text-lg font-bold text-t-primary sm:text-xl">
		{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph1}
	</p>

	<p class="text-xs text-t-secondary sm:text-sm">
		{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph2}
	</p>

	<div class="mt-1 flex flex-col gap-3 sm:mt-2">
		{#each [{ visibility: 'public' as 'public', paragraph1: $translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPublicOption, paragraph2: $translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPublicDescription }, { visibility: 'private' as 'private', paragraph1: $translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPrivateOption, paragraph2: $translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPrivateDescription }] as option}
			<SelectVisibilityCard
				visibility={option.visibility}
				bind:buildProfileVisibility
				paragraph1={option.paragraph1}
				paragraph2={option.paragraph2}
			/>
		{/each}
	</div>

	<p class="text-center text-[10px] text-t-secondary sm:text-[11px]">
		{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph3}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button on:click={backToPreviousStep} class="button-secondary px-6 py-2.5">
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button on:click={goToNextStep} class="button-primary px-6 py-2.5">
			{$translationsStore.generalTexts.buildProfileNextStepButton}
		</button>
	</div>
</div>
