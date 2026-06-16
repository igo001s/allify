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
	<section class="base-section px-4 py-10 md:px-6 md:py-14">
		<h1
			class="mb-4 text-center text-2xl font-semibold text-t-primary md:text-left md:text-3xl lg:mb-6"
		>
			{$translationsStore.musicCommunityPage.musicCommunityPageHeading1}
		</h1>
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedMusicCommunityParagraph1} />
{/if}
