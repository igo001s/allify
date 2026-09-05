<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Stores
	import { showAddTickets } from '$lib/stores/showAddTickets.store';
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
	import { toastStore } from '$lib/stores/toast.store';

	// Services
	import { createCheckout } from '$lib/services/checkout/createCheckout';

	// MongoDB
	import type { ObjectId } from 'mongodb';

	// Props
	export let openFrom: 'noTickets' | 'profilePage';

	let loading = false;

	let quantity = 5;
	const options = [5, 10, 25, 50];

	function closeAddTicketsModal() {
		showAddTickets.set({ show: false, openFrom });
	}

	function handleQuantityChange(newQuantity: number) {
		if (newQuantity >= 5) quantity = newQuantity;
	}

	async function handleCreateCheckout(
		quantity: number,
		ticketId: string,
		locale: string,
		userId?: ObjectId
	) {
		loading = true;

		const createCheckoutResponse = await createCheckout(quantity, ticketId, locale, userId);

		if (!createCheckoutResponse?.error) {
			showAddTickets.set({ show: false, openFrom });
		} else {
			toastStore.set({
				showToast: true,
				toastType: 'success',
				toastMessage: $translationsStore.addTickets.addTicketsModalErrorMessageToast
			});
		}

		loading = false;

		return;
	}

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
		class="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-b-default bg-s-default shadow-xl"
	>
		<div class="border-b border-b-default p-5 sm:p-6 lg:p-8">
			<button
				class="absolute top-2 right-2 z-10 cursor-pointer opacity-70 transition hover:scale-102 hover:opacity-100"
				on:click={closeAddTicketsModal}
				aria-label={$translationsStore.addTickets.addTicketsModalAriaLabel}
			>
				<CloseIcon
					iconAltText={$translationsStore.addTickets.addTicketsModalAriaLabel}
					iconSvgClass="h-5 w-5 text-brand-primary"
				/>
			</button>

			<div class="flex flex-col gap-3 pr-8">
				<p class="text-xs font-medium tracking-widest text-t-secondary uppercase">
					{$translationsStore.addTickets.addTicketsModalTitle}
				</p>

				<p class="text-base leading-tight font-bold text-t-primary sm:text-xl">
					{$translationsStore.addTickets.addTicketsModalParagraph1}
				</p>

				<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
					{#if openFrom === 'noTickets'}
						{$translationsStore.addTickets.addTicketsModalParagraph2v1}
					{:else}
						{$translationsStore.addTickets.addTicketsModalParagraph2v2}
					{/if}
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-6 overflow-y-auto p-5 sm:p-6 lg:p-8">
			<div class="flex flex-col gap-3">
				<p class="text-xs font-medium tracking-widest text-t-secondary uppercase">
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
						bind:value={quantity}
						placeholder={$translationsStore.addTickets.addTicketsModalPlaceholder}
						class="col-span-2 rounded-lg border bg-s-muted px-4 py-3 text-sm font-semibold text-t-primary transition outline-none placeholder:text-t-muted sm:col-span-4
							{!options.includes(quantity)
							? 'border-brand-primary'
							: 'border-b-default focus:border-brand-primary'}"
					/>

					{#if quantity < 5}
						<span class="w-100 text-xs text-status-error">{$translationsStore.addTickets.addTicketsModalInputError}</span>
					{/if}
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
				class="min-h-11 flex items-center justify-center cursor-pointer rounded-lg bg-brand-primary px-5 py-3 text-sm font-semibold text-t-inverse transition hover:opacity-90"
				on:click={() =>
					handleCreateCheckout(
						quantity,
						$translationsStore.configuration.stripeTicketId,
						$translationsStore.language,
						$userInfo?._id
					)}
			>
				{#if !loading}
					{$translationsStore.addTickets.addTicketsModalButton}
				{:else}
					<DotsLoading dotsTheme="base-light" />
				{/if}
			</button>
		</div>
	</div>
</div>
