<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Components
	import ConnectedPlatform from '$lib/components/settings/connected-platforms/ConnectedPlatformItem.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	const platforms = [
		{ name: 'spotify', icon: SpotifyIcon, iconClass: 'text-spotify' },
		{ name: 'deezer', icon: DeezerIcon, iconClass: 'text-deezer' }
	] as const;
</script>

<div class="flex flex-col items-start gap-2">
	<h2 class="text-xl font-medium text-t-primary mb-2">
		{$translationsStore.settingsPage.settingsPageConnectedPlatformsSectionHeading2}
	</h2>

	<p class="mt-1 mb-6 text-sm text-t-secondary">
		{$translationsStore.settingsPage.settingsPageConnectedPlatformsSectionParagraph1}
	</p>

	<div class="flex w-full flex-col items-center gap-5 md:flex-row">
		{#each platforms as platform}
			<ConnectedPlatform {platform} />
		{/each}
	</div>
</div>
