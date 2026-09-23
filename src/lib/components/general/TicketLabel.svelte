<script lang="ts">
	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp?enhanced';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<span class="inline-flex items-center gap-1 rounded-md bg-brand-primary/10 px-2 py-1.5">
	<enhanced:img
		src={TicketIcon}
		alt={$translationsStore.generalTexts.ticketAltText}
		class="h-3 w-3"
	/>

	<span class="text-[10px] leading-none font-semibold">-1</span>
</span>
