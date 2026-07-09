<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Components
	import FirstAccessSection from '$lib/components/build-profile/FirstAccessSection.svelte';
	import FirstStepTrackSection from '$lib/components/build-profile/FirstStepTrackSection.svelte';
	import SecondStepArtistSection from '$lib/components/build-profile/SecondStepArtistSection.svelte';
	import ThirdStepVisibilitySection from '$lib/components/build-profile/ThirdStepVisibilitySection.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let showBuildProfile: boolean = true;
	export let currentStepIndex: number =
		!$userInfo?.trackOfTheMoment &&
		!$userInfo?.artistOfTheMoment &&
		$userInfo?.profileVisibility === 'public'
			? 0
			: 1;

	let buildProfileInfo = {
		track: undefined as TrackSpotify | undefined,
		artist: undefined as ArtistSpotify | undefined,
		profileVisibility: undefined as 'public' | 'private' | undefined
	};

	function closeModal() {
		showBuildProfile = false;
		document.body.style.overflow = '';
	}

	function goToNextStep() {
		currentStepIndex += 1;
	}

	function backToPreviousStep() {
		currentStepIndex -= 1;
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';

		buildProfileInfo = {
			track: undefined,
			artist: undefined,
			profileVisibility: undefined
		};
	});
</script>

{#if showBuildProfile}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-5 backdrop-blur-md transition-all"
	>
		<div
			class={`${currentStepIndex === 0 ? 'max-w-xl' : 'max-w-3xl'} relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-lg border border-b-default bg-s-default shadow-xl`}
		>
			<button
				class="absolute top-2 right-2 z-10 cursor-pointer opacity-70 transition hover:scale-102 hover:opacity-100"
				on:click={closeModal}
				aria-label={$translationsStore.generalTexts.buildProfileCloseModalAriaLabel}
			>
				<CloseIcon
					iconAltText={$translationsStore.generalTexts.buildProfileCloseModalAriaLabel}
					iconSvgClass="h-5 w-5 text-brand-primary"
				/>
			</button>

			<div class="min-w-0 overflow-y-auto p-5 sm:p-6 lg:p-8">
				{#if currentStepIndex === 0}
					<FirstAccessSection {closeModal} {goToNextStep} />
				{:else if currentStepIndex === 1}
					<FirstStepTrackSection
						{goToNextStep}
						{backToPreviousStep}
						bind:buildProfileTrack={buildProfileInfo.track}
					/>
				{:else if currentStepIndex === 2}
					<SecondStepArtistSection
						{goToNextStep}
						{backToPreviousStep}
						bind:buildProfileArtist={buildProfileInfo.artist}
					/>
				{:else if currentStepIndex === 3}
					<ThirdStepVisibilitySection
						{goToNextStep}
						{backToPreviousStep}
						bind:buildProfileVisibility={buildProfileInfo.profileVisibility}
					/>
				{/if}
			</div>
		</div>
	</div>
{/if}
