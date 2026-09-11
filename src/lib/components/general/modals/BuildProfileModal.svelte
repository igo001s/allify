<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Components
	import Modal from '$lib/components/general/modals/Modal.svelte';
	import FirstAccessSection from '$lib/components/build-profile/FirstAccessSection.svelte';
	import FirstStepTrackSection from '$lib/components/build-profile/FirstStepTrackSection.svelte';
	import SecondStepArtistSection from '$lib/components/build-profile/SecondStepArtistSection.svelte';
	import ThirdStepVisibilitySection from '$lib/components/build-profile/ThirdStepVisibilitySection.svelte';
	import SaveBuiltUserSection from '$lib/components/build-profile/SaveBuiltUserSection.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { setProfileVisibilityPublicByDefault } from '$lib/services/user/build/setProfileVisibilityPublicByDefault';

	// Types
	import type { buildProfileInfo } from '$lib/types/UserInfo.type';

	// Props
	export let showBuildProfile: boolean = true;
	export let currentStepIndex: number =
		!$userInfo?.tracks?.trackOfTheMoment &&
		!$userInfo?.artists?.artistOfTheMoment &&
		$userInfo?.profileVisibility?.visibility === undefined
			? 0
			: 1;

	let buildProfileData: buildProfileInfo = {
		track: undefined,
		artist: undefined,
		profileVisibility: undefined
	};

	async function closeModal() {
		showBuildProfile = false;
		document.body.style.overflow = '';

		if ($userInfo?._id) {
			const setProfileVisibilityPublicByDefaultResponse = await setProfileVisibilityPublicByDefault(
				$userInfo?._id
			);

			userInfo.update((currentUser) => {
				if (currentUser) {
					currentUser.profileVisibility = {
						visibility: setProfileVisibilityPublicByDefaultResponse?.visibility
							? setProfileVisibilityPublicByDefaultResponse.visibility
							: 'public'
					};
				}
				return currentUser;
			});
		}
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

		buildProfileData = {
			track: undefined,
			artist: undefined,
			profileVisibility: undefined
		};
	});
</script>

{#if showBuildProfile}
	<Modal
		{closeModal}
		closeModalAriaLabel={$translationsStore.generalTexts.buildProfileCloseModalAriaLabel}
		closeModalAltText={$translationsStore.generalTexts.buildProfileCloseModalAriaLabel}
		additionalClasses={`${currentStepIndex === 0 || currentStepIndex === 4 ? 'max-w-xl' : 'max-w-3xl'}`}
	>
		<div class="min-w-0 overflow-y-auto p-5 sm:p-6 lg:p-8">
			{#if currentStepIndex === 0}
				<FirstAccessSection {closeModal} {goToNextStep} />
			{:else if currentStepIndex === 1}
				<FirstStepTrackSection
					{goToNextStep}
					{backToPreviousStep}
					bind:buildProfileTrack={buildProfileData.track}
				/>
			{:else if currentStepIndex === 2}
				<SecondStepArtistSection
					{goToNextStep}
					{backToPreviousStep}
					bind:buildProfileArtist={buildProfileData.artist}
				/>
			{:else if currentStepIndex === 3}
				<ThirdStepVisibilitySection
					{goToNextStep}
					{backToPreviousStep}
					bind:buildProfileVisibility={buildProfileData.profileVisibility}
				/>
			{:else if currentStepIndex === 4}
				<SaveBuiltUserSection {backToPreviousStep} {closeModal} bind:buildProfileData />
			{/if}
		</div>
	</Modal>
{/if}
