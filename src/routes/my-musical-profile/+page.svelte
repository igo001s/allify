<script lang="ts">
	// App
	import { page } from '$app/stores';

	// Components
	import MostListenedItems from '$lib/components/my-musical-profile/MostListenedItems.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';
	import StreamingSelector from '$lib/components/general/StreamingSelector.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';

	const itemsType: Array<'artists' | 'tracks'> = ['artists', 'tracks'];
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${getJsonLdByPage(
		'myMusicalProfilePage',
		$translationsStore.locale,
		$translationsStore.myMusicalProfilePage.title,
		$translationsStore.configuration.allifyDescription,
		$userInfo?.connectedStreamings.spotify
			? $translationsStore.myMusicalProfilePage.myMusicalProfilePageMetaDescription
			: $translationsStore.myMusicalProfilePage.myMusicalProfilePageWithoutLoginMetaDescription
	)}</script>`}
	<!-- General -->
	<title>{$translationsStore.myMusicalProfilePage.title}</title>
	<meta
		name="description"
		content={$userInfo?.connectedStreamings.spotify
			? $translationsStore.myMusicalProfilePage.myMusicalProfilePageMetaDescription
			: $translationsStore.myMusicalProfilePage.myMusicalProfilePageWithoutLoginMetaDescription}
	/>
	<meta
		name="keywords"
		content={$translationsStore.myMusicalProfilePage.myMusicalProfilePageMetaKeywords}
	/>
	<link rel="canonical" href={`https://allify.club${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.myMusicalProfilePage.title} />
	<meta
		property="og:description"
		content={$translationsStore.myMusicalProfilePage.myMusicalProfilePageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.myMusicalProfilePage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.myMusicalProfilePage.myMusicalProfilePageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify}
	<section class="space-y-14 lg:space-y-20">
		<div class="flex flex-col justify-between gap-8 lg:flex-row lg:items-center lg:gap-0">
			<h1 class="heading-1">
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageHeading1}
			</h1>

			<div class="mx-auto w-xs lg:mx-0">
				<StreamingSelector />
			</div>
		</div>

		<div class="space-y-20 lg:space-y-32">
			{#each itemsType as type}
				{#if type === 'artists'}
					<MostListenedItems
						items={$userInfo?.connectedStreamings.spotify?.mostListenedArtists
							?.mostListenedArtistsItems ?? []}
						sessionType="artists"
					/>
				{:else if type === 'tracks'}
					<MostListenedItems
						items={$userInfo?.connectedStreamings.spotify?.mostListenedTracks
							?.mostListenedTracksItems ?? []}
						sessionType="tracks"
					/>
				{/if}
			{/each}
		</div>
	</section>
{:else}
	<NotLogged
		notLoggedParagraph={$translationsStore.generalTexts.notLoggedMyMusicProfileParagraph1}
	/>
{/if}
