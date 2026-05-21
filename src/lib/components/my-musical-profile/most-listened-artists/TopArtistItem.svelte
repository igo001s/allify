<script lang="ts">
	// Assets
	import CrownIcon from '$lib/assets/images/icons/CrownIcon.svelte';

	// Components
	import ExternalLinkSpotify from '../../general/ExternalLinkSpotify.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let mostListenedArtistItem: any;
	export let index: number;
</script>

<div class="grid w-full grid-cols-1 gap-8 sm:grid-cols-[auto_1fr_auto]">
	<div class="relative mx-auto shrink-0 sm:mx-0">
		<CrownIcon
			iconSvgClass="absolute -top-3 -left-3 h-8 w-8 -rotate-32 text-yellow-400 sm:h-9 sm:w-9 lg:-top-5 lg:h-10 lg:w-10"
			iconAltText="Crown Icon"
		/>

		<img
			src={mostListenedArtistItem.images[0]?.url}
			alt={mostListenedArtistItem.name}
			class="h-40 w-40 rounded-xl object-cover shadow-lg sm:h-44 sm:w-44 lg:h-60 lg:w-60"
			loading="lazy"
		/>
	</div>

	<div class="flex flex-col gap-6">
		<div class="space-y-2">
			<p class="text-sm font-medium text-t-secondary sm:text-base 2xl:text-lg">
				#{index + 1}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtists}
			</p>

			{#if mostListenedArtistItem.name}
				<p class="text-3xl font-semibold text-t-primary sm:text-4xl 2xl:text-5xl">
					{mostListenedArtistItem.name}
				</p>
			{/if}

			{#if mostListenedArtistItem.followers}
				<p class="text-sm text-t-secondary sm:text-base">
					{mostListenedArtistItem.followers.toLocaleString()}
					{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtistsFollowers}
				</p>
			{/if}
		</div>

		{#if mostListenedArtistItem.genres}
			<div class="flex flex-wrap gap-2">
				{#each mostListenedArtistItem.genres as genre}
					<span
						class="rounded-xl bg-brand-primary px-3 py-1 text-xs font-medium text-t-inverse sm:text-sm"
					>
						{genre}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="flex w-full flex-col gap-4 sm:w-70 sm:items-start">
		<Popularity item={mostListenedArtistItem} />

		<ExternalLinkSpotify
			additionalClass="w-full mt-2"
			streamingPlatform="spotify"
			externalLink={mostListenedArtistItem.artistLink}
			externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
		/>
	</div>
</div>
