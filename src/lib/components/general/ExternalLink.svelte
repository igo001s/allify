<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Props
	export let streamingPlatform: 'spotify' | 'deezer' | null = 'spotify';
	export let externalLink: string | undefined;
	export let externalLinkText: string;
	export let additionalClass = '';
</script>

<a
	href={externalLink}
	target="_blank"
	rel="noopener noreferrer"
	class={`inline-flex items-center justify-center gap-1.5 rounded-lg
		px-4 py-3 text-xs font-medium text-t-inverse
		shadow-md transition-all duration-200 hover:scale-[1.02]
		${
			streamingPlatform === 'spotify'
				? 'bg-spotify hover:bg-spotify/90'
				: 'bg-deezer hover:bg-deezer/90'
		}
		${additionalClass}`}
>
	{#if streamingPlatform === 'spotify'}
		<SpotifyIcon iconSvgClass="h-3.5 w-3.5 text-t-inverse lg:h-4.5 lg:w-4.5" />
	{:else if streamingPlatform === 'deezer'}
		<DeezerIcon iconSvgClass="h-3.5 w-3.5 text-t-inverse lg:h-4.5 lg:w-4.5" />
	{/if}

	<span>{externalLinkText}</span>
</a>
