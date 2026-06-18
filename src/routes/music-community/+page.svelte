<script lang="ts">
	// Svelte
	import { page } from '$app/stores';

	// Assets
	import SearchIcon from '$lib/assets/images/icons/SearchIcon.svelte';

	// Components
	import NotLogged from '$lib/components/general/NotLogged.svelte';
	import StreamingSelector from '$lib/components/general/StreamingSelector.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<svelte:head>
	<!-- General -->
	<title>{$translationsStore.musicCommunityPage.title}</title>
	<meta
		name="description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaDescription}
	/>
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.musicCommunityPage.title} />
	<meta
		property="og:description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.musicCommunityPage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.musicCommunityPage.musicCommunityPageMetaOgAndTwitterContent}
	/>
</svelte:head>

{#if $userInfo?.connectedStreamings.spotify?.connected === true}
	<section class="base-section">
		<div class="mb-8">
			<h1 class="mb-4">
				{$translationsStore.musicCommunityPage.musicCommunityPageHeading1}
			</h1>

			<p class="max-w-4xl text-t-secondary">
				{$translationsStore.musicCommunityPage.musicCommunityParagraph1}
			</p>
		</div>

		<div
			class="max-w-4xl rounded-xl border border-input-border bg-s-default p-4"
		>
			<div class="flex flex-col gap-3 sm:flex-row">
				<input
					type="text"
					placeholder={$translationsStore.musicCommunityPage.musicCommunitySearchPlaceholder}
					class="h-12 flex-1 rounded-xl border border-input-border bg-input-bg px-4 text-sm text-t-primary outline-none transition-colors focus:border-b-focus"
				/>

				<button
					class="flex h-12 w-12 shrink-0 items-center cursor-pointer justify-center rounded-xl bg-brand-primary transition-colors hover:bg-brand-primary-dark"
				>
					<SearchIcon
						iconSvgClass="h-4.5 w-4.5 text-t-inverse"
						iconAltText={$translationsStore.musicCommunityPage.musicCommunitySearchButtonAltText}
					/>
				</button>
			</div>
		</div>
	</section>
{:else}
	<NotLogged notLoggedParagraph={$translationsStore.generalTexts.notLoggedMusicCommunityParagraph1} />
{/if}
