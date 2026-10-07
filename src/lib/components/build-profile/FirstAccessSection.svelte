<script lang="ts">
	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let closeModal: () => void;
	export let goToNextStep: () => void;
</script>

<p class="build-profile-modal-title">
	{$translationsStore.generalTexts.buildProfileFirstAccessSectionParagraph1.replace(
		'{name}',
		$userInfo?.name || ''
	)}
</p>

<p class="build-profile-modal-description">
	{$translationsStore.generalTexts.buildProfileFirstAccessSectionParagraph2}
</p>

<div class="build-profile-modal-footer">
	<button on:click={closeModal} class="button-secondary px-6 py-2.5">
		{$translationsStore.generalTexts.buildProfileFirstAccessSectionButtonCompleteLater}
	</button>

	<button on:click={goToNextStep} class="button-primary px-6 py-2.5">
		{$translationsStore.generalTexts.buildProfileFirstAccessSectionButtonCompleteProfile}
	</button>
</div>
