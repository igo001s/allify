<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

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
			const response = await saveBuiltProfile($userInfo._id, buildProfileData);

			userInfo.update((currentUserInfo) => {
				if (currentUserInfo) {
					return { ...currentUserInfo, ...response };
				}
				return currentUserInfo;
			});

			closeModal();
		}

		return;
	}
</script>

<div class="flex w-full flex-col gap-3 sm:gap-4">
	<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
		{$translationsStore.generalTexts.buildProfileSaveBuiltUserSectionParagraph1}
	</p>

	<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
		{$translationsStore.generalTexts.buildProfileSaveBuiltUserSectionParagraph2}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button
			on:click={backToPreviousStep}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
		>
			{$translationsStore.generalTexts.buildProfileBackStepButton}
		</button>

		<button
			on:click={handleSaveBuiltProfile}
			class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:bg-s-inverse-muted sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
		>
			{$translationsStore.generalTexts.buildProfileSaveProfileButton}
		</button>
	</div>
</div>
