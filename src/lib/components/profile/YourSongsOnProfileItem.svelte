<script lang="ts">
	// Assets
	import EditMusicIcon from '$lib/assets/images/icons/EditMusicIcon.svelte';

	// Components
	import Popularity from '$lib/components/general/Popularity.svelte';
	import ExternalLink from '../general/ExternalLink.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { TrackSpotify } from '$lib/types/SpotifyData.type';

	export let trackItem: {
		track: TrackSpotify;
		type: string;
	};
</script>

<div class="flex w-full flex-col gap-4 2xl:w-2/6">
	<h3 class="text-xs font-semibold tracking-[0.18em] text-t-secondary uppercase">
		{trackItem.type === 'mostListenedTrack'
			? $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v1
			: $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v2}
	</h3>

	<div
		class="relative flex flex-col gap-6 rounded-xl border border-b-default p-5 shadow-xl transition-all duration-300 md:flex-row lg:p-6"
	>
		{#if trackItem.type === 'trackOfTheMoment'}
			<button
				class="absolute top-5 right-5 cursor-pointer text-t-primary transition-all hover:scale-105 hover:text-brand-primary"
				aria-label={$translationsStore.profilePage
					.profilePageYourSongsOnProfileEditMusicIconAriaLabel}
			>
				<EditMusicIcon
					iconSvgClass="h-6 w-6"
					iconAltText={$translationsStore.profilePage
						.profilePageYourSongsOnProfileEditMusicIconAltText}
				/>
			</button>
		{/if}

		{#if trackItem.track.image?.url}
			<img
				src={trackItem.track.image.url}
				alt={trackItem.track.name}
				class="h-32 w-32 shrink-0 self-center rounded-lg object-cover md:h-44 md:w-44 md:self-start"
				loading="eager"
				fetchpriority="high"
			/>
		{/if}

		<div class="flex min-w-0 flex-1 flex-col justify-between">
			<div class="space-y-1.5">
				{#if trackItem.track.name}
					<h4 class="truncate text-[1.2rem] leading-tight font-bold text-t-primary">
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

			<div class="mt-6 flex flex-col gap-4">
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
