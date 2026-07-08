<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Stores
	import { showAddTickets } from '$lib/stores/showAddTickets.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Services
	import { createCheckout } from '$lib/services/checkout/createCheckout';

	let quantity = 1;
	const options = [1, 5, 10, 25];

	function closeAddTicketsModal() {
		showAddTickets.set(false);
	}

	function handleQuantityChange(newQuantity: number) {
		if (newQuantity >= 1) quantity = newQuantity;
	}

	function handleInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = parseInt(target.value);

		if (!isNaN(value)) {
			handleQuantityChange(value);
		}
	}

	async function handleCreateCheckout(quantity: number) {
		await createCheckout(quantity);

		showAddTickets.set(false);
	}

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-3 backdrop-blur-md sm:p-4"
>
	<div
		class="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-b-default bg-s-default shadow-xl"
	>
		<div class="border-b border-b-default p-5 sm:p-6 lg:p-8">
			<button
				class="absolute top-3 right-3 z-10 cursor-pointer opacity-70 transition hover:scale-102 hover:opacity-100"
				on:click={closeAddTicketsModal}
				aria-label={$translationsStore.addTickets.addTicketsModalAriaLabel}
			>
				<CloseIcon
					iconAltText={$translationsStore.addTickets.addTicketsModalAriaLabel}
					iconSvgClass="h-5 w-5 text-brand-primary"
				/>
			</button>

			<div class="flex flex-col gap-3 pr-8">
				<p class="text-xs font-medium tracking-widest uppercase text-t-secondary">
					{$translationsStore.addTickets.addTicketsModalTitle}
				</p>

				<p class="text-xl font-bold leading-tight text-t-primary sm:text-2xl">
					{$translationsStore.addTickets.addTicketsModalParagraph1}
				</p>

				<p class="text-sm leading-relaxed text-t-secondary">
					{$translationsStore.addTickets.addTicketsModalParagraph2}
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-6 overflow-y-auto p-5 sm:p-6 lg:p-8">
			<div class="flex flex-col gap-3">
				<p class="text-xs font-medium tracking-widest uppercase text-t-secondary">
					{$translationsStore.addTickets.addTicketsModalParagraph3}
				</p>

				<div class="mt-1 grid grid-cols-2 gap-3 sm:grid-cols-4">
					{#each options as opt}
						<button
							class="cursor-pointer rounded-lg border py-3 text-sm font-semibold transition
								{quantity === opt
									? 'border-brand-primary bg-brand-primary text-t-inverse'
									: 'border-b-default bg-s-muted text-t-primary hover:border-brand-primary hover:text-brand-primary'}"
							on:click={() => handleQuantityChange(opt)}
						>
							{opt}
						</button>
					{/each}

					<input
						type="number"
						min="1"
						placeholder={$translationsStore.addTickets.addTicketsModalPlaceholder}
						class="col-span-2 rounded-lg border bg-s-muted px-4 py-3 text-sm font-semibold text-t-primary outline-none transition placeholder:text-t-muted sm:col-span-4
							{!options.includes(quantity)
								? 'border-brand-primary'
								: 'border-b-default focus:border-brand-primary'}"
						on:input={handleInputChange}
					/>
				</div>
			</div>

			<div class="flex flex-wrap items-center gap-2">
				<span
					class="inline-flex items-center rounded-lg bg-brand-primary px-3 py-1 text-[11px] font-medium text-t-inverse"
				>
					{quantity}
					{quantity === 1
						? $translationsStore.addTickets.addTicketsModalTicket
						: $translationsStore.addTickets.addTicketsModalTickets}
				</span>

				<span class="text-xs text-t-muted">•</span>

				<span class="text-xs text-t-secondary">
					{quantity === 1
						? $translationsStore.addTickets.addTicketsModalSelected
						: $translationsStore.addTickets.addTicketsModalSelectedPlural}
				</span>
			</div>

			<button
				class="min-h-11 w-full cursor-pointer rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-t-inverse transition hover:opacity-90"
				on:click={() => handleCreateCheckout(quantity)}
			>
				{$translationsStore.addTickets.addTicketsModalButton}
			</button>
		</div>
	</div>
</div>