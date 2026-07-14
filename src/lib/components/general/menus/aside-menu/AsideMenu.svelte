<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';
	import AllifyLogoColorful from '$lib/assets/images/logos/AllifyLogoColorful.svelte';

	// Components
	import AsideProfile from '$lib/components/general/menus/aside-menu/AsideProfile.svelte';
	import AsideNavigation from '$lib/components/general/menus/aside-menu/AsideNavigation.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let isAsideMenuOpen: boolean;

	function closeMenu() {
		isAsideMenuOpen = false;

		document.body.style.overflow = 'auto';
	}

	onMount(() => {
		document.body.style.overflow = isAsideMenuOpen ? 'hidden' : 'auto';
	});

	onDestroy(() => {
		document.body.style.overflow = 'auto';
	});
</script>

<div
	class="fixed inset-0 z-40 bg-s-inverse/40 lg:hidden"
	aria-label={$translationsStore.generalTexts.closeMenuAltText}
>
	<aside
		class="
            fixed
            top-0
            right-0
            z-50
            flex
			h-dvh
            w-4/5 flex-col rounded-l-2xl
            bg-s-default
            shadow-lg
            sm:w-3/5
            md:w-2/5
            lg:hidden
        "
	>
		<div
			class="flex items-center justify-between border-b border-b-default/60 pt-8 pr-3 pb-5.5 pl-8"
		>
			<button on:click={closeMenu}>
				<AllifyLogoColorful
					logoSvgClass="w-26"
					logoAltText={$translationsStore.generalTexts.logoColorfulAltText}
				/>
			</button>

			<button
				aria-label={$translationsStore.generalTexts.closeMenuAltText}
				on:click={closeMenu}
				class="cursor-pointer rounded-md p-0.5 opacity-70 transition hover:scale-102 hover:opacity-100 lg:hidden"
			>
				<CloseIcon
					iconSvgClass="w-6.5 h-6.5 text-brand-primary"
					iconAltText={$translationsStore.generalTexts.closeMenuAltText}
				/>
			</button>
		</div>

		<AsideNavigation bind:isAsideMenuOpen />

		<AsideProfile bind:isAsideMenuOpen />
	</aside>
</div>
