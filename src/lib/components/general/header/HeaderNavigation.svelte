<script lang="ts">
	// App
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	$: navItems = [
		{
			name: $translationsStore.generalTexts.headerNavigationItem1,
			link: '/my-musical-profile'
		},
		{
			name: $translationsStore.generalTexts.headerNavigationItem2,
			link: '/music-archive'
		},
		{
			name: $translationsStore.generalTexts.headerNavigationItem3,
			link: '/music-community'
		}
	] as { name: string; link: '/my-musical-profile' | '/music-archive' | '/music-community' }[];
</script>

<nav aria-label={$translationsStore.generalTexts.headerNavigationAriaLabel} class="hidden lg:block">
	<ul class="flex items-center gap-6 lg:gap-12">
		{#each navItems as item (item.name)}
			<li>
				<a
					href={resolve(item.link)}
					class={`${
						$page.url.pathname === item.link
							? 'font-semibold text-brand-primary-dark'
							: 'text-brand-primary hover:text-brand-primary-dark'
					} text-sm font-medium`}
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
