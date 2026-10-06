<script lang="ts">
	// App
	import { resolve } from '$app/paths';

	// Assets
	import BurguerMenuIcon from '$lib/assets/icons/BurgerMenuIcon.svelte';
	import AllifyLogoColorful from '$lib/assets/logos/AllifyLogoColorful.webp?enhanced';

	// Components
	import HeaderNavigation from '$lib/components/general/header/HeaderNavigation.svelte';
	import AsideMenu from '$lib/components/general/menus/aside-menu/AsideMenu.svelte';
	import HeaderSelectLanguage from '$lib/components/general/header/HeaderSelectLanguage.svelte';
	import HeaderProfile from '$lib/components/general/header/HeaderProfile.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	let isAsideMenuOpen = false;
	let openLanguageDropdown = false;
	let showProfileOptions = false;

	function OpenAsideMenu() {
		openLanguageDropdown = false;
		isAsideMenuOpen = !isAsideMenuOpen;
	}
</script>

<header
	class="relative flex items-center justify-between bg-s-default p-5 md:p-10 xl:px-16 xl:py-12"
>
	<div class="flex items-center gap-4 md:gap-10 2xl:gap-20">
		<a
			href={resolve('/')}
			class="cursor-pointer hover:scale-105"
			aria-label={$translationsStore.generalTexts.logoColorfulAriaLabel}
		>
			<enhanced:img
				src={AllifyLogoColorful}
				alt={$translationsStore.generalTexts.logoColorfulAltText}
				class="w-26 lg:w-32"
			/>
		</a>

		<HeaderNavigation />
	</div>

	<div class="hidden gap-7.5 lg:flex lg:items-center">
		<HeaderSelectLanguage bind:openLanguageDropdown bind:showProfileOptions />

		<HeaderProfile bind:showProfileOptions bind:openLanguageDropdown />
	</div>

	<div class="flex items-center gap-2.5 lg:hidden">
		<HeaderSelectLanguage bind:openLanguageDropdown />

		<button
			aria-label={$translationsStore.generalTexts.burgerMenuAriaLabel}
			class="cursor-pointer rounded-lg p-0.5 hover:bg-s-muted lg:hidden"
			aria-expanded={isAsideMenuOpen}
			on:click={OpenAsideMenu}
		>
			<BurguerMenuIcon iconSvgClass="w-6 h-6 text-brand-primary" />
		</button>
	</div>

	{#if isAsideMenuOpen}
		<AsideMenu bind:isAsideMenuOpen />
	{/if}
</header>
