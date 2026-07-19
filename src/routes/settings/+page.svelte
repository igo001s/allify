<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Components
	import ConnectedPlatforms from '$lib/components/settings/ConnectedPlatforms.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';
	import ChangeVisibility from '$lib/components/settings/ChangeVisibility.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { Locale } from '$lib/types/Schema.type';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';

	$: jsonLd = getJsonLdByPage('settingsPage', $translationsStore.language as Locale);
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
	<!-- General -->
	<title>{$translationsStore.settingsPage.title}</title>
	<meta name="description" content={$translationsStore.settingsPage.settingsPageMetaDescription} />
	<link rel="canonical" href={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.settingsPage.title} />
	<meta
		property="og:description"
		content={$translationsStore.settingsPage.settingsPageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.settingsPage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.settingsPage.settingsPageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section settings-page">
		<h1 class="mb-10">{$translationsStore.settingsPage.settingsPageHeading1}</h1>

		<div class="flex flex-col items-start gap-14">
			<ConnectedPlatforms />

			<ChangeVisibility />
		</div>
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedSettingsParagraph1} />
{/if}
