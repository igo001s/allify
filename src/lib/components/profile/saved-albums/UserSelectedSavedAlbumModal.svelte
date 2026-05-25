<script lang="ts">
	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Components
	import ExternalLink from '$lib/components/general/ExternalLinkSpotify.svelte';
	import MusicFromAlbum from './MusicFromAlbum.svelte';

	// Types
	import type { AlbumSpotify } from '$lib/types/SpotifyData.type';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let album: AlbumSpotify | undefined = undefined;
	export let showSelectedAlbumModal: boolean;

	function closeModal() {
		showSelectedAlbumModal = false;
	}
</script>

{#if showSelectedAlbumModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-4 backdrop-blur-md"
	>
		<div
			class="relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-b-default bg-s-default shadow-xl"
		>
			<button
				class="absolute top-5 right-5 z-10 cursor-pointer opacity-70 transition hover:scale-102 hover:opacity-100"
				on:click={closeModal}
				aria-label={$translationsStore.profilePage
					.profilePageUserSelectedSavedAlbumCloseButtonAriaLabel +
					' ' +
					album?.name}
			>
				<CloseIcon
					iconAltText={$translationsStore.profilePage
						.profilePageUserSelectedSavedAlbumCloseButtonAriaLabel +
						' ' +
						album?.name}
					iconSvgClass="w-5 h-5 text-brand-primary"
				/>
			</button>

			<div class="border-b border-b-default p-5 lg:p-6">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
					{#if album?.image?.url}
						<img
							src={album?.image?.url}
							alt={album?.name}
							class="h-32 w-32 shrink-0 self-center rounded-xl object-cover shadow-lg sm:self-start lg:h-52 lg:w-52"
							loading="lazy"
							decoding="async"
							fetchpriority="low"
						/>
					{/if}

					<div class="flex min-w-0 flex-1 flex-col gap-3">
						<p class="text-xs font-medium tracking-widest text-t-secondary uppercase">
							{$translationsStore.profilePage.profilePageUserSelectedSavedAlbum}
						</p>

						<div class="flex flex-col gap-1">
							{#if album?.name}
								<p class="text-xl font-bold text-t-primary sm:text-2xl">
									{album.name}
								</p>
							{/if}

							{#if album?.releaseDate}
								<p class="text-xs text-t-secondary">
									{new Date(album.releaseDate).toLocaleDateString($translationsStore.locale)}
								</p>
							{/if}
						</div>

						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2 text-xs text-t-secondary">
								{#if album?.artists?.length}
									<span
										class="w-fit rounded-xl bg-brand-primary px-3 py-1 text-[11px] font-medium text-t-inverse"
									>
										{album?.artists.join(', ')}
									</span>
								{/if}

								{#if album?.tracks.total}
									<span>•</span>
									<span>
										{album.tracks.total}
										{album.tracks.total === 1
											? $translationsStore.profilePage.profilePageUserSelectedSavedAlbumItemTracks.slice(
													0,
													-1
												)
											: $translationsStore.profilePage.profilePageUserSelectedSavedAlbumItemTracks}
									</span>
								{/if}
							</div>
						</div>

						{#if album?.albumLink}
							<ExternalLink
								externalLink={album?.albumLink}
								externalLinkText={$translationsStore.profilePage
									.profilePageUserSelectedSavedAlbumOpenOnSpotify}
								additionalClass="w-full mt-2 sm:w-70"
							/>
						{/if}
					</div>
				</div>
			</div>

			<div class="flex-1 space-y-1 overflow-y-auto p-4 lg:p-6">
				{#each album?.tracks.items as track}
					<MusicFromAlbum {track} />
				{/each}
			</div>
		</div>
	</div>
{/if}
