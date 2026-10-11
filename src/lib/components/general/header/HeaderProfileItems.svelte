<script lang="ts">
	// App
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	// Components
	import Ticket from '$lib/components/general/Ticket.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Utils
	import { setTitleByStreaming } from '$lib/utils/setTitleByStreaming';
	import { logoutWrapper } from '$lib/utils/logoutWrapper';
	import { signInWrapper } from '$lib/utils/signInWrapper';

	// Props
	export let loggedIn: boolean;
	export let showProfileOptions: boolean;

	$: notLoggedItems = [
		{
			streaming: 'spotify',
			text: $translationsStore.generalTexts.profileNotLoggedItem1,
			streamingName: 'Spotify',
			streamingClass: 'text-spotify'
		},
		{
			streaming: 'deezer',
			text: $translationsStore.generalTexts.profileNotLoggedItem2,
			streamingName: 'Deezer',
			streamingClass: 'text-deezer'
		}
	] as {
		streaming: 'spotify' | 'deezer';
		text: string;
		streamingName: string;
		streamingClass: string;
	}[];

	$: loggedItems = [
		{
			text: $translationsStore.generalTexts.profileLoggedItem1,
			href: '/profile'
		},
		{
			text: $translationsStore.generalTexts.profileLoggedItem2,
			href: '/settings'
		}
	] as { text: string; href: '/profile' | '/settings' }[];

	function signInOnHeaderProfileItems(streaming: 'spotify' | 'deezer') {
		showProfileOptions = false;

		signInWrapper(streaming, Boolean($userInfo?.connectedStreamings?.spotify), false);
	}

	function loggedItemClick(href: '/profile' | '/settings') {
		showProfileOptions = false;
		goto(resolve(href));
	}

	function logoutOnHeaderProfileItems(streaming: 'spotify' | 'deezer') {
		showProfileOptions = false;

		logoutWrapper(streaming, Boolean($userInfo?.connectedStreamings?.spotify), false);
	}
</script>

<div
	class={`${showProfileOptions ? 'block' : 'hidden'}
		${loggedIn ? 'right-14 -bottom-55 w-56' : 'right-14 -bottom-18 w-54'}
		animate-fadeIn
		absolute
		z-50
		rounded-lg
		border
		border-b-muted/10
		bg-s-default/95
		p-4
		text-xs
		text-t-primary
		shadow-xl
		backdrop-blur-md
	`}
>
	{#if loggedIn}
		<div class="mb-2 space-y-1.5 px-2">
			<div class="flex items-center gap-4">
				<p class="truncate text-base font-semibold text-t-primary">
					{$userInfo?.name}
				</p>

				<div
					class="flex shrink-0 items-center gap-2 rounded-full bg-brand-primary px-2.5 py-1.5 text-t-inverse"
				>
					<Ticket usingTicket={false} />

					<span class="text-[11px] font-medium">
						{$userInfo?.tickets ?? 0}
						{($userInfo?.tickets ?? 0) > 1
							? $translationsStore.generalTexts.tickets
							: $translationsStore.generalTexts.ticket}
					</span>
				</div>
			</div>

			<p class="mt-0.5 truncate text-[11px] text-t-muted">
				{$userInfo?.email}
			</p>
		</div>

		<div class="my-4 h-px bg-b-muted/10"></div>

		<ul class="space-y-1">
			{#each loggedItems as item (item.href)}
				<li class="rounded-lg hover:bg-s-muted">
					<button
						type="button"
						class="flex w-full cursor-pointer items-center px-3 py-2 hover:translate-x-0.5"
						on:click={() => loggedItemClick(item.href)}
					>
						{item.text}
					</button>
				</li>
			{/each}
		</ul>

		<div class="my-4 h-px bg-b-muted/10"></div>

		<button
			type="button"
			class="button-logout w-full py-2"
			on:click={async () => logoutOnHeaderProfileItems($userInfo?.primaryStreaming ?? 'spotify')}
		>
			{$translationsStore.generalTexts.profileLoggedItem3}
		</button>
	{:else}
		<ul class="space-y-1">
			{#each notLoggedItems as item (item.streaming)}
				<li class="rounded-lg hover:bg-s-muted">
					<button
						type="button"
						disabled={item.streaming === 'deezer'}
						title={setTitleByStreaming(item.streaming)}
						class="flex w-full cursor-pointer items-center px-3 py-2 hover:translate-x-0.5"
						on:click={() => signInOnHeaderProfileItems(item.streaming)}
					>
						{item.text}
						<span class={`${item.streamingClass} ml-1 font-semibold`}>
							{item.streamingName}
						</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-6px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.15s ease-out;
	}
</style>
