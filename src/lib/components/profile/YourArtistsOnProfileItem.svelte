<script lang="ts">
	// Components
	import Popularity from '$lib/components/general/Popularity.svelte';
	import ExternalLink from '../general/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

	// Props
	export let artistItem: {
		artist: ArtistSpotify;
		type: string;
	};
</script>

<div class="flex w-2/6 flex-col gap-4">
	<h3 class="text-xs font-semibold tracking-[0.18em] text-t-secondary uppercase">
		{artistItem.type === 'mostListenedArtist'
			? $translationsStore.profilePage.profilePageYourArtistsOnProfileHeading3v1
			: $translationsStore.profilePage.profilePageYourArtistsOnProfileHeading3v2}
	</h3>

	<div
		class="flex w-full flex-col gap-6 rounded-xl border border-b-default p-5 shadow-xl transition-all duration-300 md:flex-row lg:p-6"
	>
		{#if artistItem.artist.image?.url}
			<img
				src={artistItem.artist.image.url}
				alt={artistItem.artist.name}
				class="h-40 w-40 shrink-0 self-center rounded-lg object-cover md:h-44 md:w-44 md:self-start"
				loading="lazy"
				fetchpriority="low"
			/>
		{/if}

		<div class="flex h-full min-w-0 flex-1 flex-col justify-between">
			<div class="space-y-2">
				{#if artistItem.artist.name}
					<h4 class="truncate text-[1.2rem] leading-tight font-bold text-t-primary">
						{artistItem.artist.name}
					</h4>
				{/if}

				{#if artistItem.artist.followers}
					<p class="text-xs text-t-secondary">
						{artistItem.artist.followers.toLocaleString()}
						{$translationsStore.profilePage.profilePageYourArtistsOnProfileFollowers}
					</p>
				{/if}

				{#if artistItem.artist.genres?.length}
					<div class="flex flex-wrap gap-2">
						{#each artistItem.artist.genres.slice(0, 3) as genre}
							<span
								class="rounded-full border border-brand-primary/15 bg-brand-primary/8 px-3 py-1 text-[10px] font-medium text-brand-primary"
							>
								{genre}
							</span>
						{/each}

						{#if artistItem.artist.genres?.length > 3}
							<span
								class="rounded-full border border-brand-primary/15 bg-brand-primary/8 px-3 py-1 text-[10px] font-medium text-brand-primary"
							>
								+{artistItem.artist.genres?.length - 3}
							</span>
						{/if}
					</div>
				{/if}
			</div>

			<div class="flex flex-col gap-4">
				<Popularity item={artistItem.artist} />

				{#if artistItem.artist.artistLink}
					<ExternalLink
						externalLink={artistItem.artist.artistLink}
						externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>
