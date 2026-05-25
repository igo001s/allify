<script lang="ts">
	// Svelte
	import type { SvelteComponent } from 'svelte';

	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Components
	import ConnectedPlatform from '$lib/components/settings/connected-platforms/ConnectedPlatformItem.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	const streamings = [
		{ name: 'spotify', icon: SpotifyIcon, iconClass: 'text-spotify' },
		{ name: 'deezer', icon: DeezerIcon, iconClass: 'text-deezer' }
	] as { name: 'spotify' | 'deezer'; icon: typeof SvelteComponent; iconClass: string }[];
</script>

<div class="flex flex-col items-start gap-2">
	<h2 class="mb-2 text-xl font-medium text-t-primary">
		{$translationsStore.settingsPage.settingsPageConnectedStreamingSectionHeading2}
	</h2>

	<p class="mt-1 mb-6 text-sm text-t-secondary">
		{$translationsStore.settingsPage.settingsPageConnectedStreamingSectionParagraph1}
	</p>

	<div class="flex w-full flex-col items-center gap-5 md:flex-row">
		{#each streamings as streaming}
			<ConnectedPlatform {streaming} />
		{/each}
	</div>
</div>
