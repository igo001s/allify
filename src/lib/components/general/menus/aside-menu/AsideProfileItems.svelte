<script lang="ts">
	// Svelte
	import { goto } from '$app/navigation';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Utils
	import { signInWrapper } from '$lib/utils/signInWrapper';

	// Props
	export let loggedIn: boolean;
	export let isAsideMenuOpen: boolean;

	$: notLoggedItems = [
		{
			streaming: 'spotify',
			text: $translationsStore.generalTexts.profileNotLoggedItem1
		},
		{
			streaming: 'deezer',
			text: $translationsStore.generalTexts.profileNotLoggedItem2
		}
	] as { streaming: 'spotify' | 'deezer'; text: string }[];

	$: loggedItems = [
		{
			text: $translationsStore.generalTexts.profileLoggedItem1,
			href: '/profile'
		},
		{
			text: $translationsStore.generalTexts.profileLoggedItem2,
			href: '/settings'
		}
	] as { text: string; href: string }[];
</script>

<ul class="space-y-1">
	{#if loggedIn}
		{#each loggedItems as item}
			<li class="rounded-lg transition-all hover:bg-s-muted">
				<button
					on:click={() => {
						goto(item.href);

						isAsideMenuOpen = false;
					}}
					class="flex w-full cursor-pointer items-center px-3 py-2 text-xs text-t-primary transition-all hover:translate-x-0.5"
				>
					{item.text}
				</button>
			</li>
		{/each}
	{:else}
		{#each notLoggedItems as item}
			<li class="rounded-lg transition-all hover:bg-s-muted">
				<button
					on:click={() =>
						signInWrapper(
							item.streaming,
							$userInfo?.connectedStreamings.spotify?.connected ?? false,
							false
						)}
					class="flex w-full cursor-pointer items-center px-3 py-2 text-left text-xs text-t-primary transition-all hover:translate-x-0.5"
				>
					{item.text}
					{#if item.streaming === 'spotify'}
						<span class="ml-1 font-semibold text-spotify">Spotify</span>
					{:else}
						<span class="ml-1 font-semibold text-deezer">Deezer</span>
					{/if}
				</button>
			</li>
		{/each}
	{/if}
</ul>
