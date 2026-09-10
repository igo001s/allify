<script lang="ts">
	// Assets
	import EditArtistIcon from '$lib/assets/images/icons/EditArtistIcon.svelte';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';

	// Components
	import Popularity from '$lib/components/general/Popularity.svelte';
	import ExternalLink from '$lib/components/general/ExternalLink.svelte';
	import Followers from '$lib/components/general/Followers.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let handleEditButtonClick: (() => void) | undefined = undefined;
	export let profileItem: { item: ArtistSpotify | TrackSpotify; type: string };
	export let heading3: string;
	export let isUppercase: boolean;
	export let showEditIcon: boolean = false;
	export let showEditIconAriaLabel: string | undefined = undefined;
	export let showEditIconAltText: string | undefined = undefined;
</script>

<div class="flex w-full flex-col gap-4 xl:w-1/3">
	<h3 class={`heading-3 ${isUppercase ? 'uppercase' : ''}`}>
		{heading3}
	</h3>

	<div
		class="relative flex flex-col gap-4 rounded-xl border border-b-default p-4 shadow-xl sm:gap-6 sm:p-5 md:max-h-56 md:min-h-56 md:flex-row lg:p-6"
	>
		{#if showEditIcon}
			<button
				class="absolute top-3 right-3 cursor-pointer text-t-primary hover:scale-105 hover:text-brand-primary sm:top-5 sm:right-5"
				aria-label={showEditIconAriaLabel}
				on:click={handleEditButtonClick}
			>
				<EditArtistIcon iconSvgClass="h-5 w-5 sm:h-6 sm:w-6" iconAltText={showEditIconAltText} />
			</button>
		{/if}

		{#if profileItem.item.image?.url}
			<enhanced:img
				src={profileItem.item.image?.url}
				alt={profileItem.item.name}
				class="h-24 w-24 shrink-0 self-center rounded-lg object-cover sm:h-32 sm:w-32 md:h-36 md:w-36 md:self-start lg:h-44 lg:w-44"
				loading="lazy"
				fetchpriority="low"
			/>
		{/if}

		<div class="flex min-w-0 flex-1 flex-col justify-between">
			<div class="space-y-1.5">
				{#if profileItem.item.name}
					<h4 class="heading-4">
						{profileItem.item.name}
					</h4>
				{/if}

				{#if 'followers' in profileItem.item && 'genres' in profileItem.item}
					<Followers
						quantityFollowers={profileItem.item.followers}
						classFollowers="text-xs text-t-secondary"
					/>

					<div class="flex flex-wrap gap-1.5 pt-1 sm:gap-2">
						{#each profileItem.item.genres.slice(0, 3) as genre}
							<span
								class="rounded-full border border-brand-primary/15 bg-brand-primary/8 px-2.5 py-1 text-[9px] font-medium text-brand-primary sm:px-3"
							>
								{genre}
							</span>
						{/each}

						{#if profileItem.item.genres.length > 3}
							<span
								class="rounded-full border border-brand-primary/15 bg-brand-primary/8 px-2.5 py-1 text-[9px] font-medium text-brand-primary sm:px-3"
							>
								+{profileItem.item.genres.length - 3}
							</span>
						{/if}
					</div>
				{:else if 'albumName' in profileItem.item && 'artists' in profileItem.item}
					<p class="truncate text-xs text-t-secondary">
						{profileItem.item.albumName}
					</p>

					<p class="truncate text-xs text-t-secondary/70">
						{profileItem.item.artists.join(', ')}
					</p>
				{/if}
			</div>

			<div class="mt-4 flex flex-col gap-3 sm:mt-6 sm:gap-4">
				<Popularity item={profileItem.item} />

				{#if profileItem.item}
					<ExternalLink
						externalLink={profileItem.item.externalLink}
						externalLinkText={$translationsStore.generalTexts.seeArtistOnSpotify}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>
