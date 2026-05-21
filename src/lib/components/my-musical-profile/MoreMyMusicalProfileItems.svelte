<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
	import { showAddTickets } from '$lib/stores/showAddTickets.store';

	// Services
	import { updateLimitMostListenedTracks } from '$lib/services/user/updateLimitMostListenedTracks';
	import { updateLimitMostListenedArtists } from '$lib/services/user/updateLimitMostListenedArtists';

	// Props
	export let additionalItemsType: 'artists' | 'tracks';

	let loadingMoreItems = false;

	async function handleLoadMoreMusicalItems() {
		if (($userInfo?.tickets ?? 0) === 0) {
			showAddTickets.set(true);

			return;
		}

		loadingMoreItems = true;

		if (additionalItemsType === 'artists') {
			if ($userInfo?.connectedStreamings.spotify?.mostListenedArtists?.limit) {
				const updateLimitMostListenedArtistsResult = await updateLimitMostListenedArtists(
					$userInfo?.email,
					$userInfo?.connectedStreamings.spotify?.mostListenedArtists?.limit
				);

				if (updateLimitMostListenedArtistsResult?.loaded === true) {
					setTimeout(() => {
						loadingMoreItems = false;
					}, 1000);
				}
			} else {
				return;
			}
		} else if (additionalItemsType === 'tracks') {
			if ($userInfo?.connectedStreamings.spotify?.mostListenedTracks?.limit) {
				const updateLimitMostListenedTracksResult = await updateLimitMostListenedTracks(
					$userInfo?.email,
					$userInfo?.connectedStreamings.spotify?.mostListenedTracks?.limit
				);

				if (updateLimitMostListenedTracksResult?.loaded === true) {
					setTimeout(() => {
						loadingMoreItems = false;
					}, 1000);
				}
			} else {
				return;
			}
		}
	}
</script>

<button
	class="mx-auto mt-4 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-brand-primary px-6 py-3.5 text-sm font-semibold text-t-inverse shadow-lg shadow-brand-primary/25 transition-all duration-300 hover:scale-102 hover:bg-brand-primary-dark sm:w-fit"
	onclick={handleLoadMoreMusicalItems}
	disabled={loadingMoreItems}
>
	<div class="flex w-full items-center justify-center gap-3 text-center sm:flex-row sm:text-left">
		{#if !loadingMoreItems}
			<span class="text-sm leading-none font-semibold">
				{#if additionalItemsType === 'artists'}
					{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageMostListenedShowMoreFiveArtistsButton}
				{:else if additionalItemsType === 'tracks'}
					{$translationsStore.myMusicalProfilePage
						.myMusicalProfilePageMostListenedShowMoreFiveTracksButton}
				{/if}
			</span>

			<div
				class="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-brand-primary shadow-sm"
			>
				<img src={TicketIcon} alt={$translationsStore.generalTexts.ticketAltText} class="h-4 w-4" />

				<span class="text-xs leading-none font-bold"> -1 </span>
			</div>
		{:else}
			<DotsLoading dotsTheme="base-light" />
		{/if}
	</div>
</button>
