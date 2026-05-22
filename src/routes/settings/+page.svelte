<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Components
	import ConnectedPlatforms from '$lib/components/settings/connected-platforms/ConnectedPlatforms.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.settingsPage.title}</title>
	<meta name="description" content={$translationsStore.settingsPage.settingsPageMetaDescription} />
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.settingsPage.title} />
	<meta
		property="og:description"
		content={$translationsStore.settingsPage.settingsPageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.settingsPage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.settingsPage.settingsPageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section">
		<h1 class="mb-4.5 lg:mb-7">{$translationsStore.settingsPage.settingsPageHeading1}</h1>

		<ConnectedPlatforms />
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedSettingsParagraph1} />
{/if}
