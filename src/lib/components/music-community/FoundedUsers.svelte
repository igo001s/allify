<script lang="ts">
	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { SearchUserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let searchUserInputValue: string;
	export let foundedUsers: SearchUserInfo[];
	export let loadingFoundedUsers: boolean;
</script>

<div class="flex h-5/6 max-h-5/6 rounded-xl border border-b-default bg-s-default px-6 py-4">
	{#if loadingFoundedUsers}
		<div class="mx-auto flex h-full items-center justify-center">
			<DotsLoading dotsTheme="base" />
		</div>
	{:else}
		{#if foundedUsers !== undefined && foundedUsers.length > 0}
			<div class="flex w-full flex-wrap gap-4">
				{#each foundedUsers as user}
					<button
						class="flex h-fit w-1/3 cursor-pointer items-center gap-4 rounded-xl border border-b-default bg-s-muted p-2.5 transition hover:border-brand-primary"
					>
						<img
							src={user.image.url}
							alt={`Foto de ${user.name}`}
							class="h-12 w-12 rounded-full object-cover"
						/>

						<div>
							<p class="w-fit font-semibold text-t-primary">
								{user.name}
							</p>

							<p class="text-sm text-t-secondary">
								{user.primaryStreaming}
							</p>
						</div>
					</button>
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
					Nenhum perfil encontrado
				</p>

				<p class="mt-2 text-sm text-t-secondary">
					Tente buscar com outro nome ou verifique se a grafia está correta.
				</p>
			</div>
		{/if}
	{/if}
</div>
