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
	export let searchUserInputValue: string = '';
	export let foundedUsers: SearchUserInfo[] | undefined = undefined;
	export let loadingFoundedUsers: boolean = false;
	export let hasSearched: boolean = false;
</script>

<div class="flex h-80 max-h-80 rounded-xl border border-b-default bg-s-default p-5">
	{#if loadingFoundedUsers}
		<div class="mx-auto flex h-full items-center justify-center">
			<DotsLoading dotsTheme="base" />
		</div>
	{:else if foundedUsers && foundedUsers.length > 0}
		<div
			class="grid max-h-70 w-full auto-rows-max grid-cols-1 gap-4 overflow-auto pr-1.5 sm:grid-cols-2 lg:grid-cols-3"
		>
			{#each foundedUsers as user}
				<FoundedUserItem {user} />
			{/each}
		</div>
	{:else if !hasSearched}
		<div
			class="flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-b-default bg-s-muted px-6 py-12 text-center"
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
