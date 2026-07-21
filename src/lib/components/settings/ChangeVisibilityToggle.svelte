<script lang="ts">
	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let visibility: 'public' | 'private';

	const visibilityOptions: Array<'public' | 'private'> = ['public', 'private'];

	function handleVisibilityChange(option: 'public' | 'private') {
		userInfo.update((user) => {
			if (!user) return user;

			return {
				...user,
				profileVisibility: {
					visibility: option,
					updatedAt: new Date()
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
				disabled={visibility === option}
				on:click={() => handleVisibilityChange(option)}
				class={`w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 sm:min-w-32 ${
					visibility === option
						? 'bg-brand-primary text-t-inverse shadow-sm'
						: 'cursor-pointer bg-brand-primary/10 text-t-primary'
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
			{@html $translationsStore.settingsPage.settingsPageProfileVisibilityChangeAgainMessage}
		</span>
	</div>
</div>
