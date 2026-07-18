<script lang="ts">
	// SVelte
	import { page } from '$app/stores';

	// Components
	import TermsOfService from '$lib/components/legal-pages/TermsOfService.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { Locale } from '$lib/types/Schema.type';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';

	$: jsonLd = getJsonLdByPage('termsOfServicePage', $translationsStore.language as Locale);
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
	<!-- General -->
	<title>{$translationsStore.legalPages.termsOfService.title}</title>
	<meta
		name="description"
		content={$translationsStore.legalPages.termsOfService.termsOfServiceMetaDescription}
	/>
	<link rel="canonical" href={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.legalPages.termsOfService.title} />
	<meta
		property="og:description"
		content={$translationsStore.legalPages.termsOfService.termsOfServiceMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.legalPages.termsOfService.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.legalPages.termsOfService.termsOfServiceMetaOgAndTwitterContent}
	/>
</svelte:head>

<TermsOfService />
