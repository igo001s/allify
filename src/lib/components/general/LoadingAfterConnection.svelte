<script lang="ts">
	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Components
	import DotsLoading from '$lib/assets/images/animations/DotsLoading.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let streamingPlatform: 'spotify' | 'deezer' = 'spotify';
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/40">
	<div
		class="relative mx-4 flex max-w-md flex-col items-center gap-6 rounded-xl bg-s-default p-12 shadow-2xl"
	>
		<div class="relative">
			{#if streamingPlatform === 'spotify'}
				<div class="relative transform transition-transform hover:scale-110">
					<SpotifyIcon iconSvgClass="w-20 h-20 text-spotify" />
				</div>
			{:else if streamingPlatform === 'deezer'}
				<div class="relative transform transition-transform hover:scale-110">
					<DeezerIcon iconSvgClass="w-20 h-20 text-deezer" />
				</div>
			{/if}
		</div>

		<div class="relative flex flex-col items-center gap-2">
			<h3 class="text-xl font-bold text-t-primary">
				{$translationsStore.generalTexts.loadingComponentHeading1}
			</h3>
			<p class="text-center leading-relaxed text-t-secondary">
				{#if streamingPlatform === 'spotify'}
					{@html $translationsStore.generalTexts.loadingComponentSpotifyParagraph1}
				{:else if streamingPlatform === 'deezer'}
					{@html $translationsStore.generalTexts.loadingComponentDeezerParagraph1}
				{/if}
			</p>
		</div>

		<div class="relative">
			<DotsLoading dotsTheme={streamingPlatform} />
		</div>
	</div>
</div>
