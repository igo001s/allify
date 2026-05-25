<script lang="ts">
	// Components
	import SelectStreamingButton from '../profile/SelectStreamingButton.svelte';

	// Props
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let selectedStreaming: 'spotify' | 'deezer' = $userInfo?.primaryStreaming ?? 'spotify';

	let streamingsArr = [
		{ streaming: 'spotify', selected: true },
		{ streaming: 'deezer', selected: false }
	];

	function handleSelectStreaming(selected: 'spotify' | 'deezer') {
		selectedStreaming = selected;

		streamingsArr = streamingsArr.map((item) => ({
			...item,
			selected: item.streaming === selected
		}));
	}
</script>

<div class="flex w-full items-center gap-4">
	{#each streamingsArr as streaming}
		<SelectStreamingButton
			streaming={streaming.streaming as 'spotify' | 'deezer'}
			selected={streaming.selected}
			onClick={() => handleSelectStreaming(streaming.streaming as 'spotify' | 'deezer')}
		/>
	{/each}
</div>
