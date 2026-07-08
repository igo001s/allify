<script lang="ts">
	// Svelte
	import type { SvelteComponent } from 'svelte';

	// Assets
	import SpotifyIcon from '$lib/assets/images/icons/streamings/SpotifyIcon.svelte';
	import DeezerIcon from '$lib/assets/images/icons/streamings/DeezerIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Utils
	import { setTitleByStreaming } from '$lib/utils/setTitleByStreaming';
	import { signInWrapper } from '$lib/utils/signInWrapper';

	// Props
	export let notLoggedParagraph: string;

	$: streamings = [
		{
			icon: SpotifyIcon,
			name: 'spotify',
			href: '/api/spotify/auth/login',
			buttonText: $translationsStore.generalTexts.notLoggedLoginLinkSpotify
		},
		{
			icon: DeezerIcon,
			name: 'deezer',
			href: '/',
			buttonText: $translationsStore.generalTexts.notLoggedLoginLinkDeezer
		}
	] as {
		icon: typeof SvelteComponent;
		name: 'spotify' | 'deezer';
		href: string;
		buttonText: string;
	}[];

	function setCLassByStreaming(streaming: string) {
		let baseClass: string =
			'inline-flex items-center cursor-pointer justify-center gap-2 rounded-lg px-6 py-3.5 text-sm font-semibold text-t-inverse shadow-md transition-all duration-200 hover:scale-102';

		if (streaming === 'spotify') {
			baseClass = `${baseClass} bg-spotify`;
		} else {
			baseClass = `${baseClass} bg-deezer`;
		}

		return baseClass;
	}
</script>

<section class="px-8 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16 2xl:px-24">
	<div
		class="bg-surface-secondary flex flex-col items-center justify-center gap-6 rounded-lg px-6 py-12 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20"
	>
		<div class="max-w-lg">
			<h2 class="mb-3 text-2xl font-medium text-t-primary sm:text-3xl lg:text-4xl">
				{$translationsStore.generalTexts.notLoggedHeading1}
			</h2>

			<p class="mt-7 text-base text-t-secondary sm:text-lg">
				{notLoggedParagraph}
			</p>
		</div>

		<div class="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
			{#each streamings as streaming}
				<button
					on:click={() =>
						signInWrapper(
							streaming.name,
							$userInfo?.connectedStreamings[streaming.name]?.connected ?? false,
							false
						)}
					disabled={streaming.name === 'deezer'}
					title={setTitleByStreaming(streaming.name)}
					class={setCLassByStreaming(streaming.name)}
				>
					<streaming.icon iconSvgClass="w-6.5 h-6.5 text-t-inverse" />

					{streaming.buttonText}
				</button>
			{/each}
		</div>
	</div>
</section>
