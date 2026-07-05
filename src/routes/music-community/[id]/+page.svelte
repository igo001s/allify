<script lang="ts">
	// Svelte
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { getPublicUser } from '$lib/services/user/getters/getPublicUser';

	let user: any;
	
	onMount(async () => {
		const userId = $page.params.id;
		
		if (!userId) {
			return;
		}

		const userReturnedById = await getPublicUser(userId);

		user = userReturnedById;
	});
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.musicCommunityPage.publicUser.title.replace('{userName}', user?.name || $page.params.id)}</title>
	<meta
		name="description"
		content={$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserMetaDescription.replace('{userName}', user?.name || $page.params.id)}
	/>
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.musicCommunityPage.publicUser.title.replace('{userName}', user?.name || $page.params.id)} />
	<meta
		property="og:description"
		content={$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserMetaOgAndTwitterContent.replace('{userName}', user?.name || $page.params.id)}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.musicCommunityPage.publicUser.title.replace('{userName}', user?.name || $page.params.id)} />
	<meta
		name="twitter:description"
		content={$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserMetaOgAndTwitterContent.replace('{userName}', user?.name || $page.params.id)}
	/>
</svelte:head>

<section class="base-section">
	Basic Structure for Music Community Page - User ID: {$page.params.id}
</section>
