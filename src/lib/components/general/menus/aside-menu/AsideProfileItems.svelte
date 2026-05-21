<script lang="ts">
	// Svelte
	import { goto } from '$app/navigation';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Utils
	import { signInSpotify } from '$lib/utils/signInSpotify';

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
	];

	$: loggedItems = [
		{
			text: $translationsStore.generalTexts.profileLoggedItem1,
			href: '/profile'
		},
		{
			text: $translationsStore.generalTexts.profileLoggedItem2,
			href: '/settings'
		}
	];
</script>

<ul class="space-y-1">
	{#if loggedIn}
		{#each loggedItems as item}
			<li class="rounded-xl transition-all hover:bg-s-muted">
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
			<li class="rounded-xl transition-all hover:bg-s-muted">
				<button
					on:click={(e) => {
						if (item.streaming === 'spotify') {
							signInSpotify(item.streaming, e);
						} else {
							return;
						}
					}}
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
