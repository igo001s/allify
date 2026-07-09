<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Props
	export let streaming: 'spotify' | 'deezer';
	export let selected: boolean = false;
	export let onClick: (() => void) | undefined = undefined;

	const isSpotify = streaming === 'spotify';
</script>

<button
	type="button"
	on:click={onClick}
	class={[
		'flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg',
		'border px-4 py-2 text-xs font-medium capitalize transition-all duration-200 lg:text-sm',
		selected
			? isSpotify
				? 'border-spotify text-spotify'
				: 'border-deezer text-deezer'
			: isSpotify
				? 'border-t-disabled bg-transparent text-t-disabled hover:border-spotify hover:text-spotify'
				: 'border-t-disabled bg-transparent text-t-disabled hover:border-deezer hover:text-deezer'
	].join(' ')}
>
	{#if isSpotify}
		<SpotifyIcon iconSvgClass="w-4.5 h-4.5 lg:w-5 lg:h-5" />
	{:else}
		<DeezerIcon iconSvgClass="w-4.5 h-4.5 lg:w-5 lg:h-5" />
	{/if}

	<span>{streaming}</span>
</button>
