<script lang="ts">
	// Components
	import SelectVisibilityCard from '$lib/components/build-profile/SelectVisibilityCard.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let goToNextStep: () => void;
	export let backToPreviousStep: () => void;
	export let buildProfileVisibility: 'public' | 'private' | undefined = undefined;

	$: visibilityOptions = [
		{
			visibility: 'public' as const,
			paragraph1:
				$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPublicOption,
			paragraph2:
				$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPublicDescription
		},
		{
			visibility: 'private' as const,
			paragraph1:
				$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPrivateOption,
			paragraph2:
				$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionPrivateDescription
		}
	] as { visibility: 'public' | 'private'; paragraph1: string; paragraph2: string }[];
</script>

<p class="build-profile-modal-title">
	{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph1}
</p>

<p class="build-profile-modal-description">
	{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph2}
</p>

<div class="build-profile-modal-selection">
	{#each visibilityOptions as option (option.visibility)}
		<SelectVisibilityCard
			visibility={option.visibility}
			bind:buildProfileVisibility
			paragraph1={option.paragraph1}
			paragraph2={option.paragraph2}
		/>
	{/each}
</div>

<p class="build-profile-modal-hint">
	{$translationsStore.generalTexts.buildProfileThirdStepVisibilitySectionParagraph3}
</p>

<div class="build-profile-modal-footer">
	<button type="button" class="button-secondary" on:click={backToPreviousStep}>
		{$translationsStore.generalTexts.buildProfileBackStepButton}
	</button>

	<button type="button" class="button-primary" on:click={goToNextStep}>
		{$translationsStore.generalTexts.buildProfileNextStepButton}
	</button>
</div>
