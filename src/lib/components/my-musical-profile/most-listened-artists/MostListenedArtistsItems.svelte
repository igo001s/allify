<script lang="ts">
	// Components
	import TopArtistItem from './TopArtistItem.svelte';
	import ExternalLinkSpotify from '../../general/ExternalLinkSpotify.svelte';
	import Popularity from '$lib/components/general/Popularity.svelte';
	import MoreMyMusicalProfileItems from '../MoreMyMusicalProfileItems.svelte';
	import PossibleActionsMyMusicalProfile from '../PossibleActionsMyMusicalProfile.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	$: mostListenedArtists =
		$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems;
</script>

<div class="flex flex-col gap-10 lg:gap-14">
	<div class="mb-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
		<h2 class="text-xl font-semibold">
			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtistsHeading2}
		</h2>

		<PossibleActionsMyMusicalProfile
			lastSync={$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.updatedAt}
		/>
	</div>

	<div class="flex flex-col gap-16">
		{#each mostListenedArtists as artist, i (artist.id)}
			{#if i === 0}
				<TopArtistItem
					mostListenedArtistItem={$userInfo?.connectedStreamings.spotify?.mostListenedArtists
						?.mostListenedArtistItem}
					index={i}
				/>
			{:else}
				<div class="grid w-full grid-cols-[auto_1fr] gap-6 lg:grid-cols-[auto_1fr_auto]">
					<img
						src={artist.image?.url}
						alt={artist.name}
						class="h-20 w-20 rounded-lg object-cover shadow-md lg:h-42 lg:w-42"
						loading="lazy"
					/>

					<div class="flex min-w-0 flex-col gap-5">
						<div class="space-y-1.5">
							<p class="text-xs font-medium text-t-secondary">
								#{i + 1}
								{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedArtists}
							</p>

							{#if artist.name}
								<p class="text-2xl leading-tight font-semibold text-t-primary">
									{artist.name}
								</p>
							{/if}

							{#if artist.followers}
								<p class="text-xs text-t-secondary">
									{artist.followers.toLocaleString()}
									{$translationsStore.myMusicalProfilePage
										.myMusicalProfilePageMostListenedArtistsFollowers}
								</p>
							{/if}
						</div>

						{#if artist.genres}
							<div class="flex flex-wrap gap-2">
								{#each artist.genres.slice(0, 2) as genre}
									<span
										class="rounded-lg bg-brand-primary px-3 py-1 text-[10px] font-medium text-t-inverse"
									>
										{genre}
									</span>
								{/each}
							</div>
						{/if}
					</div>

					<div class="col-span-2 flex w-full flex-col gap-2 lg:col-span-1 lg:w-70 lg:items-start">
						<Popularity item={artist} />

						<ExternalLinkSpotify
							additionalClass="w-full mt-2"
							streamingPlatform="spotify"
							externalLink={artist.artistLink}
							externalLinkText={$translationsStore.generalTexts.seeOnSpotify}
						/>
					</div>
				</div>
			{/if}
		{/each}

		{#if ($userInfo?.connectedStreamings.spotify?.mostListenedArtists?.artistsLimit ?? 0) < 50}
			<MoreMyMusicalProfileItems additionalItemsType="artists" />
		{/if}
	</div>
</div>
