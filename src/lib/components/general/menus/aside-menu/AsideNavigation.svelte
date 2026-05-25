<script lang="ts">
	// Svelte
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let isAsideMenuOpen: boolean;

	$: navItems = [
		{
			name: $translationsStore.generalTexts.headerNavigationItem1,
			link: '/my-musical-profile'
		},
		{
			name: $translationsStore.generalTexts.headerNavigationItem2,
			link: '/discoveries'
		},
		{
			name: $translationsStore.generalTexts.headerNavigationItem3,
			link: '/music-battles'
		}
	] as { name: string; link: string }[];

	function handleNavigation(link: string) {
		goto(link);

		isAsideMenuOpen = false;
	}
</script>

<nav aria-label={$translationsStore.generalTexts.headerNavigationAriaLabel}>
	<ul class="flex flex-col gap-8 px-8 py-12">
		{#each navItems as item}
			<li class="overflow-y-hidden">
				<button
					on:click={() => handleNavigation(item.link)}
					aria-current={$page.url.pathname === item.link ? 'page' : undefined}
					class="
						relative
						cursor-pointer
						text-sm
						font-medium
						transition-all
						hover:text-brand-primary-dark
						{$page.url.pathname === item.link ? 'font-semibold text-brand-primary-dark' : 'text-brand-primary'}
					"
				>
					{item.name}
				</button>
			</li>
		{/each}
	</ul>
</nav>
