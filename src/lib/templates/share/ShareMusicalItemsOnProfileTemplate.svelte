<script lang="ts">
	// Assets
	import AllifyLogoColorful from '$lib/assets/logos/AllifyLogoColorful.svelte';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let itemsType: string;
	export let musicalItems: { item: ArtistSpotify | TrackSpotify; type: string }[];

	function getMusicalItemsOnProfileTitle(itemType: string, musicalType: string): string {
		if (itemType === 'songs') {
			if (musicalType === 'mostListenedTrack') {
				return $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v1;
			} else if (musicalType === 'trackOfTheMoment') {
				return $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v2;
			} else if (musicalType === 'customTrack' && $userInfo?.tracks?.customTrack?.title) {
				return $userInfo?.tracks?.customTrack?.title;
			}
		} else if (itemType === 'artists') {
			if (musicalType === 'mostListenedArtist') {
				return $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v1;
			} else if (musicalType === 'artistOfTheMoment') {
				return $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v2;
			} else if (musicalType === 'customArtist' && $userInfo?.artists?.customArtist?.title) {
				return $userInfo?.artists?.customArtist?.title;
			}
		}

		return '';
	}
</script>

<div
	class="mx-auto h-104 w-71.5 min-[400px]:h-128 min-[400px]:w-88 min-[480px]:h-160 min-[480px]:w-110"
>
	<div
		id="share-data-modal"
		class="flex h-160 w-110 origin-top-left scale-[0.65] flex-col justify-between overflow-hidden bg-s-default px-8 py-10 text-t-primary shadow-lg min-[400px]:scale-[0.8] min-[480px]:scale-100"
	>
		<header class="flex items-center justify-between gap-2">
			<AllifyLogoColorful
				logoSvgClass="w-[26%] h-auto"
				logoAriaLabel={$translationsStore.generalTexts.logoColorfulAriaLabel}
			/>

			<span class="text-right text-xs font-semibold text-t-secondary">
				{$translationsStore.profilePage.profilePageShareModalPreviewProfile}
			</span>
		</header>

		<section class="space-y-1">
			<p class="text-[13px] font-bold text-brand-primary">
				{itemsType === 'artists'
					? $translationsStore.profilePage.profilePageShareArtistsModalPreviewParagraph1
					: $translationsStore.profilePage.profilePageShareSongsModalPreviewParagraph1}
			</p>

			<p class="text-2xl leading-tight font-bold text-t-primary">
				{itemsType === 'artists'
					? $translationsStore.profilePage.profilePageShareArtistsModalPreviewParagraph2
					: $translationsStore.profilePage.profilePageShareSongsModalPreviewParagraph2}
			</p>

			<p class="text-[13px] leading-relaxed text-t-secondary">
				{itemsType === 'artists'
					? $translationsStore.profilePage.profilePageShareArtistsModalPreviewParagraph3
					: $translationsStore.profilePage.profilePageShareSongsModalPreviewParagraph3}
			</p>
		</section>

		<ul class="flex h-fit flex-col gap-3">
			{#each musicalItems as musicalItem, i (i)}
				<li
					class="flex max-h-22 min-h-0 flex-1 items-center gap-4 rounded-lg border border-b-default p-3"
				>
					{#if musicalItem.item?.image?.url}
						<enhanced:img
							src={musicalItem.item.image.url}
							alt={musicalItem.item.name}
							class="aspect-square h-full w-auto shrink-0 rounded-lg object-cover"
							loading="eager"
							fetchpriority="high"
							decoding="sync"
						/>
					{/if}

					<div class="min-w-0 flex-1 space-y-1">
						<p class="truncate text-xs font-semibold text-brand-primary uppercase">
							{getMusicalItemsOnProfileTitle(itemsType, musicalItem.type)}
						</p>

						<p class="truncate text-sm font-semibold text-t-primary">
							{musicalItem.item.name}
						</p>
					</div>
				</li>
			{/each}
		</ul>

		<footer class="flex shrink-0 items-center justify-between gap-2 border-t border-b-default pt-6">
			<span class="text-xs text-t-secondary">
				{$translationsStore.profilePage.profilePageShareModalYourMusicYourIdentity}
			</span>

			<strong class="text-xs font-semibold text-brand-primary">allify.club</strong>
		</footer>
	</div>
</div>
