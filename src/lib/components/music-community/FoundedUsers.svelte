<script lang="ts">
	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Components
	import FoundedUserItem from './FoundedUserItem.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { SearchUserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let searchUserInputValue: string;
	export let foundedUsers: SearchUserInfo[];
	export let loadingFoundedUsers: boolean;
</script>

<div class="flex h-5/6 max-h-5/6 rounded-xl border border-b-default bg-s-default p-5">
	{#if loadingFoundedUsers}
		<div class="mx-auto flex h-full items-center justify-center">
			<DotsLoading dotsTheme="base" />
		</div>
	{:else if foundedUsers !== undefined && foundedUsers.length > 0}
		<div class="flex w-full flex-wrap gap-4">
			{#each foundedUsers as user}
				<FoundedUserItem {user} />
			{/each}
		</div>
	{:else if searchUserInputValue === undefined}
		<div
			class="w-full rounded-xl border border-dashed border-b-default bg-s-muted px-6 py-12 text-center"
		>
			<p class="font-medium text-t-primary">
				{$translationsStore.musicCommunityPage.musicCommunityFavoritesAfterSearchByParagraph1}
				"{searchUserInputValue ||
					$translationsStore.musicCommunityPage.musicCommunityFavoritesAfterSearchByComplement}"
			</p>

			<p class="mt-2 text-sm text-t-secondary">
				{$translationsStore.musicCommunityPage.musicCommunityFavoritesAfterSearchByParagraph2}
			</p>
		</div>
	{:else}
		<div
			class="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-b-default bg-s-muted px-6 py-12 text-center"
		>
			<p class="font-medium text-t-primary">
				{$translationsStore.musicCommunityPage
					.musicCommunityFavoritesAfterSearchByNoResultsParagraph1}
			</p>

			<p class="mt-2 text-sm text-t-secondary">
				{$translationsStore.musicCommunityPage
					.musicCommunityFavoritesAfterSearchByNoResultsParagraph2}
			</p>
		</div>
	{/if}
</div>
