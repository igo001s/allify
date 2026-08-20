<script lang="ts">
	// Components
	import ExternalLink from '$lib/components/general/ExternalLink.svelte';
	import StreamingSelector from '$lib/components/general/StreamingSelector.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let publicUser;
	export let createdAt: Date;

	let selectedStreaming: 'spotify' | 'deezer';
</script>

<div
	class="flex w-full flex-col items-center justify-between gap-8
	md:flex-row lg:items-center lg:gap-0"
>
	<div
		class="flex flex-col items-center gap-6 text-center
			md:flex-row md:text-left lg:gap-12"
	>
		<div class="w-fit">
			{#if publicUser.image.url}
				<enhanced:img
					src={publicUser.image.url}
					class="h-24 w-24 rounded-full border-4 border-brand-primary object-cover
						sm:h-32 sm:w-32 lg:h-36 lg:w-36"
					alt={`${$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserImageAltText} ${publicUser.name}`}
					decoding="async"
					fetchpriority="high"
					loading="eager"
				/>
			{:else if publicUser.name}
				<div
					class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-brand-primary sm:h-32 sm:w-32 lg:h-36 lg:w-36"
					aria-label={publicUser.name}
				>
					<p
						class="flex h-18 w-18 items-center justify-center rounded-full border-2 border-brand-primary text-xl font-medium text-brand-primary lg:h-24 lg:w-24 lg:text-3xl"
					>
						{publicUser.name.slice(0, 1)}
					</p>
				</div>
			{/if}
		</div>

		<div class="flex flex-col justify-center gap-2 text-t-primary">
			<div class="mb-2 flex flex-col items-center gap-1 md:flex-row md:gap-8">
				{#if publicUser.name}
					<h1 class="mb-3 text-3xl font-semibold sm:text-4xl md:mb-0">
						{publicUser.name}
					</h1>
				{/if}
			</div>

			{#if publicUser.followers}
				<p class="text-xs font-medium sm:text-sm">
					{publicUser.followers}
					{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserFollowers}
				</p>
			{/if}

			{#if createdAt}
				<p class="text-xs text-t-secondary sm:text-sm">
					{$translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserProfileCreatedAt}
					{new Date(createdAt).toLocaleString($translationsStore.locale, {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</p>
			{/if}
		</div>
	</div>

	<div class="flex flex-col items-center gap-8 sm:gap-14 md:flex-row">
		<div class="flex flex-col gap-6">
			<StreamingSelector bind:selectedStreaming />

			<ExternalLink
				streamingPlatform={selectedStreaming}
				externalLink={selectedStreaming === 'spotify'
					? publicUser.externalLink
					: publicUser.externalLink}
				externalLinkText={selectedStreaming === 'spotify'
					? $translationsStore.musicCommunityPage.publicUser
							.musicCommunityPagePublicUserExternalLinkSpotify
					: $translationsStore.musicCommunityPage.publicUser
							.musicCommunityPagePublicUserExternalLinkDeezer}
				additionalClass="w-full sm:w-70"
			/>
		</div>
	</div>
</div>
