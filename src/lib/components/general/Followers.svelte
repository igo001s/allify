<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let quantityFollowers: number;
	export let classFollowers: string;
</script>

<p class={classFollowers}>
	{quantityFollowers.toLocaleString()}
	{quantityFollowers === 1
		? $translationsStore.generalTexts.follower
		: $translationsStore.generalTexts.followers}
</p>
