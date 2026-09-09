<script lang="ts">
	// App
	import { page } from '$app/stores';

	// Components
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${getJsonLdByPage(
		'musicArchivePage',
		'$translationsStore.locale',
		$translationsStore.musicArchivePage.title,
		$translationsStore.configuration.allifyDescription,
		$userInfo?.connectedStreamings.spotify ? $translationsStore.musicArchivePage.musicArchivePageMetaDescription : $translationsStore.musicArchivePage.musicArchivePageMetaWithoutLoginMetaDescription
	)}</script>`}
	<!-- General -->
	<title>{$translationsStore.musicArchivePage.title}</title>
	<meta
		name="description"
		content={$userInfo?.connectedStreamings.spotify ? $translationsStore.musicArchivePage.musicArchivePageMetaDescription : $translationsStore.musicArchivePage.musicArchivePageMetaWithoutLoginMetaDescription}
	/>
	<meta name="keywords" content={$translationsStore.musicArchivePage.musicArchivePageMetaKeywords} />
	<link rel="canonical" href={`https://allify.club${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.musicArchivePage.title} />
	<meta
		property="og:description"
		content={$translationsStore.musicArchivePage.musicArchivePageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.musicArchivePage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.musicArchivePage.musicArchivePageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify}
	<section>{$translationsStore.musicArchivePage.title}</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedMusicArchiveParagraph1} />
{/if}
