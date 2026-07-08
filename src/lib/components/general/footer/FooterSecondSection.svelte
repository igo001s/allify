<script lang="ts">
	// Components
	import LinkedinIcon from '$lib/assets/images/icons/social-network/LinkedinIcon.svelte';
	import GithubIcon from '$lib/assets/images/icons/social-network/GithubIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Types
	import type { FooterColumnItems } from '$lib/types/FooterColumnItems.type';

	$: footerColumnItems = {
		follow: {
			title: $translationsStore.generalTexts.footerColumn1Title,
			items: [
				{
					image: LinkedinIcon,
					href: 'https://www.linkedin.com/in/igorgabriel-dev/',
					altText: $translationsStore.generalTexts.footerColumn1Item1AltText
				},
				{
					image: GithubIcon,
					href: 'https://github.com/stwsz',
					altText: $translationsStore.generalTexts.footerColumn1Item2AltText
				}
			]
		},
		navigation: {
			title: $translationsStore.generalTexts.footerColumn2Title,
			items: [
				{
					text: $translationsStore.generalTexts.footerColumn2Item1,
					href: '/my-musical-profile'
				},
				{
					text: $translationsStore.generalTexts.footerColumn2Item2,
					href: '/discoveries'
				},
				{
					text: $translationsStore.generalTexts.footerColumn2Item3,
					href: '/music-community'
				}
			]
		},
		legal: {
			title: $translationsStore.generalTexts.footerColumn3Title,
			items: [
				{
					text: $translationsStore.generalTexts.footerColumn3Item1,
					href: '/privacy-policy'
				},
				{
					text: $translationsStore.generalTexts.footerColumn3Item2,
					href: '/terms-of-service'
				},
				{
					text: $translationsStore.generalTexts.footerColumn3Item3,
					href: '/data-usage'
				}
			]
		}
	} satisfies Record<string, FooterColumnItems>;
</script>

{#each Object.values(footerColumnItems) as column}
	<div class="flex flex-col items-center text-t-inverse lg:items-start">
		<p class="mb-4 text-sm font-semibold tracking-wide">
			{column.title}
		</p>

		<ul
			class={column.title === $translationsStore.generalTexts.footerColumn1Title
				? 'flex items-center gap-4'
				: 'flex flex-col gap-3'}
		>
			{#each column.items as item}
				<li class="text-center lg:text-left">
					{#if 'image' in item}
						<a
							href={item.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={item.altText}
							class="
								inline-flex
								items-center
								justify-center
								rounded-lg
								transition
							"
						>
							<svelte:component
								this={item.image}
								iconSvgClass="
									h-6.5
									w-6.5
									text-t-inverse-muted
									transition-all
									hover:text-t-inverse
								"
								iconAltText={item.altText}
							/>
						</a>
					{:else}
						<a
							href={item.href}
							class="
								text-sm
								font-light
								text-t-inverse-muted
								transition
								hover:text-t-inverse
							"
						>
							{item.text}
						</a>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/each}
