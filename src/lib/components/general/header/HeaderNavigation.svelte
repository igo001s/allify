<script lang="ts">
	// App
	import { page } from '$app/stores';

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
	] as { name: string; link: string }[];
</script>

<nav aria-label={$translationsStore.generalTexts.headerNavigationAriaLabel} class="hidden lg:block">
	<ul class="flex items-center gap-6 lg:gap-12">
		{#each navItems as item}
			<li class="overflow-y-hidden">
				<a
					href={item.link}
					aria-current={$page.url.pathname === item.link ? 'page' : undefined}
					class="
						relative
						text-sm
						font-medium
						after:absolute
						after:-bottom-1
						after:left-0
						after:h-0.5
						after:w-0
						after:rounded-full
						after:bg-brand-primary-dark
						hover:text-brand-primary-dark
						hover:after:w-full
						{$page.url.pathname === item.link
						? 'font-semibold text-brand-primary-dark after:w-full'
						: 'text-brand-primary'}
					"
				>
					{item.name}
				</a>
			</li>
		{/each}
	</ul>
</nav>
