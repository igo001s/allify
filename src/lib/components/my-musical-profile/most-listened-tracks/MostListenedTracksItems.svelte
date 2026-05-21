<script lang="ts">
	// Components
	import TopTrackItem from './TopTrackItem.svelte';
	import ExternalLink from '../../general/ExternalLinkSpotify.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';
	import MoreMyMusicalProfileItems from '../MoreMyMusicalProfileItems.svelte';
	import PossibleActionsMyMusicalProfile from '../PossibleActionsMyMusicalProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	$: mostListenedTracks =
		$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems;
</script>

<div class="flex flex-col gap-10 lg:gap-14">
	<div class="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
		<h2 class="text-xl font-semibold">
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracksHeading2}
		</h2>

		<PossibleActionsMyMusicalProfile
			lastSync={$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.updatedAt}
		/>
	</div>

	<div class="flex flex-col gap-10">
		{#each mostListenedTracks as track, i (track.id)}
			{#if i === 0}
				<TopTrackItem
					mostListenedTrackItem={$userInfo?.connectedStreamings.spotify?.mostListenedTracks
						?.mostListenedTrackItem}
					index={i}
				/>
			{:else}
				<div class="grid w-full grid-cols-[auto_1fr] gap-6 lg:grid-cols-[auto_1fr_auto]">
					<img
						src={track.image?.url}
						alt={track.name}
						class="h-20 w-20 rounded-xl object-cover shadow-md lg:h-42 lg:w-42"
						loading="lazy"
					/>

					<div class="flex min-w-0 flex-col gap-4">
						<div class="space-y-1.5">
							<p class="text-xs font-medium text-t-secondary">
								#{i + 1}
								{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedTracks}
							</p>

							{#if track.name}
								<p class="text-2xl leading-tight font-semibold text-t-primary">
									{track.name}
								</p>
							{/if}

							{#if track.artists}
								<p class="truncate text-xs text-t-secondary">
									{track.artists.join(', ')}
								</p>
							{/if}
						</div>

						{#if track.albumName}
							<div class="flex flex-wrap gap-2">
								<span
									class="rounded-xl bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
								>
									{track.albumName}
								</span>
							</div>
						{/if}
					</div>

					<div class="col-span-2 flex w-full flex-col gap-2 lg:col-span-1 lg:w-70 lg:items-start">
						<Popularity item={track} />

						<ExternalLink
							additionalClass="w-full mt-2"
							streamingPlatform="spotify"
							externalLink={track.trackLink}
							externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
						/>
					</div>
				</div>
			{/if}
		{/each}

		{#if ($userInfo?.connectedStreamings.spotify?.mostListenedTracks?.limit ?? 0) < 50}
			<MoreMyMusicalProfileItems additionalItemsType="tracks" />
		{/if}
	</div>
</div>
