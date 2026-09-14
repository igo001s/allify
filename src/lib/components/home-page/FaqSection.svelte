<script lang="ts">
	// Svelte
	import type { SvelteComponent } from 'svelte';

	// Assets
	import LinkedinIcon from '$lib/assets/images/icons/social-network/LinkedinIcon.svelte';
	import GithubIcon from '$lib/assets/images/icons/social-network/GithubIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	$: contactItems = [
		{
			icon: LinkedinIcon,
			href: 'https://www.linkedin.com/in/igor-araujo001/',
			arialabel: $translationsStore.homePage.faqSectionButtonLinkedinAriaLabel,
			label: 'LinkedIn'
		},
		{
			icon: GithubIcon,
			href: 'https://github.com/igo001s',
			arialabel: $translationsStore.homePage.faqSectionButtonGithubAriaLabel,
			label: 'Github'
		}
	] as { icon: typeof SvelteComponent; href: string; label: string; arialabel: string }[];
</script>

<section class="bg-s-default pt-2 pb-16 xl:pt-20 xl:pb-24">
	<div class="mx-auto max-w-4xl space-y-9">
		<h2 class="heading-2-faq max-w-4xl text-center">
			{$translationsStore.homePage.faqSectionHeading1}
		</h2>

		<p class="paragraph-home-page text-center">
			{$translationsStore.homePage.faqSectionParagraph1}
		</p>

		<div class="mt-3.5 flex justify-center gap-8 lg:gap-12">
			{#each contactItems as item}
				<a
					href={item.href}
					target="_blank"
					rel="noreferrer noopener"
					aria-label={item.arialabel}
					class={`button-outline-${item.label.toLowerCase()} button-outline gap-2 px-6 py-2`}
				>
					<svelte:component this={item.icon} iconSvgClass="h-7 w-7" />
					{item.label}
				</a>
			{/each}
		</div>
	</div>
</section>
