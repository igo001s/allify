<script lang="ts">
	// App
	import { page } from '$app/stores';

	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp?enhanced';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Schema
	import { getJsonLdByPage } from '$lib/utils/getJsonLdByPage';
</script>

<svelte:head>
	<!-- Schema.org -->
	{@html `<script type="application/ld+json">${getJsonLdByPage(
		'paymentSuccessPage',
		$translationsStore.locale,
		$translationsStore.paymentSuccessPage.title,
		$translationsStore.configuration.allifyDescription,
		$translationsStore.paymentSuccessPage.paymentSuccessPageMetaDescription
	)}</script>`}
	<!-- General -->
	<title>{$translationsStore.paymentSuccessPage.title}</title>
	<meta
		name="description"
		content={$translationsStore.paymentSuccessPage.paymentSuccessPageMetaDescription}
	/>
	<meta
		name="keywords"
		content={$translationsStore.paymentSuccessPage.paymentSuccessPageMetaKeywords}
	/>
	<link rel="canonical" href={`https://allify.club${$page.url.pathname}`} />
	<!-- Open Graph -->
	<meta property="og:locale" content={$translationsStore.configuration.langAttribute} />
	<meta property="og:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta property="og:title" content={$translationsStore.paymentSuccessPage.title} />
	<meta
		property="og:description"
		content={$translationsStore.paymentSuccessPage.paymentSuccessPageMetaOgAndTwitterContent}
	/>
	<!-- Twitter Card -->
	<meta name="twitter:url" content={`https://allify.club${$page.url.pathname}`} />
	<meta name="twitter:title" content={$translationsStore.paymentSuccessPage.title} />
	<meta
		name="twitter:description"
		content={$translationsStore.paymentSuccessPage.paymentSuccessPageMetaOgAndTwitterContent}
	/>
</svelte:head>

<section class="px-8 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16 2xl:px-24">
	<div
		class="bg-surface-secondary flex flex-col items-center justify-center rounded-lg px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20"
	>
		<div class="flex max-w-xl flex-col items-center">
			<h1 class="text-2xl leading-tight font-medium text-t-primary sm:text-3xl lg:text-4xl">
				{$translationsStore.paymentSuccessPage.paymentSuccessPageHeading1}
			</h1>

			<p class="mt-5 max-w-lg text-base leading-relaxed text-t-secondary sm:text-lg">
				{$translationsStore.paymentSuccessPage.paymentSuccessPageParagraph1}
			</p>
		</div>

		<div class="bg-surface-primary mt-8 flex items-center gap-3 rounded-xl px-6 py-4 shadow-sm">
			<span class="text-xl font-semibold text-t-primary">+{$page.url.searchParams.get('quantity')}</span>

			<enhanced:img
				src={TicketIcon}
				alt={$translationsStore.generalTexts.ticketAltText}
				class="h-10 w-10"
				loading="eager"
				fetchpriority="high"
				decoding="sync"
			/>

			<span class="text-sm font-medium text-t-secondary">
				{$translationsStore.paymentSuccessPage.paymentSuccessPageTicketsAddedText}
			</span>
		</div>

		<a
			href="/"
			class="mt-14 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-primary px-6 py-3.5 text-sm font-semibold text-t-inverse shadow-md transition-all duration-200 hover:scale-102 hover:shadow-lg"
		>
			{$translationsStore.paymentSuccessPage.paymentSuccessPageButtonText}
		</a>
	</div>
</section>