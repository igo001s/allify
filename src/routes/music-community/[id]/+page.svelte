<script lang="ts">
	// App
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Svelte
	import { onMount } from 'svelte';

	// Assets
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';
	import ArrowIcon from '$lib/assets/images/icons/ArrowIcon.svelte';

	// Components
	import PublicUserKeyInformation from '$lib/components/music-community/public-user/PublicUserKeyInformation.svelte';
	import NotLogged from '$lib/components/general/NotLogged.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Services
	import { getPublicUser } from '$lib/services/user/getters/getPublicUser';

	// Types
	import type { PublicUserInfo } from '$lib/types/UserInfo.type';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';

	let showAddCommentModal: boolean = false;

	let loadingUser: boolean = true;

	$: user = null as PublicUserInfo | null;

	$: selectedStreaming = user?.primaryStreaming === 'spotify' ? 'spotify' : null;

	onMount(async () => {
		try {
			const userId = $page.params.id;

			if (!userId) {
				return;
			}

			const userReturnedById = await getPublicUser(userId);

			user = userReturnedById;
		} catch {
			user = null;

			loadingUser = false;
		} finally {
			loadingUser = false;
		}
	});
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${getJsonLdByPage(
		'musicCommunityPageUser',
		$translationsStore.locale,
		$translationsStore.musicCommunityPage.title,
		$translationsStore.musicCommunityPage.musicCommunityPageMetaDescription,
		$page.params.id
	)}</script>`}
	<!-- General -->
	<title
		>{loadingUser
			? $translationsStore.musicCommunityPage.musicCommunityPageLoadingUserTitle
			: user
				? $translationsStore.musicCommunityPage.publicUser.title.replace('{userName}', user?.name)
				: $translationsStore.musicCommunityPage.noUserFound.title}</title
	>
	<meta
		name="description"
		content={loadingUser
			? $translationsStore.musicCommunityPage.musicCommunityPageLoadingUserMetaDescription
			: user
				? $translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserMetaDescription.replace(
						'{userName}',
						user?.name
					)
				: $translationsStore.musicCommunityPage.noUserFound
						.musicCommunityPageNoUserFoundMetaDescription}
	/>
	<link rel="canonical" href={`https://allify.club${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta
		property="og:title"
		content={loadingUser
			? $translationsStore.musicCommunityPage.musicCommunityPageLoadingUserTitle
			: user
				? $translationsStore.musicCommunityPage.publicUser.title.replace('{userName}', user?.name)
				: $translationsStore.musicCommunityPage.noUserFound.title}
	/>
	<meta
		property="og:description"
		content={loadingUser
			? $translationsStore.musicCommunityPage.musicCommunityPageLoadingUserMetaOgAndTwitterContent
			: user
				? $translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserMetaOgAndTwitterContent.replace(
						'{userName}',
						user?.name
					)
				: $translationsStore.musicCommunityPage.noUserFound
						.musicCommunityPageNoUserFoundMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta
		name="twitter:title"
		content={loadingUser
			? $translationsStore.musicCommunityPage.musicCommunityPageLoadingUserTitle
			: user
				? $translationsStore.musicCommunityPage.publicUser.title.replace('{userName}', user?.name)
				: $translationsStore.musicCommunityPage.noUserFound.title}
	/>
	<meta
		name="twitter:description"
		content={loadingUser
			? $translationsStore.musicCommunityPage.musicCommunityPageLoadingUserMetaOgAndTwitterContent
			: user
				? $translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserMetaOgAndTwitterContent.replace(
						'{userName}',
						user?.name
					)
				: $translationsStore.musicCommunityPage.noUserFound
						.musicCommunityPageNoUserFoundMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if loadingUser}
	<section class="base-section">
		<div class="flex h-64 items-center justify-center">
			<DotsLoading />
		</div>
	</section>
{:else if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section">
		{#if user}
			<div class="mx-auto flex w-full flex-col gap-12">
				<div class="flex flex-col gap-8">
					<a
						href="/music-community"
						class="flex items-center text-sm font-medium text-brand-primary transition-all"
					>
						<ArrowIcon iconSvgClass="rotate-90 mr-1 inline h-8 w-8" iconAltText="Arrow icon" />

						{$translationsStore.musicCommunityPage.publicUser
							.musicCommunityPagePublicUserBackToMusicCommunityButton}
					</a>

					{#if user._id === $userInfo?._id}
						<p class="text-sm text-t-secondary">
							<span class="font-medium text-t-primary"
								>{$translationsStore.musicCommunityPage.publicUser
									.musicCommunityPagePublicUserYourPublicProfile}</span
							>
							<span class="mx-1">·</span>
							{$translationsStore.musicCommunityPage.publicUser
								.musicCommunityPagePublicUserYourCanEditItOnProfilePage}
							<a href="/profile" class="font-medium text-brand-primary"
								>{$translationsStore.musicCommunityPage.publicUser
									.musicCommunityPagePublicUserProfilePageLink}</a
							>.
						</p>
					{/if}
				</div>

				<PublicUserKeyInformation
					publicUser={selectedStreaming === 'spotify' ? user.connectedStreamings.spotify : null}
					createdAt={user.createdAt}
					{showAddCommentModal}
				/>
			</div>
		{:else}
			<div
				class="bg-surface-secondary flex flex-col items-center justify-center gap-12 rounded-lg px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20"
			>
				<div class="max-w-xl">
					<h1 class="mb-3 text-2xl font-medium text-t-primary sm:text-3xl lg:text-4xl">
						{$translationsStore.musicCommunityPage.noUserFound
							.musicCommunityPageNoUserFoundHeading1}
					</h1>

					<p class="mt-7 text-base text-t-secondary sm:text-lg">
						{$translationsStore.musicCommunityPage.noUserFound
							.musicCommunityPageNoUserFoundParagraph1}
					</p>
				</div>

				<button
					on:click={() => goto('/music-community')}
					class="mt-4 w-60 cursor-pointer rounded-lg bg-brand-primary py-5 text-center text-xs font-medium text-t-inverse shadow-md transition-all hover:scale-102 hover:bg-brand-primary-dark sm:w-90"
				>
					{$translationsStore.musicCommunityPage.noUserFound.musicCommunityPageNoUserFoundButton}
				</button>
			</div>
		{/if}
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedProfileParagraph1} />
{/if}
