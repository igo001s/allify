<script lang="ts">
	// Assets
	import CrownIcon from '$lib/assets/images/icons/CrownIcon.svelte';

	// Components
	import ExternalLink from '../../general/ExternalLinkSpotify.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let mostListenedTrackItem: any;
	export let index: number;
</script>

<div class="grid w-full grid-cols-1 gap-8 lg:grid-cols-[auto_1fr_auto]">
	<div class="relative mx-auto shrink-0 lg:mx-0">
		<CrownIcon
			iconSvgClass="absolute -top-3 -left-3 h-8 w-8 -rotate-32 text-yellow-400 lg:h-9 lg:w-9 lg:-top-5 lg:h-10 lg:w-10"
			iconAltText={$translationsStore.myMusicalProfilePage
				.myMusicalProfilePageMostListenedCrownIconAltText}
		/>

		<img
			src={mostListenedTrackItem.image?.url}
			alt={mostListenedTrackItem.name}
			class="h-40 w-40 rounded-xl object-cover shadow-lg lg:h-60 lg:w-60"
			loading="lazy"
		/>
	</div>

	<div class="flex flex-col gap-6">
		<div class="space-y-2">
			<p class="text-sm font-medium text-t-secondary lg:text-base 2xl:text-lg">
				#{index + 1}
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracks}
			</p>

			{#if mostListenedTrackItem.name}
				<p class="text-3xl leading-tight font-semibold text-t-primary lg:text-4xl 2xl:text-5xl">
					{mostListenedTrackItem.name}
				</p>
			{/if}

			{#if mostListenedTrackItem.artists}
				<p class="text-sm text-t-secondary lg:text-base">
					{mostListenedTrackItem.artists.join(', ')}
				</p>
			{/if}
		</div>

		{#if mostListenedTrackItem.albumName}
			<div class="flex flex-wrap gap-2">
				<span class="rounded-xl bg-brand-primary px-3 py-1 text-xs font-medium text-t-inverse">
					{mostListenedTrackItem.albumName}
				</span>
			</div>
		{/if}
	</div>

	<div class="flex w-full flex-col gap-4 lg:w-68 lg:items-start">
		<Popularity item={mostListenedTrackItem} />

		<ExternalLink
			additionalClass="w-full mt-2"
			streamingPlatform="spotify"
			externalLink={mostListenedTrackItem.trackLink}
			externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
		/>
	</div>
</div>
