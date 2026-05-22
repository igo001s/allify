<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Components
	import MostListenedArtistsItems from '$lib/components/my-musical-profile/most-listened-artists/MostListenedArtistsItems.svelte';
	import MostListenedTracksItems from '$lib/components/my-musical-profile/most-listened-tracks/MostListenedTracksItems.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';
	import StreamingSelector from '$lib/components/general/StreamingSelector.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	const itemsType: Array<'artists' | 'tracks'> = ['artists', 'tracks'];
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.myMusicalProfilePage.title}</title>
	<meta
		name="description"
		content={$translationsStore.myMusicalProfilePage.myMusicalProfilePageMetaDescription}
	/>
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.myMusicalProfilePage.title} />
	<meta
		property="og:description"
		content={$translationsStore.myMusicalProfilePage.myMusicalProfilePageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.myMusicalProfilePage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.myMusicalProfilePage.myMusicalProfilePageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section">
		<div class="mb-4 flex flex-col items-center justify-between lg:mb-12 lg:flex-row">
			<h1 class="mb-6 lg:mb-0">
				{$translationsStore.myMusicalProfilePage.myMusicalProfilePageHeading1}
			</h1>

			<div class="w-fit">
				<StreamingSelector />
			</div>
		</div>

		<div class="space-y-20 lg:space-y-30">
			{#each itemsType as type}
				{#if type === 'artists'}
					<MostListenedArtistsItems />
				{:else if type === 'tracks'}
					<MostListenedTracksItems />
				{/if}
			{/each}
		</div>
	</section>
{:else}
	<NotLogged
		notLoggedParagraph={$translationsStore.generalTexts.notLoggedMyMusicProfileParagraph1}
	/>
{/if}
