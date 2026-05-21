<script lang="ts">
	// Utils
	import { signInSpotify } from '$lib/utils/signInSpotify';
	import { logoutSpotify } from '$lib/utils/logoutSpotify';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let platform: {
		name: string;
		icon: any;
		iconClass: string;
	};

	function handleLogout() {
		if (platform.name.toLocaleLowerCase() === 'spotify') {
			logoutSpotify();
		} else {
			return;
		}
	}

	function handleLogin(e: MouseEvent) {
		if (platform.name.toLocaleLowerCase() === 'spotify') {
			signInSpotify(platform.name.toLocaleLowerCase() as 'spotify', e);
		} else {
			return;
		}
	}
</script>

<div
	class="flex w-full flex-col gap-3 rounded-xl border border-b-default bg-s-default p-4 sm:gap-4 sm:p-5 md:w-130 md:flex-row md:items-center md:justify-between"
>
	<div class="flex items-center gap-4">
		<div
			class={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 ${platform.name === 'spotify' ? 'bg-spotify/10' : 'bg-deezer/10'}`}
		>
			<svelte:component
				this={platform.icon}
				iconSvgClass={`h-6 w-6 text-center sm:h-7.5 sm:w-7.5 ${platform.iconClass}`}
			/>
		</div>

		<div class="min-w-0 flex-1">
			<p class="truncate font-medium text-t-primary capitalize">{platform.name}</p>

			{#if $userInfo?.connectedStreamings.spotify?.connected === true && platform.name === 'spotify'}
				<p class="mt-0.5 truncate text-xs text-t-secondary">
					{$userInfo?.connectedStreamings.spotify?.email}
				</p>
			{:else}
				<p class="mt-0.5 line-clamp-2 text-xs text-t-secondary sm:line-clamp-1">
					{$translationsStore.settingsPage.settingsPageConnectedPlatformsNotConnected}
				</p>
			{/if}
		</div>
	</div>

	{#if $userInfo?.connectedStreamings.spotify?.connected === true && platform.name === 'spotify'}
		<button
			class="shrink-0 cursor-pointer rounded-xl border border-status-error/40 px-2.5 py-1.5 text-xs font-medium text-status-error transition-colors hover:bg-status-error/10 sm:px-3.5"
			on:click={() => handleLogout()}
		>
			{$translationsStore.settingsPage.settingsPageConnectedPlatformsDisconnect}
		</button>
	{:else}
		<button
			class="shrink-0 cursor-pointer rounded-xl bg-brand-primary px-2.5 py-1.5 text-xs font-medium text-t-inverse transition-colors hover:bg-brand-primary-dark sm:px-3.5"
			on:click={(e) => handleLogin(e)}
		>
			{$translationsStore.settingsPage.settingsPageConnectedPlatformsConnect}
		</button>
	{/if}
</div>
