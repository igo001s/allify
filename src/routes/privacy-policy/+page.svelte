<script lang="ts">
	// SVelte
	import { page } from '$app/stores';

	// Components
	import PrivacyPolicy from '$lib/components/legal-pages/PrivacyPolicy.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { Locale } from '$lib/types/Schema.type';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';

	$: jsonLd = getJsonLdByPage('profilePage', $translationsStore.language as Locale);
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
	<!-- General -->
	<title>{$translationsStore.legalPages.privacyPolicy.title}</title>
	<meta
		name="description"
		content={$translationsStore.legalPages.privacyPolicy.privacyPolicyMetaDescription}
	/>
	<link rel="canonical" href={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.legalPages.privacyPolicy.title} />
	<meta
		property="og:description"
		content={$translationsStore.legalPages.privacyPolicy.privacyPolicyMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.legalPages.privacyPolicy.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.legalPages.privacyPolicy.privacyPolicyMetaOgAndTwitterContent}
	/>
</svelte:head>

<PrivacyPolicy />
