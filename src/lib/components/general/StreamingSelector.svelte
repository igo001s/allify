<script lang="ts">
	// Components
	import SelectStreamingButton from '../profile/SelectStreamingButton.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let selectedStreaming: 'spotify' | 'deezer' = $userInfo?.primaryStreaming ?? 'spotify';

	const streamings: ('spotify' | 'deezer')[] = ['spotify', 'deezer'];

	function handleSelectStreaming(selected: 'spotify' | 'deezer') {
		selectedStreaming = selected;
	}
</script>

<div class="flex w-full items-center gap-4">
	{#each streamings as streaming}
		<SelectStreamingButton
			{streaming}
			selected={selectedStreaming === streaming}
			onClick={() => handleSelectStreaming(streaming)}
		/>
	{/each}
</div>
