<script lang="ts">
	// Assets
	import AllifyLogoColorful from '$lib/assets/logos/AllifyLogoColorful.svelte';

	// Types
	import type { ArtistSpotify, TrackSpotify } from '$lib/types/Spotify.type';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let itemType: string;
	export let musicalItems: { item: ArtistSpotify | TrackSpotify; type: string }[];

	function getMusicalItemsOnProfileTitle(itemType: string, musicalType: string): string {
		if (itemType === 'music') {
			if (musicalType === 'mostListenedTrack') {
				return $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v1;
			} else if (musicalType === 'trackOfTheMoment') {
				return $translationsStore.profilePage.profilePageYourSongsOnProfileHeading3v2;
			} else if (musicalType === 'customTrack' && $userInfo?.tracks?.customTrack?.title) {
				return $userInfo?.tracks?.customTrack?.title;
			}
		} else if (itemType === 'artist') {
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

<div class="share-card">
	<header class="share-header">
		<AllifyLogoColorful logoSvgClass="w-26 h-fit lg:w-32" logoTitle="" logoAriaLabel="" />

		<span class="share-label"
			>{$translationsStore.profilePage.profilePageShareModalPreviewProfile}</span
		>
	</header>

	<section class="share-intro">
		<p class="share-eyebrow">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageShareArtistModalPreviewParagraph1
				: $translationsStore.profilePage.profilePageShareSongsModalPreviewParagraph1}
		</p>

		<p class="share-title">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageShareArtistModalPreviewParagraph2
				: $translationsStore.profilePage.profilePageShareSongsModalPreviewParagraph2}
		</p>

		<p class="share-description">
			{itemType === 'artist'
				? $translationsStore.profilePage.profilePageShareArtistModalPreviewParagraph3
				: $translationsStore.profilePage.profilePageShareSongsModalPreviewParagraph3}
		</p>
	</section>

	<ul class="share-list">
		{#each musicalItems as musicalItem, i (i)}
			<li class="share-item">
				{#if musicalItem.item?.image?.url}
					<enhanced:img
						src={musicalItem.item.image.url}
						alt={musicalItem.item.name}
						class="share-cover"
						loading="eager"
						fetchpriority="high"
						decoding="sync"
					/>
				{/if}

				<div class="share-info">
					<p class="share-type">
						{getMusicalItemsOnProfileTitle(itemType, musicalItem.type)}
					</p>
					<p class="share-name">{musicalItem.item.name}</p>
				</div>
			</li>
		{/each}
	</ul>

	<footer class="share-footer">
		<span>{$translationsStore.profilePage.profilePageShareModalYourMusicYourIdentity}</span>
		<strong>allify.club</strong>
	</footer>
</div>

<style>
	.share-card {
		width: 100%;
		padding: 12px;
		background: var(--color-s-default);
		color: var(--color-t-primary);
	}

	.share-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.share-label {
		color: var(--color-t-secondary);
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.1em;
	}

	.share-intro {
		margin-top: 20px;
	}

	.share-eyebrow {
		color: var(--color-brand-primary);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.1em;
	}

	.share-title {
		margin-top: 8px;
		color: var(--color-t-primary);
		font-size: 28px;
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.01em;
	}

	.share-description {
		margin-top: 10px;
		color: var(--color-t-secondary);
		font-size: 14px;
		line-height: 1.5;
	}

	.share-list {
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin: 28px 0 0;
		padding: 0;
		list-style: none;
	}

	.share-item {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 12px;
		border: 1px solid var(--color-b-default);
		border-radius: 14px;
	}

	.share-cover {
		flex-shrink: 0;
		width: 56px;
		height: 56px;
		border-radius: 10px;
		object-fit: cover;
	}

	.share-info {
		flex: 1;
		min-width: 0;
	}

	.share-type {
		color: var(--color-brand-primary);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.share-name {
		margin-top: 2px;
		overflow: hidden;
		color: var(--color-t-primary);
		font-size: 15px;
		font-weight: 600;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.share-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-top: 32px;
		padding-top: 20px;
		border-top: 1px solid var(--color-b-default);
	}

	.share-footer span {
		color: var(--color-t-secondary);
		font-size: 12px;
	}

	.share-footer strong {
		color: var(--color-brand-primary);
		font-size: 13px;
		font-weight: 700;
	}
</style>
