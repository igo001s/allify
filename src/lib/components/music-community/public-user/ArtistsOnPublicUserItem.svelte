<script lang="ts">
	// Components
	import Popularity from '$lib/components/general/Popularity.svelte';
	import ExternalLink from '$lib/components/general/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/Spotify.type';
	import type { PublicUserInfo } from "$lib/types/UserInfo.type";

	// Props
	export let publicUser: PublicUserInfo | null;
	export let artistItem: {
		artist: ArtistSpotify;
		type: string;
	};
</script>

<div class="flex w-full flex-col gap-4 xl:w-1/3">
	<h3
		class={`text-xs font-semibold tracking-[0.18em] text-t-secondary ${artistItem.type !== 'customArtist' ? 'uppercase' : ''}`}
	>
		{#if artistItem.type === 'mostListenedArtist'}
			{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserArtistsOnPublicUserHeading3v1} {publicUser?.name}
		{:else if artistItem.type === 'artistOfTheMoment'}
			{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserArtistsOnPublicUserHeading3v2} {publicUser?.name}
		{:else if artistItem.type === 'customArtist'}
			{publicUser?.artists?.customArtist?.title}
		{/if}
	</h3>

	<div
		class="relative flex flex-col gap-4 rounded-xl border border-b-default p-4 shadow-xl transition-all duration-300 sm:gap-6 sm:p-5 md:max-h-56 md:min-h-56 md:flex-row lg:p-6"
	>
		{#if artistItem.artist.image?.url}
			<enhanced:img
				src={artistItem.artist.image.url}
				alt={artistItem.artist.name}
				class="h-24 w-24 shrink-0 self-center rounded-lg object-cover sm:h-32 sm:w-32 md:h-36 md:w-36 md:self-start lg:h-44 lg:w-44"
				loading="lazy"
				fetchpriority="low"
			/>
		{/if}

		<div class="flex min-w-0 flex-1 flex-col justify-between">
			<div class="space-y-1.5">
				{#if artistItem.artist.name}
					<h4 class="truncate text-base leading-tight font-bold text-t-primary sm:text-[1.2rem]">
						{artistItem.artist.name}
					</h4>
				{/if}

				{#if artistItem.artist.followers}
					<p class="truncate text-xs text-t-secondary">
						{artistItem.artist.followers.toLocaleString()}
						{$translationsStore.profilePage.profilePageYourArtistsOnProfileFollowers}
					</p>
				{/if}

				{#if artistItem.artist.genres?.length}
					<div class="flex flex-wrap gap-1.5 pt-1 sm:gap-2">
						{#each artistItem.artist.genres.slice(0, 3) as genre}
							<span
								class="rounded-full border border-brand-primary/15 bg-brand-primary/8 px-2.5 py-1 text-[9px] font-medium text-brand-primary sm:px-3"
							>
								{genre}
							</span>
						{/each}

						{#if artistItem.artist.genres.length > 3}
							<span
								class="rounded-full border border-brand-primary/15 bg-brand-primary/8 px-2.5 py-1 text-[9px] font-medium text-brand-primary sm:px-3"
							>
								+{artistItem.artist.genres.length - 3}
							</span>
						{/if}
					</div>
				{/if}
			</div>

			<div class="mt-4 flex flex-col gap-3 sm:mt-6 sm:gap-4">
				<Popularity item={artistItem.artist} />

				{#if artistItem.artist.artistLink}
					<ExternalLink
						externalLink={artistItem.artist.artistLink}
						externalLinkText={$translationsStore.generalTexts.seeArtistOnSpotify}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>