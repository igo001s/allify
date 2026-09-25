<script lang="ts">
	// Svelte
	import type { SvelteComponent } from 'svelte';

	// Assets
	import LinkedinIcon from '$lib/assets/images/icons/social-network/LinkedinIcon.svelte';
	import GithubIcon from '$lib/assets/images/icons/social-network/GithubIcon.svelte';
	import ArrowIcon from '$lib/assets/images/icons/ArrowIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	$: contactItems = [
		{
			icon: LinkedinIcon,
			href: 'https://www.linkedin.com/in/igor-araujo001/',
			ariaLabel: $translationsStore.homePage.faqSectionButtonLinkedinAriaLabel,
			label: 'LinkedIn'
		},
		{
			icon: GithubIcon,
			href: 'https://github.com/igo001s',
			ariaLabel: $translationsStore.homePage.faqSectionButtonGithubAriaLabel,
			label: 'Github'
		}
	] as { icon: typeof SvelteComponent; href: string; label: string; ariaLabel: string }[];

	$: faqQuestionsAndAnswers = [
		{
			question: $translationsStore.homePage.faqSectionQuestion1,
			answer: $translationsStore.homePage.faqSectionAnswer1
		},
		{
			question: $translationsStore.homePage.faqSectionQuestion2,
			answer: $translationsStore.homePage.faqSectionAnswer2
		},
		{
			question: $translationsStore.homePage.faqSectionQuestion3,
			answer: $translationsStore.homePage.faqSectionAnswer3
		},
		{
			question: $translationsStore.homePage.faqSectionQuestion4,
			answer: $translationsStore.homePage.faqSectionAnswer4
		},
		{
			question: $translationsStore.homePage.faqSectionQuestion5,
			answer: $translationsStore.homePage.faqSectionAnswer5
		},
		{
			question: $translationsStore.homePage.faqSectionQuestion6,
			answer: $translationsStore.homePage.faqSectionAnswer6
		},
		{
			question: $translationsStore.homePage.faqSectionQuestion7,
			answer: $translationsStore.homePage.faqSectionAnswer7
		},
		{
			question: $translationsStore.homePage.faqSectionQuestion8,
			answer: $translationsStore.homePage.faqSectionAnswer8
		}
	] as { question: string; answer: string }[];

	let openFaqIndex: number | null = null;
</script>

<section
	class="flex flex-col items-center gap-13 bg-s-default pt-2 pb-16 lg:gap-16 xl:pt-20 xl:pb-24"
>
	<div class="max-w-4xl space-y-9">
		<h2 class="heading-2-faq max-w-4xl text-center">
			{$translationsStore.homePage.faqSectionHeading1}
		</h2>

		<p class="paragraph-home-page text-center">
			{$translationsStore.homePage.faqSectionParagraph1}
		</p>

		<div class="mt-3.5 flex justify-center gap-8 lg:gap-12">
			{#each contactItems as item, i (i)}
				<a
					href={item.href}
					target="_blank"
					rel="noreferrer noopener"
					aria-label={item.ariaLabel}
					class={`button-outline-${item.label.toLowerCase()} button-outline gap-2 px-6 py-2`}
				>
					<svelte:component this={item.icon} iconSvgClass="h-7 w-7" />
					{item.label}
				</a>
			{/each}
		</div>
	</div>

	<div class="w-full max-w-4xl space-y-6.5 lg:space-y-9">
		{#each faqQuestionsAndAnswers as item, i (i)}
			<div class="w-full">
				<button
					type="button"
					class={`button-faq-question flex w-full items-center justify-between py-3 pr-2 pl-4 text-left transition-none! lg:py-5 lg:pr-6 lg:pl-8 ${
						openFaqIndex === i
							? 'rounded-t-lg border-x border-t bg-brand-primary/5'
							: 'rounded-lg border hover:bg-brand-primary/5'
					}`}
					on:click={() => (openFaqIndex = openFaqIndex === i ? null : i)}
				>
					<h3 class="heading-3-faq">
						{item.question}
					</h3>

					<ArrowIcon
						iconSvgClass={`h-8 w-8 shrink-0 text-brand-primary ${
							openFaqIndex === i ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{#if openFaqIndex === i}
					<div
						class="rounded-b-lg border-x border-b border-brand-primary bg-brand-primary/5 pr-2 pb-3 pl-4 text-xs text-t-secondary lg:pr-6 lg:pb-5 lg:pl-8 lg:text-sm"
					>
						{item.answer}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>
