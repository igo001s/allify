<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
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
	<link rel="canonical" href={`https://allify.app${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.app${$page.url.pathname}`} />
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
	<meta name="twitter:url" content={`https://allify.app${$page.url.pathname}`} />
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

<section class="px-8 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16 2xl:px-24">
	<div
		class="bg-surface-secondary flex flex-col items-center justify-center gap-12 rounded-xl px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20"
	>
		<div class="max-w-lg">
			<h1 class="mb-3 text-2xl font-medium text-t-primary sm:text-3xl lg:text-4xl">
				{title}
			</h1>

			<p class="mt-7 text-base text-t-secondary sm:text-lg">
				{description}
			</p>
		</div>

		<button
			on:click={() => goto('/')}
			class="mt-6 w-90 cursor-pointer rounded-xl bg-brand-primary py-5 text-center text-xs font-medium text-t-inverse shadow-md transition-all hover:scale-102 hover:bg-brand-primary-dark"
		>
			{$translationsStore.errorPage.errorPageButtonGoHome}
		</button>
	</div>
</section>
