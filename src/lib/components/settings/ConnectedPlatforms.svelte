<script lang="ts">
	// Svelte
	import type { Component } from 'svelte';

	// Assets
	import SpotifyIcon from '$lib/assets/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/icons/streamings/DeezerIcon.svelte';

	// Components
	import ConnectedPlatform from '$lib/components/settings/ConnectedPlatformItem.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	const streamings = [
		{ name: 'spotify', icon: SpotifyIcon, iconClass: 'text-spotify' },
		{ name: 'deezer', icon: DeezerIcon, iconClass: 'text-deezer' }
	] as { name: 'spotify' | 'deezer'; icon: Component; iconClass: string }[];
</script>

<div class="flex flex-col items-start gap-4">
	<h2 class="heading-2">
		{$translationsStore.settingsPage.settingsPageConnectedStreamingSectionHeading2}
	</h2>

	<p class="text-sm text-t-secondary md:text-base">
		{$translationsStore.settingsPage.settingsPageConnectedStreamingSectionParagraph1}
	</p>

	<div class="flex w-full flex-col items-center gap-5 md:flex-row">
		{#each streamings as streaming (streaming.name)}
			<ConnectedPlatform {streaming} />
		{/each}
	</div>
</div>
