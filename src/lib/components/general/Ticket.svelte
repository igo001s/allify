<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp?enhanced';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let usingTicket: boolean;
</script>

<div
	class={`flex items-center justify-center gap-1.5 rounded-full bg-white text-brand-primary ${usingTicket ? 'py-1.5 pr-3 pl-2.5' : 'p-0.5'}`}
>
	<enhanced:img
		src={TicketIcon}
		alt={$translationsStore.generalTexts.ticketAltText}
		class={`${usingTicket ? 'h-4.5 w-4.5' : 'h-3.5 w-3.5'}`}
	/>

	{#if usingTicket}
		<span class="text-xs leading-none font-semibold">-1</span>
	{/if}
</div>
