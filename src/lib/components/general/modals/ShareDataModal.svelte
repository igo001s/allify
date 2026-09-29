<script lang="ts">
	// Components
	import Modal from './Modal.svelte';

	// Props
	export let showShareDataModal: boolean;
	export let shareDataCloseModalButtonAriaLabel: string;
	export let shareDataCloseModalIconAriaLabel: string;
	export let paragraph1: string;
	export let paragraph2: string;
	export let cancelButtonText: string;
	export let shareButtonText: string;
</script>

<Modal
	closeModal={() => (showShareDataModal = false)}
	closeModalButtonAriaLabel={shareDataCloseModalButtonAriaLabel}
	closeModalIconAriaLabel={shareDataCloseModalIconAriaLabel}
	additionalClasses="max-h-[90vh] w-full max-w-2xl"
>
	<p class="text-lg font-bold text-t-primary sm:text-xl">
		{paragraph1}
	</p>

	<p class="text-xs text-t-secondary sm:text-sm">
		{paragraph2}
	</p>

	<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
		<button class="button-secondary px-6 py-2.5" on:click={() => (showShareDataModal = false)}>
			{cancelButtonText}
		</button>

		<button class="button-primary px-6 py-2.5" on:click={() => (showShareDataModal = false)}>
			{shareButtonText}
		</button>
	</div>
</Modal>
