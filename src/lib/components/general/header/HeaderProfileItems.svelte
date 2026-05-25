<script lang="ts">
	// Svelte
	import { goto } from '$app/navigation';

	// Assets
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';

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

	function signInOnHeaderProfileItems(streaming: 'spotify' | 'deezer') {
		signInWrapper(streaming, $userInfo?.connectedStreamings.spotify?.connected ?? false, false);

		showProfileOptions = false;

		return;
	}

	function loggedItemClick(href: string) {
		goto(href);

		showProfileOptions = false;
	}

	function logoutOnHeaderProfileItems(streaming: 'spotify' | 'deezer') {
		logoutWrapper(streaming, $userInfo?.connectedStreamings.spotify?.connected ?? false, false);

		showProfileOptions = false;
	}
</script>

<div
	class={`${showProfileOptions ? 'block' : 'hidden'}
		${loggedIn ? 'right-10 -bottom-52 w-56' : 'right-10 -bottom-16 w-54'}
		animate-fadeIn
		absolute
		z-50
		rounded-xl
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
				<p class="truncate text-sm leading-tight font-semibold text-t-primary">
					{$userInfo?.connectedStreamings.spotify?.name}
				</p>

				<div
					class="flex shrink-0 items-center gap-2 rounded-full bg-brand-primary px-2.5 py-1.5 text-t-inverse"
				>
					<img
						src={TicketIcon}
						alt={$translationsStore.generalTexts.ticketAltText}
						class="h-3.5 w-3.5 rounded-full bg-s-page p-0.5"
					/>

					<span class="text-[11px] font-medium">
						{$userInfo?.tickets ?? 0}
						{($userInfo?.tickets ?? 0) > 1
							? $translationsStore.generalTexts.tickets
							: $translationsStore.generalTexts.ticket}
					</span>
				</div>
			</div>

			<p class="mt-0.5 truncate text-[11px] text-t-muted">
				{$userInfo?.connectedStreamings.spotify?.email}
			</p>
		</div>

		<div class="my-4 h-px bg-b-muted/10"></div>

		<ul class="space-y-1">
			{#each loggedItems as item}
				<li class="rounded-lg transition-all hover:bg-s-muted">
					<button
						on:click={() => loggedItemClick(item.href)}
						class="flex w-full cursor-pointer items-center px-3 py-2 transition-all hover:translate-x-0.5"
					>
						{item.text}
					</button>
				</li>
			{/each}
		</ul>

		<div class="my-4 h-px bg-b-muted/10"></div>

		<button
			class="
					w-full
					cursor-pointer
					rounded-xl
					bg-status-error
					px-3
					py-2
					font-semibold
					text-t-inverse
					transition-all
					hover:bg-status-error/80
				"
			on:click={async () => logoutOnHeaderProfileItems($userInfo?.primaryStreaming ?? 'spotify')}
		>
			{$translationsStore.generalTexts.profileLoggedItem3}
		</button>
	{:else}
		<ul class="space-y-1">
			{#each notLoggedItems as item}
				<li class="rounded-xl transition-all hover:bg-s-muted">
					<button
						disabled={item.streaming === 'deezer'}
						title={setTitleByStreaming(item.streaming)}
						on:click={() => signInOnHeaderProfileItems(item.streaming)}
						class="flex w-full cursor-pointer items-center px-3 py-2 transition-all hover:translate-x-0.5"
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
