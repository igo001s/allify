<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Components
	import FirstAccessSection from '$lib/components/build-profile/FirstAccessSection.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let showBuildProfile: boolean = true;
	export let currentStepIndex: number = !$userInfo?.trackOfTheMoment && !$userInfo?.artistOfTheMoment && $userInfo?.public === false ? 0 : 1;

	function closeModal() {
		showBuildProfile = false;
		document.body.style.overflow = '';
	}

	function goToNextStep() {
		currentStepIndex += 1;
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

{#if showBuildProfile}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-4 transition-all backdrop-blur-md"
	>
		<div
			class="relative flex h-fit w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-b-default bg-s-default shadow-xl"
		>
			<button
				class="absolute top-5 right-5 z-10 cursor-pointer opacity-70 transition hover:scale-102 hover:opacity-100"
				on:click={closeModal}
				aria-label="Close Build Profile Modal"
			>
				<CloseIcon iconAltText={'Close Build Profile Modal'} iconSvgClass="w-5 h-5 text-brand-primary" />
			</button>

			<div class="min-w-0 p-7">
				{#if currentStepIndex === 0}
					<FirstAccessSection {closeModal} {goToNextStep} />
				{:else if currentStepIndex === 1}
					<!-- Step 1 - Track -->
				{:else if currentStepIndex === 2}
					<!-- Step 2 - Artist -->
				{:else if currentStepIndex === 3}
					<!-- Step 3 - Profile Visibility -->
				{/if}
			</div>
		</div>
	</div>
{/if}
