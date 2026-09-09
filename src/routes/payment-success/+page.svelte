<script lang="ts">
	// App
	import { page } from '$app/stores';

	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp?enhanced';

	// Components
	import Ticket from '$lib/components/general/Ticket.svelte';

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

<div class="feedback-spacing gap-6">
	<div class="max-w-xl space-y-5">
		<h1 class="heading-1">
			{$translationsStore.paymentSuccessPage.paymentSuccessPageHeading1}
		</h1>

		<p class="mt-5 max-w-lg text-base leading-relaxed text-t-secondary sm:text-lg">
			{$translationsStore.paymentSuccessPage.paymentSuccessPageParagraph1}
		</p>
	</div>

	<div class="bg-surface-primary flex items-center gap-3 rounded-xl px-6 py-4 shadow-sm">
		<span class="text-xl font-semibold text-t-primary"
			>+{$page.url.searchParams.get('quantity')}</span
		>

		<Ticket usingTicket={false} />

		<span class="text-sm font-medium text-t-secondary">
			{$translationsStore.paymentSuccessPage.paymentSuccessPageTicketsAddedText}
		</span>
	</div>

	<a href="/" class="button-cta mt-6">
		{$translationsStore.paymentSuccessPage.paymentSuccessPageButtonText}
	</a>
</div>
