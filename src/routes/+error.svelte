<script lang="ts">
	// App
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	const status = $page.status || 500;

	$: title =
		status === 404
			? $translationsStore.errorPage.errorPage404Heading1
			: $translationsStore.errorPage.errorPageOtherErrorsHeading1;

	$: description =
		status === 404
			? $translationsStore.errorPage.errorPage404Paragraph1
			: $translationsStore.errorPage.errorPageOtherErrorsParagraph1;
</script>

<svelte:head>
	<!-- General -->
	<title>
		{status === 404
			? $translationsStore.errorPage.title404
			: $translationsStore.errorPage.titleOtherErrors}
	</title>
	<meta
		name="description"
		content={status === 404
			? $translationsStore.errorPage.errorPage404MetaDescription
			: $translationsStore.errorPage.errorPageOtherErrorsMetaDescription}
	/>
	<link rel="canonical" href={`https://allify.club${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta
		property="og:title"
		content={status === 404
			? $translationsStore.errorPage.title404
			: $translationsStore.errorPage.titleOtherErrors}
	/>
	<meta
		property="og:description"
		content={status === 404
			? $translationsStore.errorPage.errorPage404MetaOgAndTwitterContent
			: $translationsStore.errorPage.errorPageOtherErrorsMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta
		name="twitter:title"
		content={status === 404
			? $translationsStore.errorPage.title404
			: $translationsStore.errorPage.titleOtherErrors}
	/>
	<meta
		name="twitter:description"
		content={status === 404
			? $translationsStore.errorPage.errorPage404MetaOgAndTwitterContent
			: $translationsStore.errorPage.errorPageOtherErrorsMetaOgAndTwitterContent}
	/>
</svelte:head>

<div class="feedback-spacing gap-12">
	<div class="max-w-lg space-y-8">
		<h1 class="heading-1">
			{title}
		</h1>

		<p class="text-base text-t-secondary sm:text-lg">
			{description}
		</p>
	</div>

	<button on:click={() => goto('/')} class="button-cta w-full lg:w-90 lg:max-w-90">
		{$translationsStore.errorPage.errorPageButtonGoHome}
	</button>
</div>
