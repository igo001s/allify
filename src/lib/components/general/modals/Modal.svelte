<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	export let closeModal: () => void;
	export let closeModalAriaLabel: string;
	export let closeModalAltText: string;
	export let additionalClasses: string = '';

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-5 backdrop-blur-md"
>
	<div
		class={`relative flex flex-col overflow-hidden rounded-lg border border-b-default bg-s-default shadow-xl ${additionalClasses}`}
	>
		<button
			class="absolute top-2 right-2 z-10 cursor-pointer opacity-70 hover:scale-102 hover:opacity-100"
			on:click={closeModal}
			aria-label={closeModalAriaLabel}
		>
			<CloseIcon iconAltText={closeModalAltText} iconSvgClass="h-5 w-5 text-brand-primary" />
		</button>

		<slot></slot>
	</div>
</div>
