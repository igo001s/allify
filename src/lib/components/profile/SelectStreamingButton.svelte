<script lang="ts">
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	export let streaming: 'spotify' | 'deezer';
	export let selected: boolean = false;
	export let onClick: (() => void) | undefined = undefined;
</script>

<button
	type="button"
	on:click={onClick}
	class={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-2.5 text-xs font-medium capitalize transition-all duration-200 lg:text-sm
		${
			selected
				? streaming === 'spotify'
					? 'bg-spotify text-t-inverse'
					: 'bg-deezer text-t-inverse'
				: `border-s-border border bg-transparent ${streaming === 'spotify' ? 'hover:border-spotify hover:text-spotify' : 'hover:border-deezer hover:text-deezer'}`
		}
		hover:scale-[1.01]`}
>
	{#if streaming === 'spotify'}
		<SpotifyIcon iconSvgClass="w-4.5 h-4.5 lg:w-5 lg:h-5" />
	{:else}
		<DeezerIcon iconSvgClass="w-4.5 h-4.5 lg:w-5 lg:h-5" />
	{/if}

	<span>{streaming}</span>
</button>
