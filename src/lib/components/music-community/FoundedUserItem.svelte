<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';
	import OutlinedStar from '$lib/assets/images/icons/OutlinedStar.svelte';
	import FilledStar from '$lib/assets/images/icons/FilledStar.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { SearchUserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let user: SearchUserInfo;

	let mockedUserIsFavorite: boolean = true;
</script>

<article
	class="flex h-fit w-1/3 cursor-pointer items-center justify-between gap-4 rounded-xl border border-b-default bg-s-muted p-2.5 transition hover:border-brand-primary"
>
	<div class="flex items-center gap-4">
		<img
			src={user.image.url}
			alt={`${$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionUserImageAltText} ${user.name}`}
			class="h-13 w-13 rounded-full object-cover"
		/>

		<div class="mb-1 flex flex-col gap-1">
			<p class="w-fit text-lg font-semibold text-t-primary">
				{user.name}
			</p>

			<div class="flex items-center gap-2.5">
				<SpotifyIcon
					iconSvgClass={`h-3.5 w-3.5 ${user.spotifyConnected === true ? 'text-spotify' : 'text-t-secondary'}`}
				/>

				<DeezerIcon
					iconSvgClass={`h-3.5 w-3.5 ${user.deezerConnected === true ? 'text-deezer' : 'text-t-secondary'}`}
				/>
			</div>
		</div>
	</div>

	<button
		class="pr-2"
		aria-label={$translationsStore.musicCommunityPage.musicCommunityStarIconAltText}
	>
		{#if mockedUserIsFavorite}
			<FilledStar
				iconSvgClass="h-4.5 w-4.5 text-brand-primary"
				iconAltText={$translationsStore.musicCommunityPage.musicCommunityStarIconRemoveAltText}
			/>
		{:else}
			<OutlinedStar
				iconSvgClass="h-4.5 w-4.5 text-brand-primary"
				iconAltText={$translationsStore.musicCommunityPage.musicCommunityStarIconAltText}
			/>
		{/if}
	</button>
</article>
