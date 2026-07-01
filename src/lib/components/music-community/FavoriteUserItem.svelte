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

	// Services
	import { addToFavorites } from '$lib/services/user/updates/addToFavorites';
	import { removeFromFavorites } from '$lib/services/user/updates/removeFromFavorites';

	// Types
	import type { FavoriteUser } from '$lib/types/UserInfo.type';

	// Props
	export let favorite: FavoriteUser;

	$: userOnFavorites =
		$userInfo?.favorites.some((fav) => fav.email === favorite.email) || false;

	async function handleToggleFavorites(
		emailToSave?: string,
		email?: string,
		name?: string,
		image?: { url: string; height: number | null; width: number | null }
	) {
		if (!emailToSave || !email || !name || !image) return;

		const alreadyExists = $userInfo?.favorites.some((fav) => fav.email === email);

		if (alreadyExists) {
			const data = await removeFromFavorites(emailToSave, email);

			if (!data) return;

			userInfo.update((user) => {
				if (user) {
					user.favorites = user.favorites.filter(
						(fav) => fav.email !== data.removedFavorite.email
					);
				}

				return user;
			});

			return;
		}

		const data = await addToFavorites(emailToSave, email, name, image);

		if (!data) return;

		userInfo.update((user) => {
			if (user) {
				user.favorites.push({ email, name, image, spotifyConnected: true, deezerConnected: false });
			}

			return user;
		});
	}
</script>

<article
	class="flex h-fit w-full cursor-pointer items-center justify-between gap-4 rounded-xl border border-b-default bg-s-muted p-2.5 transition hover:border-brand-primary sm:w-[calc(50%-0.5rem)]"
>
	<div class="flex min-w-0 items-center gap-4">
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
					iconSvgClass={`h-3.5 w-3.5 ${favorite.deezerConnected ? 'text-deezer' : 'text-t-secondary'}`}
				/>
			</div>
		</div>
	</div>

	<button
		class="mr-2 shrink-0 cursor-pointer text-brand-primary transition hover:text-brand-primary-dark"
		aria-label={$translationsStore.musicCommunityPage.musicCommunityStarIconAltText}
		on:click={() => handleToggleFavorites($userInfo?.email, favorite.email, favorite.name, favorite.image)}
	>
		{#if userOnFavorites}
			<FilledStar
				iconSvgClass="h-4 w-4"
				iconAltText={$translationsStore.musicCommunityPage.musicCommunityStarIconRemoveAltText}
			/>
		{:else}
			<OutlinedStar
				iconSvgClass="h-4 w-4"
				iconAltText={$translationsStore.musicCommunityPage.musicCommunityStarIconAltText}
			/>
		{/if}
	</button>
</article>
