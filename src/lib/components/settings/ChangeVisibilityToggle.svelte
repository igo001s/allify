<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp?enhanced';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { updateProfileVisibility } from '$lib/services/user/updates/updateProfileVisibility';

	// Props
	export let visibility: 'public' | 'private';

	const visibilityOptions: Array<'public' | 'private'> = ['public', 'private'];

	async function handleVisibilityChange(option: 'public' | 'private') {
		if (!option || !$userInfo?._id) return;

		const updatedVisibility = await updateProfileVisibility(
			$userInfo._id,
			option,
			$userInfo?.tickets,
			$userInfo?.profileVisibility?.nextFreeUpdate
		);

		if (!updatedVisibility) return;

		userInfo.update((currentUser) => {
			if (!currentUser) return currentUser;

			return {
				...currentUser,
				profileVisibility: {
					visibility: updatedVisibility.visibility,
					nextFreeUpdate: updatedVisibility.nextFreeUpdate
				}
			};
		});
	}
</script>

<div class="flex w-full flex-col gap-3">
	<div
		class="bg-background-secondary flex w-full max-w-xl flex-col gap-3 rounded-xl border border-brand-primary/20 p-3 sm:flex-row sm:gap-4"
	>
		{#each visibilityOptions as option}
			<button
				on:click={() => handleVisibilityChange(option)}
				class={`flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 sm:min-w-32 ${
					visibility === option
						? 'bg-brand-primary text-t-inverse shadow-sm'
						: 'cursor-pointer bg-brand-primary/10 pr-10 text-t-primary'
				}`}
			>
				{#if visibility !== option && $userInfo?.profileVisibility?.nextFreeUpdate && new Date($userInfo.profileVisibility.nextFreeUpdate) > new Date()}
					<div
						class="ml-2 flex w-fit items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-brand-primary shadow-sm"
					>
						<enhanced:img
							src={TicketIcon}
							alt={$translationsStore.generalTexts.ticketAltText}
							class="h-3 w-3"
						/>

						<span class="text-[11px] leading-none font-bold">-1</span>
					</div>
				{/if}

				{option === 'public'
					? $translationsStore.settingsPage.settingsPageProfileVisibilityPublicOption
					: $translationsStore.settingsPage.settingsPageProfileVisibilityPrivateOption}
			</button>
		{/each}
	</div>

	<div class="flex flex-col gap-5">
		<p class="text-sm leading-relaxed text-t-secondary">
			{#if visibility === 'public'}
				{$translationsStore.settingsPage.settingsPageProfileVisibilityPublicDescription}
			{:else}
				{$translationsStore.settingsPage.settingsPageProfileVisibilityPrivateDescription}
			{/if}
		</p>

		<span class="text-xs text-t-secondary/70">
			{#if $userInfo?.profileVisibility.nextFreeUpdate && new Date($userInfo.profileVisibility.nextFreeUpdate) > new Date()}
				{$translationsStore.settingsPage.settingsPageProfileVisibilityChangeAgainMessage}

				<strong class="font-medium text-t-primary">
					{new Date($userInfo.profileVisibility.nextFreeUpdate).toLocaleString(
						$translationsStore.locale,
						{
							dateStyle: 'short',
							timeStyle: 'short'
						}
					)}
				</strong>
			{:else}
				{$translationsStore.settingsPage.settingsPageProfileVisibilityChangeAgainAvailableMessage}
			{/if}
		</span>
	</div>
</div>
