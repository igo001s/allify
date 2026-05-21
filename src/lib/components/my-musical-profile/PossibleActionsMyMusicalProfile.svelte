<script lang="ts">
	// Assets
	import ReloadIcon from '$lib/assets/images/icons/ReloadIcon.svelte';
	import ShareIcon from '$lib/assets/images/icons/ShareIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let lastSync: Date | undefined;

	const btnClass = [
		'group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl',
		'border border-brand-primary/20 bg-white px-4 py-2.5',
		'text-xs font-medium text-brand-primary',
		'transition-all duration-200',
		'hover:border-brand-primary/40 hover:bg-brand-primary/5',
		'sm:flex-none'
	].join(' ');
</script>

<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
	<span class="flex flex-col gap-1 text-xs text-t-secondary sm:gap-2 md:flex-row">
		{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedLastUpdate}

		<strong class="font-medium text-t-primary">
			{lastSync ? new Date(lastSync).toLocaleString($translationsStore.locale) : '-'}
		</strong>
	</span>

	<div class="flex gap-3">
		<button class={btnClass}>
			<ReloadIcon
				iconSvgClass="h-4 w-4 text-brand-primary transition-transform duration-200 group-hover:rotate-90"
				iconAltText={$translationsStore.myMusicalProfilePage
					.myMusicalProfilePageMostListenedReloadIconAltText}
			/>

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedButtonUpdate}
		</button>

		<button class={btnClass}>
			<ShareIcon
				iconSvgClass="h-4 w-4 text-brand-primary"
				iconAltText={$translationsStore.myMusicalProfilePage
					.myMusicalProfilePageMostListenedShareIconAltText}
			/>

			{$translationsStore.myMusicalProfilePage.myMusicalProfilePageMostListenedShareButton}
		</button>
	</div>
</div>
