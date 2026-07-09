<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let goToNextStep: () => void;
	export let backToPreviousStep: () => void;
	export let buildProfileVisibility: string | undefined = undefined;

	function handleVisibilitySelection(visibility: 'public' | 'private') {
		if (buildProfileVisibility === visibility) {
			buildProfileVisibility = undefined;
			return;
		}

		buildProfileVisibility = visibility;
	}
</script>

<div class="flex w-full flex-col gap-3 sm:gap-4">
	<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
		{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph1}
	</p>

	<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
		{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph2}
	</p>

	<div class="mt-1 flex flex-col gap-3 sm:mt-2">
		<button
			on:click={() => handleVisibilitySelection('public')}
			class={`${buildProfileVisibility === 'public' ? 'border-brand-primary bg-brand-primary/5' : 'border-s-muted'}
				flex w-full cursor-pointer flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5 sm:gap-1.5 lg:px-6 lg:py-3`}
		>
			<p class="text-xs font-semibold text-t-primary sm:text-sm">
				{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPublicOption}
			</p>

			<p class="text-[10px] leading-relaxed text-t-secondary sm:text-xs">
				{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPublicDescription}
			</p>
		</button>

		<button
			on:click={() => handleVisibilitySelection('private')}
			class={`${buildProfileVisibility === 'private' ? 'border-brand-primary bg-brand-primary/5' : 'border-s-muted'}
				flex w-full cursor-pointer flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5 sm:gap-1.5 lg:px-6 lg:py-3`}
		>
			<p class="text-xs font-semibold text-t-primary sm:text-sm">
				{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPrivateOption}
			</p>

			<p class="text-[10px] leading-relaxed text-t-secondary sm:text-xs">
				{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPrivateDescription}
			</p>
		</button>
	</div>

	<p class="text-center text-[10px] leading-relaxed text-t-secondary sm:text-[11px]">
		{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph3}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button
			on:click={backToPreviousStep}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
		>
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button
			on:click={goToNextStep}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
		>
			{$translationsStore.generalTexts.buildProfileNextStepButton}
		</button>
	</div>
</div>
