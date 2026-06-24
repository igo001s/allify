<script lang="ts">
    // Stores
    import { translationsStore } from "$lib/stores/translations.store";

    // Props
	export let favorites;
</script>

<div class="rounded-xl border border-b-default bg-s-default px-6 py-4">
	<div class="mb-6 flex items-center justify-between">
		<div>
			<h2 class="text-xl font-semibold text-t-primary">{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionHeading2}</h2>

			<p class="mt-1 text-sm text-t-secondary">
				{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionParagraph1}
			</p>
		</div>

		<span
			class="rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-semibold text-brand-primary"
		>
			{#if favorites}
				{favorites.length}
			{:else}
				0
			{/if}
		</span>
	</div>

	<div class="flex flex-col gap-4">
		{#each favorites as favorite}
			<div
				class="flex items-center gap-4 rounded-xl border border-b-default bg-s-muted p-3 transition hover:border-brand-primary"
			>
				<img
					src={favorite.userImage}
					alt={`${$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionUserImageAltText} ${favorite.name}`}
					class="h-16 w-16 rounded-lg object-cover"
				/>

				<h3 class="truncate font-semibold text-t-primary">
					{favorite.name}
				</h3>
			</div>
		{:else}
			<div
				class="rounded-xl border border-dashed border-b-default bg-s-muted px-6 py-10 text-center"
			>
				<p class="font-medium text-t-primary">{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionEmptyParagraph1}</p>

				<p class="mt-2 text-sm text-t-secondary">
					{$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionEmptyParagraph2}
				</p>
			</div>
		{/each}
	</div>
</div>
