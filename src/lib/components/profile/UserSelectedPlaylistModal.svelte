<script lang="ts">
	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Props
	export let showSelectedPlaylistModal: boolean = true;

	function closeModal() {
		showSelectedPlaylistModal = false;
		document.body.style.overflow = '';
	}
</script>

{#if showSelectedPlaylistModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-4 backdrop-blur-md"
	>
		<div
			class="relative flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-b-default bg-s-default shadow-xl"
		>
			<button
				class="absolute top-5 right-5 z-10 cursor-pointer opacity-70 transition hover:scale-102 hover:opacity-100"
				on:click={closeModal}
				aria-label="sadasd"
			>
				<CloseIcon iconAltText={'asda'} iconSvgClass="w-5 h-5 text-brand-primary" />
			</button>
		</div>
	</div>
{/if}
