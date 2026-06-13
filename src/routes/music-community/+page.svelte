<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Components
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.musicCommunityPage.title}</title>
	<meta
		name="description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaDescription}
	/>
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.musicCommunityPage.title} />
	<meta
		property="og:description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.musicCommunityPage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<h1>Music community generic heading</h1>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedMusicCommunityParagraph1} />
{/if}
