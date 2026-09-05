<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Props
	export let streaming: 'spotify' | 'deezer';
	export let selected: boolean = false;
	export let onClick: (() => void) | undefined = undefined;

	$: cardClass = [
		'button-outline !w-1/2',
		selected ? 'button-outline-active' : 'button-outline-disable',
		streaming === 'spotify'
			? selected
				? 'button-outline-active-spotify'
				: 'button-outline-disable-spotify'
			: selected
				? 'button-outline-active-deezer'
				: 'button-outline-disable-deezer'
	].join(' ');
</script>

<button type="button" on:click={onClick} class={cardClass}>
	{#if streaming === 'spotify'}
		<SpotifyIcon />
	{:else}
		<DeezerIcon />
	{/if}

	<span class="capitalize">{streaming}</span>
</button>
