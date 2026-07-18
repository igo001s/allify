<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Assets
	import SearchIcon from '$lib/assets/images/icons/SearchIcon.svelte';

	// Components
	import NotLogged from '$lib/components/general/NotLogged.svelte';
	import FavoritesSection from '$lib/components/music-community/FavoritesSection.svelte';
	import FoundedUsers from '$lib/components/music-community/FoundedUsers.svelte';

	// Services
	import { searchUsers } from '$lib/services/user/search/searchUsers';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Types
	import type { SearchUserInfo } from '$lib/types/UserInfo.type';
	import type { Locale } from '$lib/types/Schema.type';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';

	$: jsonLd = getJsonLdByPage('musicCommunityPage', $translationsStore.language as Locale);

	let searchUserInputValue: string = '';
	let loadingFoundedUsers = false;

	let foundedUsers: SearchUserInfo[] | undefined = undefined;
	let hasSearched = false;

	async function handleSearchUser() {
		if (!searchUserInputValue || searchUserInputValue.length < 2) return;

		hasSearched = true;
		loadingFoundedUsers = true;

		try {
			const data = await searchUsers(searchUserInputValue);

			foundedUsers = data;
		} catch (err) {
			foundedUsers = [];
		} finally {
			loadingFoundedUsers = false;
		}
	}
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
	<!-- General -->
	<title>{$translationsStore.musicCommunityPage.title}</title>
	<meta
		name="description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaDescription}
	/>
	<link rel="canonical" href={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.musicCommunityPage.title} />
	<meta
		property="og:description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify-sv.netlify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.musicCommunityPage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section core-page">
		<h1 class="mb-3 text-2xl font-semibold text-t-primary md:text-3xl lg:mb-5">
			{$translationsStore.musicCommunityPage.musicCommunityPageHeading1}
		</h1>

		<p class="text-sm leading-relaxed text-t-secondary md:text-base">
			{$translationsStore.musicCommunityPage.musicCommunityParagraph1}
		</p>

		<div class="mt-10 flex flex-col gap-8 xl:flex-row xl:gap-12">
			<div class="flex w-full flex-col gap-6 xl:w-3/5">
				<div class="flex items-center gap-3">
					<input
						type="text"
						minlength="2"
						maxlength="30"
						placeholder={$translationsStore.musicCommunityPage.musicCommunitySearchPlaceholder}
						bind:value={searchUserInputValue}
						class="flex-1 rounded-lg border bg-s-muted px-4 py-3 text-sm font-semibold text-t-primary transition outline-none placeholder:text-t-muted focus:border-brand-primary"
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								handleSearchUser();
							}
						}}
					/>

					<button
						class="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-brand-primary transition-colors hover:bg-brand-primary-dark"
						disabled={!searchUserInputValue || searchUserInputValue.length < 2}
						on:click={handleSearchUser}
					>
						<SearchIcon
							iconSvgClass="h-4.5 w-4.5 text-t-inverse"
							iconAltText={$translationsStore.musicCommunityPage.musicCommunitySearchButtonAltText}
						/>
					</button>
				</div>

				<FoundedUsers {searchUserInputValue} {foundedUsers} {loadingFoundedUsers} {hasSearched} />
			</div>

			<FavoritesSection />
		</div>
	</section>
{:else}
	<NotLogged
		notLoggedParagraph={$translationsStore.generalTexts.notLoggedMusicCommunityParagraph1}
	/>
{/if}
