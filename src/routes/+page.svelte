<script lang="ts">
	// App
	import { page } from '$app/stores';

	// Components
	import HeroSection from '$lib/components/home-page/HeroSection.svelte';
	import ConnectPlatformsSection from '$lib/components/home-page/ConnectPlatformsSection.svelte';
	import DevicesSection from '$lib/components/home-page/DevicesSection.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${getJsonLdByPage(
		'homePage',
		$translationsStore.locale,
		$translationsStore.homePage.title,
		$translationsStore.configuration.allifyDescription,
		$translationsStore.homePage.homePageMetaDescription
	)}</script>`}
	<!-- General -->
	<title>{$translationsStore.homePage.title}</title>
	<meta name="description" content={$translationsStore.homePage.homePageMetaDescription} />
	<meta name="keywords" content={$translationsStore.homePage.homePageMetaKeywords} />
	<link rel="canonical" href={`https://allify.club${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.homePage.title} />
	<meta
		property="og:description"
		content={$translationsStore.homePage.homePageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.homePage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.homePage.homePageMetaOgAndTwitterContent}
	/>
</svelte:head>

<HeroSection />

<ConnectPlatformsSection />

<DevicesSection />
