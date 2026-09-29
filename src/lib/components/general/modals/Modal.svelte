<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/icons/CloseIcon.svelte';

	export let closeModal: () => void;
	export let closeModalButtonAriaLabel: string;
	export let closeModalIconAriaLabel: string;
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
			aria-label={closeModalButtonAriaLabel}
		>
			<CloseIcon
				iconAriaLabel={closeModalIconAriaLabel}
				iconSvgClass="h-5 w-5 text-brand-primary"
			/>
		</button>

		<div class="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
			<slot></slot>
		</div>
	</div>
</div>
