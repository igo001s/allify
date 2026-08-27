<script lang="ts">
	// Components
	import Popularity from '$lib/components/general/Popularity.svelte';
	import ExternalLink from '$lib/components/general/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/Spotify.type';
    import type { PublicUserInfo } from "$lib/types/UserInfo.type";

	// Props
    export let publicUser: PublicUserInfo | null;
	export let trackItem: {
		track: TrackSpotify;
		type: string;
	};
</script>

<div class="flex w-full flex-col gap-4 xl:w-1/3">
	<h3
		class={`text-xs font-semibold tracking-[0.18em] text-t-secondary ${trackItem.type !== 'customTrack' ? 'uppercase' : ''}`}
	>
		{#if trackItem.type === 'mostListenedTrack'}
			{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserSongsOnPublicUserHeading3v1} {publicUser?.name}
		{:else if trackItem.type === 'trackOfTheMoment'}
			{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserSongsOnPublicUserHeading3v2} {publicUser?.name}
		{:else if trackItem.type === 'customTrack'}
			{publicUser?.tracks?.customTrack?.title}
		{/if}
	</h3>

	<div
		class="relative flex flex-col gap-4 rounded-xl border border-b-default p-4 shadow-xl transition-all duration-300 sm:gap-6 sm:p-5 md:max-h-56 md:min-h-56 md:flex-row lg:p-6"
	>
		{#if trackItem.track.image?.url}
			<enhanced:img
				src={trackItem.track.image.url}
				alt={trackItem.track.name}
				class="h-24 w-24 shrink-0 self-center rounded-lg object-cover sm:h-32 sm:w-32 md:h-36 md:w-36 md:self-start lg:h-44 lg:w-44"
				loading="eager"
				fetchpriority="high"
			/>
		{/if}

		<div class="flex min-w-0 flex-1 flex-col justify-between">
			<div class="space-y-1.5">
				{#if trackItem.track.name}
					<h4 class="truncate text-base leading-tight font-bold text-t-primary sm:text-[1.2rem]">
						{trackItem.track.name}
					</h4>
				{/if}

				{#if trackItem.track.albumName}
					<p class="truncate text-xs text-t-secondary">
						{trackItem.track.albumName}
					</p>
				{/if}

				{#if trackItem.track.artists?.length}
					<p class="truncate text-xs text-t-secondary/70">
						{trackItem.track.artists.join(', ')}
					</p>
				{/if}
			</div>

			<div class="mt-4 flex flex-col gap-3 sm:mt-6 sm:gap-4">
				<Popularity item={trackItem.track} />

				{#if trackItem.track.trackLink}
					<ExternalLink
						externalLink={trackItem.track.trackLink}
						externalLinkText={$translationsStore.generalTexts.seeMusicOnSpotify}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>