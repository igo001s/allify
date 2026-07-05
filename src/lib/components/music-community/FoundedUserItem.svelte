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
	import { toastStore } from '$lib/stores/toast.store';

	// MongoDB
	import type { ObjectId } from 'mongodb';

	// Services
	import { addToFavorites } from '$lib/services/user/updates/addToFavorites';
	import { removeFromFavorites } from '$lib/services/user/updates/removeFromFavorites';

	// Types
	import type { SearchUserInfo } from '$lib/types/UserInfo.type';

	// Props
	export let user: SearchUserInfo;

	$: userOnFavorites = $userInfo?.favorites?.some((favorite) => favorite._id === user._id) || false;

	async function handleSaveFavorites(
		idToSave: ObjectId,
		id: ObjectId,
		name?: string,
		image?: { url: string; height: number | null; width: number | null },
		spotifyConnected = false,
		deezerConnected = false
	) {
		if (!idToSave || !id || !name || !image) return false;

		if (idToSave === id) {
			toastStore.set({
				showToast: true,
				toastType: 'error',
				toastMessage:
					$translationsStore.musicCommunityPage.musicCommunityToastErrorAddToFavoritesMessage
			});

			return false;
		}

		const data = await addToFavorites(idToSave, id, name, image, spotifyConnected, deezerConnected);

		if (!data) return false;

		userInfo.update((user) => {
			if (user) {
				if (user.favorites) {
					user.favorites?.push({
						_id: id,
						name,
						image,
						spotifyConnected,
						deezerConnected
					});
				} else {
					user.favorites = [
						{
							_id: id,
							name,
							image,
							spotifyConnected,
							deezerConnected
						}
					];
				}
			} 
			
			return user;
		});

		return true;
	}

	async function handleRemoveFromFavorites(idToRemove: ObjectId, id: ObjectId) {
		if (!idToRemove || !id) return false;

		const data = await removeFromFavorites(idToRemove, id);

		if (!data) return false;

		userInfo.update((user) => {
			if (user) {
				user.favorites = user.favorites?.filter(
					(favorite) => favorite._id !== data.removedFavorite._id
				);
			}

			return user;
		});

		return true;
	}

	async function handleToggleFavorites(
		idToToggle?: ObjectId,
		id?: ObjectId,
		name?: string,
		image?: { url: string; height: number | null; width: number | null },
		spotifyConnected = false,
		deezerConnected = false
	) {
		if (!idToToggle || !id || !name || !image) return;

		const alreadyExists = $userInfo?.favorites?.some((favorite) => favorite._id === id) ?? false;

		if (alreadyExists) {
			await handleRemoveFromFavorites(idToToggle, id);
		} else {
			await handleSaveFavorites(idToToggle, id, name, image, spotifyConnected, deezerConnected);
		}
	}

	function handleGoToUserProfile() {
		window.location.href = `/music-community/${user._id}`;
	}
</script>

<article
	class="flex h-fit w-full items-center justify-between rounded-xl border border-b-default bg-s-muted transition hover:border-brand-primary"
>
	<button
		class="flex w-11/12 min-w-0 cursor-pointer items-center gap-4 py-2.5 pl-2.5"
		on:click={handleGoToUserProfile}
	>
		{#if user.image}
			<img
				src={user.image.url}
				alt={`${$translationsStore.musicCommunityPage.musicCommunityFavoritesSectionUserImageAltText} ${user.name}`}
				class="h-13 w-13 shrink-0 rounded-full object-cover"
			/>
		{:else}
			<ProfileWithoutPhoto userName={user.name} additionalClassesToSize="h-13 w-13" />
		{/if}

		<div class="mb-1 flex min-w-0 flex-col gap-1">
			<p class="truncate text-lg font-semibold text-t-primary">
				{user.name}
			</p>

			<div class="flex items-center gap-2.5">
				<SpotifyIcon
					iconSvgClass={`h-3.5 w-3.5 ${
						user.spotifyConnected ? 'text-spotify' : 'text-t-secondary'
					}`}
				/>

				<DeezerIcon
					iconSvgClass={`h-3.5 w-3.5 ${user.deezerConnected ? 'text-deezer' : 'text-t-secondary'}`}
				/>
			</div>
		</div>
	</button>

	<button
		class="mr-2 w-1/12 shrink-0 cursor-pointer text-brand-primary transition hover:text-brand-primary-dark"
		aria-label={$translationsStore.musicCommunityPage.musicCommunityStarIconAltText}
		on:click={() =>
			handleToggleFavorites(
				$userInfo?._id,
				user._id,
				user.name,
				user.image,
				user.spotifyConnected,
				user.deezerConnected
			)}
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
