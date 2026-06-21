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
		<h1
			class="text-2xl font-semibold text-t-primary mb-2 md:text-3xl lg:mb-4"
		>
			{$translationsStore.musicCommunityPage.musicCommunityPageHeading1}
		</h1>

		<p class="text-sm leading-relaxed text-t-secondary md:text-base">
			{$translationsStore.musicCommunityPage.musicCommunityParagraph1}
		</p>

		<div class="flex items-center gap-3 mt-2">
			<input
				type="text"
				placeholder={$translationsStore.musicCommunityPage.musicCommunitySearchPlaceholder}
				class="flex-1 rounded-xl border bg-s-muted px-4 py-3 text-sm font-semibold text-t-primary transition outline-none placeholder:text-t-muted focus:border-brand-primary"
			/>

			<button
				class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-brand-primary transition-colors hover:bg-brand-primary-dark"
			>
				<SearchIcon
					iconSvgClass="h-4.5 w-4.5 text-t-inverse"
					iconAltText={$translationsStore.musicCommunityPage.musicCommunitySearchButtonAltText}
				/>
			</button>
		</div>
	</section>
{:else}
	<NotLogged
		notLoggedParagraph={$translationsStore.generalTexts.notLoggedMusicCommunityParagraph1}
	/>
{/if}
