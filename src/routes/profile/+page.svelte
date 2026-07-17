<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Assets
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	//Components
	import KeyInformation from '$lib/components/profile/KeyInformation.svelte';
	import YourSongsOnProfile from '$lib/components/profile/YourSongsOnProfile.svelte';
	import YourArtistsOnProfile from '$lib/components/profile/YourArtistsOnProfile.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	$: selectedStreaming =
		$userInfo?.connectedStreamings.spotify?.connected === true ? 'spotify' : null;
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.profilePage.title}</title>
	<meta name="description" content={$translationsStore.profilePage.profilePageMetaDescription} />
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.profilePage.title} />
	<meta
		property="og:description"
		content={$translationsStore.profilePage.profilePageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.profilePage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.profilePage.profilePageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section">
		<div class="mx-auto flex w-full flex-col gap-10 sm:gap-12 lg:gap-14">
			<KeyInformation
				userInfo={selectedStreaming ? $userInfo.connectedStreamings.spotify : null}
				tickets={$userInfo.tickets}
			/>
		</div>

		<div class="mt-10 flex w-full flex-col gap-8 lg:gap-14">
			<YourSongsOnProfile />

			<YourArtistsOnProfile />
		</div>
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedProfileParagraph1} />
{/if}
