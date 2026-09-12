<script lang="ts">
	// Assets
	import ConnectIcon from '$lib/assets/images/icons/ConnectIcon.svelte';
	import ExternalLinkIcon from '$lib/assets/images/icons/ExternalLinkIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Types
	import type { CardPlatformType } from '$lib/types/Components.type';

	// Utils
	import { setTitleByStreaming } from '$lib/utils/setTitleByStreaming';
	import { signInWrapper } from '$lib/utils/signInWrapper';

	// Props
	export let platform: CardPlatformType;

	const platformKey = platform.title.toLowerCase() as 'spotify' | 'deezer';

	$: isConnected = Boolean($userInfo?.connectedStreamings?.[platformKey]);

	$: cardClass = [
		'button-outline px-4 py-2.5 gap-1.5',
		isConnected ? 'button-outline-active' : 'button-outline-disable',
		isConnected
			? platformKey === 'spotify'
				? 'button-outline-active-spotify'
				: 'button-outline-active-deezer'
			: platformKey === 'spotify'
				? 'button-outline-disable-spotify'
				: 'button-outline-disable-deezer'
	]
		.filter(Boolean)
		.join(' ');
</script>

<li
	class="flex w-full flex-col justify-between rounded-lg bg-s-default text-t-primary shadow-md lg:w-1/2 2xl:w-2/5"
>
	<div class="flex flex-col gap-5 p-6 xl:gap-6 xl:px-10 xl:py-8">
		<div class="flex items-center justify-between font-medium">
			<platform.icon
				iconSvgClass={`h-10 w-10 ${platformKey === 'spotify' ? 'text-spotify' : 'text-deezer'}`}
			/>

			<button
				on:click={() => {
					signInWrapper(platformKey, $userInfo?.connectedStreamings?.spotify ? true : false, false);
				}}
				disabled={$userInfo?.connectedStreamings?.[platformKey] ? true : false}
				title={setTitleByStreaming(platformKey)}
				class={cardClass}
			>
				<ConnectIcon
					iconSvgClass="mr-0.5 inline-block h-3.5 w-3.5 xl:h-4 xl:w-4"
					iconAltText={$translationsStore.homePage.connectPlatformCardPlatformConnectIconAltText}
				/>

				{#if $userInfo?.connectedStreamings?.[platformKey]}
					{$translationsStore.homePage.connectPlatformCardPlatformConnectedButton}
				{:else}
					{platformKey === 'spotify'
						? $translationsStore.homePage.connectPlatformCardPlatformConnectSpotifyButton
						: $translationsStore.homePage.connectPlatformCardPlatformConnectDeezerButton}
				{/if}
			</button>
		</div>

		<div class="space-y-3 xl:space-y-4">
			<h3 class="heading-3-platform-card">
				{platform.title}
			</h3>

			<p class="text-additional-info">
				{platform.description}
			</p>
		</div>
	</div>

	<div
		class="flex min-h-16 justify-end border-t border-b-muted/20 px-6 py-4 text-sm font-medium xl:px-10 xl:py-6"
	>
		<a
			href={platform.link}
			target="_blank"
			rel="noopener noreferrer"
			class={`flex w-fit items-center gap-2.5 text-xs lg:text-sm ${
				platformKey === 'spotify' ? 'hover:text-spotify' : 'hover:text-deezer'
			}`}
		>
			{$translationsStore.homePage.connectPlatformCardPlatformExternalLink}
			{platform.title}

			<ExternalLinkIcon
				iconSvgClass="mb-0.5 inline-block h-5 w-5"
				iconAltText={$translationsStore.homePage.connectPlatformCardPlatformExternalLinkIconAltText}
			/>
		</a>
	</div>
</li>
