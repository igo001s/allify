<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let item: any;
</script>

<div class="flex w-full items-center justify-between gap-2">
	<span class="w-fit text-xs text-t-secondary">
		{$translationsStore.generalTexts.popularity}
	</span>

	<div class="h-1.5 w-7/12 overflow-hidden rounded-full bg-s-muted">
		<div class="h-full bg-brand-primary" style="width: {item?.popularity || 0}%"></div>
	</div>

	<span class="w-fit text-xs font-medium text-t-primary">
		{item?.popularity}%
	</span>
</div>
