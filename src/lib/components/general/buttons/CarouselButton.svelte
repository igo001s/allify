<script lang="ts">
	// Assets
	import ArrowIcon from '$lib/assets/images/icons/ArrowIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	let { direction = 'next', onClick } = $props();

	function handleClick() {
		onClick?.();
	}
</script>

<button
	onclick={handleClick}
	class={`absolute top-1/2 z-20 hidden h-full -translate-y-1/2
		cursor-pointer items-center justify-center bg-s-inverse/80 p-2
		shadow-lg backdrop-blur-md transition-all
		duration-200 hover:scale-102 hover:bg-s-inverse lg:flex lg:p-3
		${direction === 'prev' ? 'left-0' : 'right-0'}`}
	aria-label={direction === 'prev'
		? $translationsStore.profilePage.profilePageCarouselButtonAriaLabelPrev
		: $translationsStore.profilePage.profilePageCarouselButtonAriaLabelNext}
>
	<ArrowIcon
		iconSvgClass={`${direction === 'prev' ? 'rotate-90' : '-rotate-90'} h-7 w-7 lg:h-9 lg:w-9 text-t-inverse`}
		iconAltText={$translationsStore.profilePage.profilePageCarouselArrowIconAltText}
	/>
</button>
