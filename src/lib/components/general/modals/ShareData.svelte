<script lang="ts">
	// Components
	import Modal from './Modal.svelte';

	// Props
	export let showShareDataModal: boolean;
	export let shareDataCloseModalButtonAriaLabel: string;
	export let shareDataCloseModalIconAriaLabel: string;
	export let paragraph1: string;
	export let paragraph2: string;
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
</Modal>
