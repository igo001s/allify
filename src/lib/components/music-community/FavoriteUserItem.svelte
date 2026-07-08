<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';
	import OutlinedStar from '$lib/assets/images/icons/OutlinedStar.svelte';
	import FilledStar from '$lib/assets/images/icons/FilledStar.svelte';

	// Components
	import ProfileWithoutPhoto from '$lib/components/general/ProfileWithoutPhoto.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// MongoDB
	import type { ObjectId } from 'mongodb';

	// Services
	import { removeFromFavorites } from '$lib/services/user/updates/removeFromFavorites';

	// Types
	import type { FavoriteUser } from '$lib/types/UserInfo.type';

	// Props
	export let favorite: FavoriteUser;

	$: userOnFavorites = $userInfo?.favorites?.some((fav) => fav._id === favorite._id) || false;

	async function handlerRemoveFromFavorites(idToRemove?: ObjectId, id?: ObjectId) {
		if (!idToRemove || !id) return;

		const data = await removeFromFavorites(idToRemove, id);

		if (!data) return;

		userInfo.update((user) => {
			if (user) {
				user.favorites = user.favorites?.filter((fav) => fav._id !== data.removedFavorite._id);
			}

			return user;
		});

		return;
	}

	function handleGoToFavoriteProfile() {
		window.location.href = `/music-community/${favorite._id}`;
	}
</script>

<article
	class="flex h-fit w-full items-center justify-between rounded-lg border border-b-default bg-s-muted transition hover:border-brand-primary"
>
	<button
		class="flex w-11/12 min-w-0 cursor-pointer items-center gap-4 py-2.5 pl-2.5"
		on:click={handleGoToFavoriteProfile}
	>
		{#if favorite.image}
			<img
				src={favorite.image.url}
				alt={`${$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionUserImageAltText} ${favorite.name}`}
				class="h-13 w-13 shrink-0 rounded-full object-cover"
			/>
		{:else}
			<ProfileWithoutPhoto userName={favorite.name} additionalClassesToSize="h-13 w-13" />
		{/if}

		<div class="mb-1 flex min-w-0 flex-col gap-1">
			<p class="truncate text-lg font-semibold text-t-primary">
				{favorite.name}
			</p>

			<div class="flex items-center gap-2.5">
				<SpotifyIcon
					iconSvgClass={`h-3.5 w-3.5 ${
						favorite.spotifyConnected ? 'text-spotify' : 'text-t-secondary'
					}`}
				/>

				<DeezerIcon
					iconSvgClass={`h-3.5 w-3.5 ${
						favorite.deezerConnected ? 'text-deezer' : 'text-t-secondary'
					}`}
				/>
			</div>
		</div>
	</button>

	<button
		class="mr-2 w-1/12 shrink-0 cursor-pointer text-brand-primary transition hover:text-brand-primary-dark"
		aria-label={$translationsStore.musicCommunityPage.musicCommunityStarIconAltText}
		on:click={() => handlerRemoveFromFavorites($userInfo?._id, favorite._id)}
	>
		{#if userOnFavorites}
			<FilledStar
				iconSvgClass="h-3.5 w-3.5 2xl:h-4 2xl:w-4"
				iconAltText={$translationsStore.musicCommunityPage.musicCommunityStarIconRemoveAltText}
			/>
		{:else}
			<OutlinedStar
				iconSvgClass="h-3.5 w-3.5 2xl:h-4 2xl:w-4"
				iconAltText={$translationsStore.musicCommunityPage.musicCommunityStarIconAltText}
			/>
		{/if}
	</button>
</article>
