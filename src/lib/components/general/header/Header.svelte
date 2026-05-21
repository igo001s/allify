<script lang="ts">
	// Assets
	import BurguerMenuIcon from '$lib/assets/images/icons/BurgerMenuIcon.svelte';
	import AllifyLogoColorful from '$lib/assets/images/logos/AllifyLogoColorful.svelte';

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
	class="relative flex items-center justify-between bg-s-default px-8 py-8 shadow-sm sm:px-12 lg:py-12 2xl:px-32"
>
	<div class="flex items-center gap-4 md:gap-10 2xl:gap-20">
		<AllifyLogoColorful
			logoSvgClass="w-26 h-fit transition-all cursor-pointer lg:w-32 hover:scale-102"
			logoAltText={$translationsStore.generalTexts.logoColorfulAltText}
		/>

		<HeaderNavigation />
	</div>

	<div class="hidden gap-6 lg:flex lg:items-center">
		<HeaderSelectLanguage bind:openLanguageDropdown bind:showProfileOptions />

		<HeaderProfile bind:showProfileOptions bind:openLanguageDropdown />
	</div>

	<div class="flex items-center gap-2 lg:hidden">
		<HeaderSelectLanguage bind:openLanguageDropdown />

		<button
			aria-label={$translationsStore.generalTexts.burguerMenuAltText}
			class="cursor-pointer rounded-xl p-0.5 transition-all hover:bg-s-muted lg:hidden"
			aria-expanded={isAsideMenuOpen}
			on:click={OpenAsideMenu}
		>
			<BurguerMenuIcon
				iconSvgClass="w-6 h-6 text-brand-primary"
				iconAltText={$translationsStore.generalTexts.burguerMenuAltText}
			/>
		</button>
	</div>

	{#if isAsideMenuOpen}
		<AsideMenu bind:isAsideMenuOpen />
	{/if}
</header>
