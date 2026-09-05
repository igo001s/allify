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
		'button-outline',
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
	class="flex h-96 w-full flex-col justify-between rounded-lg bg-s-default text-t-primary shadow-md sm:w-10/12 lg:w-1/2 2xl:w-2/5"
>
	<div class="flex flex-col gap-4 p-6 lg:gap-6 lg:p-10">
		<div class="flex items-center justify-between font-medium">
			<platform.icon
				iconSvgClass={`w-10 h-10 ${platformKey === 'spotify' ? 'text-spotify' : 'text-deezer'}`}
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

		<div class="h-36 space-y-3 lg:space-y-4">
			<p class="text-lg font-semibold lg:text-xl">
				{platform.title}
			</p>

			<p class="h-fit text-sm sm:text-base">
				{platform.description}
			</p>
		</div>
	</div>

	<div
		class="flex h-16 justify-end border-t border-b-muted/20 px-10 py-6 text-sm font-medium transition-all"
	>
		<a
			href={platform.link}
			target="_blank"
			rel="noopener noreferrer"
			class={`flex w-fit cursor-pointer items-center gap-2.5 text-sm transition-all ${
				platformKey === 'spotify' ? 'hover:text-spotify' : 'hover:text-deezer'
			}`}
		>
			{$translationsStore.homePage.connectPlatformCardPlatformExternalLink}
			{platform.title}

			<ExternalLinkIcon
				iconSvgClass="w-5.5 h-5.5 inline-block mb-0.5"
				iconAltText={$translationsStore.homePage.connectPlatformCardPlatformExternalLinkIconAltText}
			/>
		</a>
	</div>
</li>
