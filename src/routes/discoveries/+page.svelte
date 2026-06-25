<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Assets
	import AlliFullBodyWaving from '$lib/assets/images/alli/alli-full-body-waving.webp';
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';

	// Components
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Services
	import { getFreeDiscoveries } from '$lib/services/user/discoveries/getFreeDiscoveries';
	import { getPaidDiscoveries } from '$lib/services/user/discoveries/getPaidDiscoveries';
	import { showAddTickets } from '$lib/stores/showAddTickets.store';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	let loadingDiscoveries = false;

	$: mostListenedArtists = $userInfo?.discoveries.artists;
	$: mostListenedTracks = $userInfo?.discoveries.tracks;

	async function handleLoadDiscoveries() {
		if (($userInfo?.tickets ?? 0) === 0) {
			showAddTickets.set(true);
			return;
		}

		loadingDiscoveries = true;

		const userEmail = $userInfo?.email || '';
		const userTickets = $userInfo?.tickets || 0;
		const artistsForRequest =
			$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.mostListenedArtistsItems?.map(
				(artist) => artist.name
			) ?? [];
		const tracksForRequest =
			$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.mostListenedTracksItems?.map(
				(track) => `${track.name} - ${track.artists.map((artist) => artist).join(', ')}`
			) ?? [];

		if ($userInfo?.discoveries.artists.length === 0 && $userInfo?.discoveries.tracks.length === 0) {
			const freeDiscoveries = await getFreeDiscoveries(
				userEmail,
				artistsForRequest,
				tracksForRequest
			);

			if (!freeDiscoveries) {
				loadingDiscoveries = false;
				return;
			}

			const { tracks, artists, updatedAt } = freeDiscoveries;

			if (!tracks && !artists && !updatedAt) {
				loadingDiscoveries = false;
				return;
			}

			userInfo.update((user) => {
				if (!user?.email) return user;

				return {
					...user,
					discoveries: {
						artists: artists ?? user.discoveries.artists,
						tracks: tracks ?? user.discoveries.tracks,
						updatedAt: updatedAt ?? user.discoveries.updatedAt
					}
				};
			});
		} else {
			const paidDiscoveries = await getPaidDiscoveries(
				userEmail,
				userTickets,
				artistsForRequest,
				tracksForRequest
			);

			if (!paidDiscoveries) {
				loadingDiscoveries = false;
				return;
			}

			const { tracks, artists, updatedAt, tickets } = paidDiscoveries;

			if (!tracks && !artists && !updatedAt && !tickets) {
				loadingDiscoveries = false;
				return;
			}

			userInfo.update((user) => {
				if (!user?.email) return user;

				return {
					...user,
					discoveries: {
						artists: artists ?? user.discoveries.artists,
						tracks: tracks ?? user.discoveries.tracks,
						updatedAt: updatedAt ?? user.discoveries.updatedAt
					},
					tickets: tickets ?? user.tickets
				};
			});
		}

		loadingDiscoveries = false;
	}
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.discoveriesPage.title}</title>
	<meta
		name="description"
		content={$translationsStore.discoveriesPage.discoveriesPageMetaDescription}
	/>
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.discoveriesPage.title} />
	<meta
		property="og:description"
		content={$translationsStore.discoveriesPage.discoveriesPageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.discoveriesPage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.discoveriesPage.discoveriesPageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section core-page">
		<h1 class="mb-3 text-2xl font-semibold text-t-primary md:text-3xl lg:mb-5">
			{$translationsStore.discoveriesPage.discoveriesPageHeading1}
		</h1>

		<div class="flex flex-col-reverse justify-between gap-10 lg:flex-row">
			<div class="flex w-full flex-col gap-10 lg:w-3/5">
				<p class="text-sm leading-relaxed text-t-secondary md:text-base">
					{$translationsStore.discoveriesPage.discoveriesPageParagraph1}
				</p>

				<div
					class={`flex min-h-45 flex-col gap-6 rounded-xl border border-b-default bg-s-default px-6 py-4 shadow-sm sm:flex-row md:px-8 md:py-6 ${loadingDiscoveries ? 'h-30' : 'h-auto'}`}
				>
					{#if loadingDiscoveries}
						<div class="mx-auto flex h-full items-center justify-center">
							<DotsLoading dotsTheme="base" />
						</div>
					{:else if (mostListenedArtists?.length ?? 0) !== 0 && (mostListenedTracks?.length ?? 0) !== 0}
						<div class="flex-1">
							<h2 class="mb-3.5 text-lg! font-medium text-t-primary">
								{$translationsStore.discoveriesPage.discoveriesPageHeading2Artists}
							</h2>

							<ul class="space-y-3 text-xs text-t-secondary">
								{#each mostListenedArtists as artist}
									<li class="truncate">
										{artist}
									</li>
								{/each}
							</ul>
						</div>

						<div class="hidden w-px bg-b-default sm:block"></div>

						<div class="flex-1">
							<h2 class="mb-3.5 text-lg! font-medium text-t-primary">
								{$translationsStore.discoveriesPage.discoveriesPageHeading2Tracks}
							</h2>

							<ul class="space-y-3 text-xs text-t-secondary">
								{#each mostListenedTracks as track}
									<li class="truncate">
										{track}
									</li>
								{/each}
							</ul>
						</div>
					{:else}
						<div
							class={`flex w-full justify-center text-center text-sm text-t-muted ${$userInfo.discoveries.artists.length === 0 && $userInfo.discoveries.tracks.length === 0 ? 'my-auto' : ''}`}
						>
							{#if $userInfo.discoveries.artists.length === 0 && $userInfo.discoveries.tracks.length === 0}
								{$translationsStore.discoveriesPage.discoveriesPageDiscoverNow}
							{:else}
								{$translationsStore.discoveriesPage.discoveriesPageDiscoverAgain}
							{/if}
						</div>
					{/if}
				</div>

				<button
					class="mx-auto mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-brand-primary px-6 py-3.5 text-sm font-semibold text-t-inverse shadow-lg shadow-brand-primary/25 transition-all duration-300 hover:scale-102 hover:bg-brand-primary-dark sm:w-fit"
					disabled={loadingDiscoveries}
					onclick={handleLoadDiscoveries}
				>
					{#if $userInfo.discoveries.artists.length === 0 && $userInfo.discoveries.tracks.length === 0}
						<span class="text-sm leading-none font-semibold">
							{$translationsStore.discoveriesPage.discoveriesPageDiscoverNowButton}
						</span>
					{:else}
						<div
							class="flex w-full flex-row items-center justify-center gap-3 text-center sm:text-left"
						>
							<span class="text-sm leading-none font-semibold">
								{$translationsStore.discoveriesPage.discoveriesPageDiscoverAgainButton}
							</span>

							<div
								class="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-brand-primary shadow-sm"
							>
								<img
									src={TicketIcon}
									alt={$translationsStore.generalTexts.ticketAltText}
									class="h-4 w-4"
								/>

								<span class="text-xs leading-none font-bold"> -1 </span>
							</div>
						</div>
					{/if}
				</button>
			</div>

			<img
				src={AlliFullBodyWaving}
				alt={$translationsStore.discoveriesPage.alliMascotWavingAltText}
				class="mx-auto mt-5 h-auto w-40 sm:w-56 lg:mt-0 lg:w-85 xl:w-95"
				loading="eager"
				fetchpriority="high"
				decoding="sync"
				width="420"
				height="420"
			/>
		</div>
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedDiscoveriesParagraph1} />
{/if}
