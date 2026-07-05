<script lang="ts">
	// Components
	import FavoriteUserItem from './FavoriteUserItem.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<div class="w-full rounded-xl border border-b-default bg-s-default p-5 xl:w-2/5">
	<div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h2 class="text-xl font-semibold text-t-primary">
				{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionHeading2}
			</h2>

			<p class="mt-1 text-sm text-t-secondary">
				{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionParagraph1}
			</p>
		</div>

		<span
			class="w-fit rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary"
		>
			{#if $userInfo?.favorites}
				{$userInfo.favorites.length}
			{:else}
				0
			{/if}
		</span>
	</div>

	<div class="flex h-64 max-h-64 flex-col overflow-hidden">
		{#if $userInfo?.favorites && $userInfo.favorites.length > 0}
			<div
				class="grid max-h-70 w-full auto-rows-max grid-cols-1 gap-4 overflow-auto pr-1.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2"
			>
				{#each $userInfo.favorites as favorite}
					<FavoriteUserItem {favorite} />
				{/each}
			</div>
		{:else}
			<div
				class="flex h-full w-full flex-col items-center justify-center rounded-xl border border-dashed border-b-default bg-s-muted px-6 text-center"
			>
				<p class="font-medium text-t-primary">
					{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionEmptyParagraph1}
				</p>

				<p class="mt-2 text-sm text-t-secondary">
					{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionEmptyParagraph2}
				</p>
			</div>
		{/if}
	</div>
</div>
