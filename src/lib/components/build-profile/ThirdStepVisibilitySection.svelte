<script lang="ts">
	// Props
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

<div class="flex w-full flex-col gap-4">
	<p class="text-xl leading-tight font-bold text-t-primary sm:text-2xl">
		{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph1}
	</p>

	<p class="text-sm leading-relaxed text-t-secondary">
		{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph2}
	</p>

	<div class="mt-2 flex flex-col gap-3">
		<button
			on:click={() => handleVisibilitySelection('public')}
			class={`${buildProfileVisibility === 'public' ? 'border-brand-primary bg-brand-primary/5' : 'border-s-muted'}
				flex w-full cursor-pointer flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5`}
		>
			<p class="font-semibold text-t-primary">
				{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPublicOption}
			</p>

			<p class="text-sm leading-relaxed text-t-secondary">
				{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPublicDescription}
			</p>
		</button>

		<button
			on:click={() => handleVisibilitySelection('private')}
			class={`${buildProfileVisibility === 'private' ? 'border-brand-primary bg-brand-primary/5' : 'border-s-muted'}
				flex w-full cursor-pointer flex-col items-start gap-1 rounded-xl border-2 p-4 text-left transition-all duration-200 hover:border-brand-primary hover:bg-brand-primary/5`}
		>
			<p class="font-semibold text-t-primary">
				{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPrivateOption}
			</p>

			<p class="text-sm leading-relaxed text-t-secondary">
				{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPrivateDescription}
			</p>
		</button>
	</div>

	<div class="mt-2 flex flex-col-reverse gap-3 sm:mt-4 sm:flex-row sm:justify-end">
		<button
			on:click={backToPreviousStep}
			class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-5 py-2 text-sm font-semibold text-t-primary transition hover:scale-102 sm:min-h-10 sm:w-auto sm:text-xs"
		>
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button
			on:click={goToNextStep}
			class="flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-5 py-2 text-sm font-semibold text-s-default transition hover:scale-102 sm:min-h-10 sm:w-auto sm:text-xs"
		>
			{$translationsStore.generalTexts.buildProfileNextStepButton}
		</button>
	</div>
</div>
