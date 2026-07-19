<script lang="ts">
	// Svelte
	import type { SvelteComponent } from 'svelte';

	// Utils
	import { signInWrapper } from '$lib/utils/signInWrapper';
	import { logoutWrapper } from '$lib/utils/logoutWrapper';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let streaming: {
		name: 'spotify' | 'deezer';
		icon: typeof SvelteComponent;
		iconClass: string;
	};
</script>

<div
	class="flex w-full flex-col gap-3 rounded-lg border border-b-default bg-s-default p-4 sm:gap-4 sm:p-5 md:w-130 md:flex-row md:items-center md:justify-between"
>
	<div class="flex items-center gap-4">
		<div
			class={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg sm:h-14 sm:w-14 ${streaming.name === 'spotify' ? 'bg-spotify/10' : 'bg-deezer/10'}`}
		>
			<svelte:component
				this={streaming.icon}
				iconSvgClass={`h-6 w-6 text-center sm:h-7.5 sm:w-7.5 ${streaming.iconClass}`}
			/>
		</div>

		<div class="min-w-0 flex-1">
			<p class="truncate font-medium text-t-primary capitalize">{streaming.name}</p>

			{#if $userInfo?.connectedStreamings[streaming.name]?.connected === true}
				<p class="mt-0.5 truncate text-xs text-t-secondary">
					{$userInfo?.connectedStreamings[streaming.name]?.email}
				</p>
			{:else}
				<p class="mt-0.5 line-clamp-2 text-xs text-t-secondary sm:line-clamp-1">
					{$translationsStore.settingsPage.settingsPageConnectedStreamingNotConnected}
				</p>
			{/if}
		</div>
	</div>

	{#if $userInfo?.connectedStreamings[streaming.name]?.connected === true}
		<button
			class="shrink-0 cursor-pointer rounded-lg border border-status-error/40 px-2.5 py-1.5 text-xs font-medium text-status-error transition-all hover:bg-status-error/10 sm:px-3.5"
			on:click={() =>
				logoutWrapper(
					streaming.name.toLocaleLowerCase() as 'spotify' | 'deezer',
					$userInfo?.connectedStreamings[streaming.name]?.connected ?? false,
					false
				)}
		>
			{$translationsStore.settingsPage.settingsPageConnectedStreamingDisconnect}
		</button>
	{:else}
		<button
			class="shrink-0 cursor-pointer rounded-lg bg-brand-primary px-2.5 py-1.5 text-xs font-medium text-t-inverse transition-all hover:bg-brand-primary-dark sm:px-3.5"
			on:click={() =>
				signInWrapper(
					streaming.name.toLocaleLowerCase() as 'spotify' | 'deezer',
					$userInfo?.connectedStreamings[streaming.name]?.connected ?? false,
					false
				)}
		>
			{$translationsStore.settingsPage.settingsPageConnectedStreamingConnect}
		</button>
	{/if}
</div>
