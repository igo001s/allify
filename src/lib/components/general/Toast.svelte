<script lang="ts">
	// Stores
	import { toastStore } from '$lib/stores/toast.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Assets
	import WarningIcon from '$lib/assets/images/icons/signals/WarningIcon.svelte';
	import SuccessIcon from '$lib/assets/images/icons/signals/SuccessIcon.svelte';
	import ErrorIcon from '$lib/assets/images/icons/signals/ErrorIcon.svelte';
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	let timeout: ReturnType<typeof setTimeout>;

	const closeToast = () => {
		toastStore.set({
			showToast: false,
			toastType: undefined,
			toastMessage: undefined
		});
	};

	$: if ($toastStore.showToast) {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			closeToast();
		}, 3500);
	}
</script>

<div
	class={`animate-in fade-in slide-in-from-top-2 fixed top-4 right-2 z-50 flex w-10/12 
	max-w-sm items-start gap-4 rounded-xl 
	border bg-s-default p-4 shadow-lg transition-all 
	duration-300 sm:top-6 sm:right-6 sm:left-auto sm:max-w-md md:max-w-lg
	${
		$toastStore.toastType === 'success'
			? 'border-status-success/30'
			: $toastStore.toastType === 'warning'
				? 'border-status-warning/30'
				: $toastStore.toastType === 'error'
					? 'border-status-error/30'
					: ''
	}`}
>
	<div class="mt-0.5 shrink-0">
		{#if $toastStore.toastType === 'warning'}
			<WarningIcon
				iconSvgClass="text-status-warning w-5.5 h-5.5"
				iconAltText={$translationsStore.generalTexts.toastWarningAltText}
			/>
		{:else if $toastStore.toastType === 'success'}
			<SuccessIcon
				iconSvgClass="text-status-success w-5.5 h-5.5"
				iconAltText={$translationsStore.generalTexts.toastSuccessAltText}
			/>
		{:else if $toastStore.toastType === 'error'}
			<ErrorIcon
				iconSvgClass="text-status-error w-5.5 h-5.5"
				iconAltText={$translationsStore.generalTexts.toastErrorAltText}
			/>
		{/if}
	</div>

	<div class="flex-1">
		<p class="text-s-default-foreground text-xs font-semibold sm:text-sm">
			{#if $toastStore.toastType === 'warning'}
				{$translationsStore.generalTexts.toastWarningTitle}
			{:else if $toastStore.toastType === 'success'}
				{$translationsStore.generalTexts.toastSuccessTitle}
			{:else if $toastStore.toastType === 'error'}
				{$translationsStore.generalTexts.toastErrorTitle}
			{/if}
		</p>

		<p class="text-s-muted-foreground mt-1 text-[11px] leading-relaxed sm:text-xs">
			{$toastStore.toastMessage}
		</p>
	</div>

	<button
		class="shrink-0 cursor-pointer"
		on:click={closeToast}
		aria-label={$translationsStore.generalTexts.toastCloseButtonAriaLabel}
	>
		<CloseIcon
			iconAltText={$translationsStore.generalTexts.toastCloseButtonAltText}
			iconSvgClass="w-4.5 h-4.5 text-t-primary"
		/>
	</button>
</div>
