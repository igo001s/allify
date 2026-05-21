<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';
	import PlusIcon from '$lib/assets/images/icons/PlusIcon.svelte';

	// Components
	import ExternalLink from '$lib/components/general/ExternalLinkSpotify.svelte';
	import StreamingSelector from '../general/StreamingSelector.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { showAddTickets } from '$lib/stores/showAddTickets.store';

	// Props
	export let userInfo;
	export let tickets;

	let selectedStreaming: 'spotify' | 'deezer';

	function openAddTickets() {
		showAddTickets.set(true);
	}
</script>

<div
	class="flex w-full flex-col items-center justify-between gap-8
	md:flex-row lg:items-center lg:gap-0"
>
	<div
		class="flex flex-col items-center gap-6 text-center
			md:flex-row md:text-left lg:gap-12"
	>
		<div class="relative w-fit">
			{#if userInfo.image?.url}
				<img
					src={userInfo.image?.url}
					class="h-24 w-24 rounded-full border-4 border-brand-primary object-cover
						sm:h-32 sm:w-32 lg:h-36 lg:w-36"
					alt={`${$translationsStore.profilePage.profilePageImageAltText} ${userInfo.name}`}
					decoding="async"
					fetchpriority="high"
					loading="eager"
				/>
			{:else if userInfo.name}
				<div
					class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-brand-primary sm:h-32 sm:w-32 lg:h-36 lg:w-36"
					aria-label={userInfo.name}
				>
					<p
						class="flex h-18 w-18 items-center justify-center rounded-full border-2 border-brand-primary text-xl font-medium text-brand-primary lg:h-24 lg:w-24 lg:text-3xl"
					>
						{userInfo.name.slice(0, 1)}
					</p>
				</div>
			{/if}

			{#if userInfo.country}
				<span
					class="absolute right-0.5 bottom-0.5 rounded-full bg-brand-primary px-2 py-0.5 text-xs font-semibold text-white"
				>
					{userInfo.country}
				</span>
			{/if}
		</div>

		<div class="flex flex-col justify-center gap-2 text-t-primary">
			<div class="flex flex-col items-center gap-1 md:flex-row md:gap-8">
				{#if userInfo.name}
					<h1 class="mb-1.5! text-2xl font-semibold sm:text-3xl">
						{userInfo.name}
					</h1>
				{/if}

				<div
					class="flex w-fit items-center gap-3 rounded-full bg-brand-primary px-3.5 py-2.5 text-t-inverse"
				>
					<img
						src={TicketIcon}
						alt={$translationsStore.generalTexts.ticketAltText}
						class="h-6.5 w-6.5 rounded-full bg-s-page p-0.5"
					/>

					<span class="text-sm font-medium">
						{tickets ?? 0}
						{(tickets ?? 0) > 1
							? $translationsStore.generalTexts.tickets
							: $translationsStore.generalTexts.ticket}
					</span>

					<button
						class="flex cursor-pointer items-center justify-center rounded-full bg-s-default p-1.5 transition-all hover:scale-102"
						on:click={openAddTickets}
					>
						<PlusIcon
							iconSvgClass="w-2.5 h-2.5 text-brand-primary"
							iconAltText={$translationsStore.profilePage.profilePageAddTicketsAltText}
						/>
					</button>
				</div>
			</div>

			{#if userInfo.email}
				<p class="text-sm font-medium break-all lg:text-base">
					{userInfo.email}
				</p>
			{/if}

			{#if userInfo.followers}
				<p class="text-xs font-medium sm:text-sm">
					{userInfo.followers}
					{$translationsStore.profilePage.profilePageFollowers}
				</p>
			{/if}
		</div>
	</div>

	<div class="flex flex-col gap-6">
		<StreamingSelector bind:selectedStreaming />

		<ExternalLink
			streamingPlatform={selectedStreaming}
			externalLink={selectedStreaming === 'spotify' ? userInfo.profileLink : userInfo.profileLink}
			externalLinkText={selectedStreaming === 'spotify'
				? $translationsStore.profilePage.profilePageExternalLinkSpotify
				: $translationsStore.profilePage.profilePageExternalLinkDeezer}
			additionalClass="w-full sm:w-70"
		/>
	</div>
</div>
