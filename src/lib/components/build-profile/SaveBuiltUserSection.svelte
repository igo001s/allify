<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { saveBuiltProfile } from '$lib/services/user/build/saveBuiltProfile';

	// Types
	import type { buildProfileInfo } from '$lib/types/UserInfo.type';

	// Props
	export let backToPreviousStep: () => void;
	export let closeModal: () => void;
	export let buildProfileData: buildProfileInfo;

	async function handleSaveBuiltProfile() {
		if ($userInfo?._id) {
			if (buildProfileData.profileVisibility === undefined) {
				buildProfileData.profileVisibility = 'public';
			}

			const saveBuiltProfileResponse = await saveBuiltProfile($userInfo._id, buildProfileData);

			if (!saveBuiltProfileResponse.error) {
				userInfo.update((currentUser) => {
					if (currentUser) {
						return {
							...currentUser,
							tracks: {
								trackOfTheMoment: {
									track: saveBuiltProfileResponse.trackOfTheMoment.track,
									nextFreeUpdate: saveBuiltProfileResponse.trackOfTheMoment.nextFreeUpdate
								}
							},
							artists: {
								artistOfTheMoment: {
									artist: saveBuiltProfileResponse.artistOfTheMoment.artist,
									nextFreeUpdate: saveBuiltProfileResponse.artistOfTheMoment.nextFreeUpdate
								}
							},
							profileVisibility: {
								visibility: saveBuiltProfileResponse.profileVisibility.visibility
							}
						};
					}
					return currentUser;
				});

				closeModal();

				return;
			} else {
				toastStore.set({
					showToast: true,
					toastType: 'error',
					toastMessage: $translationsStore.generalTexts.buildProfileSaveBuiltUserErrorToast
				});
			}
		} else {
			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage: $translationsStore.generalTexts.buildProfileSaveBuiltUserErrorToast
			});
		}
	}
</script>

<p class="build-profile-modal-title">
	{$translationsStore.generalTexts.buildProfileSaveBuiltUserSectionParagraph1}
</p>

<p class="build-profile-modal-description">
	{$translationsStore.generalTexts.buildProfileSaveBuiltUserSectionParagraph2}
</p>

<div class="build-profile-modal-footer">
	<button on:click={backToPreviousStep} class="button-secondary">
		{$translationsStore.generalTexts.buildProfileBackStepButton}
	</button>

	<button on:click={handleSaveBuiltProfile} class="button-primary">
		{$translationsStore.generalTexts.buildProfileSaveProfileButton}
	</button>
</div>
