<script lang="ts">
	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { changeVisibility } from '$lib/services/user/updates/changeVisibility';

	// Props
	export let visibility: 'public' | 'private';

	const visibilityOptions: Array<'public' | 'private'> = ['public', 'private'];

	function getRemainingHours(updatedAt: string | Date): number {
		return Math.max(
			0,
			Math.ceil(
				(new Date(updatedAt).getTime() + 6 * 60 * 60 * 1000 - Date.now()) / (60 * 60 * 1000)
			)
		);
	}

	$: remainingHours = $userInfo?.profileVisibility?.updatedAt
		? getRemainingHours($userInfo.profileVisibility.updatedAt)
		: 0;

	$: canChangeVisibility = remainingHours === 0;

	$: changeAgainMessage =
		remainingHours === 1
			? $translationsStore.settingsPage.settingsPageProfileVisibilityChangeAgainSingularMessage
			: $translationsStore.settingsPage.settingsPageProfileVisibilityChangeAgainPluralMessage;

	async function handleVisibilityChange(option: 'public' | 'private') {
		if (!option || !$userInfo?._id || !canChangeVisibility) return;

		const { visibility, updatedAt } = await changeVisibility($userInfo._id, option, remainingHours);

		userInfo.update((currentUser) => {
			if (!currentUser) return currentUser;

			return {
				...currentUser,
				profileVisibility: {
					visibility,
					updatedAt
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
				disabled={visibility === option || !canChangeVisibility}
				on:click={() => handleVisibilityChange(option)}
				class={`w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 sm:min-w-32 ${
					visibility === option
						? 'bg-brand-primary text-t-inverse shadow-sm'
						: canChangeVisibility
							? 'cursor-pointer bg-brand-primary/10 text-t-primary'
							: 'cursor-not-allowed bg-brand-primary/5 text-t-secondary opacity-50'
				}`}
			>
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
			{#if canChangeVisibility}
				{$translationsStore.settingsPage.settingsPageProfileVisibilityChangeAgainAvailableMessage}
			{:else}
				{@html changeAgainMessage.replace('{hours}', remainingHours.toString())}
			{/if}
		</span>
	</div>
</div>
