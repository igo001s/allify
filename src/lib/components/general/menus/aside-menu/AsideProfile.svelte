<script lang="ts">
	// Assets
	import ProfileIcon from '$lib/assets/images/icons/ProfileIcon.svelte';
	import ArrowIcon from '$lib/assets/images/icons/ArrowIcon.svelte';
	import TicketIcon from '$lib/assets/images/icons/TicketIcon.webp';

	// Components
	import AsideProfileItems from '$lib/components/general/menus/aside-menu/AsideProfileItems.svelte';
	import ProfileWithoutPhoto from '$lib/components/general/ProfileWithoutPhoto.svelte';

	// Utils
	import { logoutWrapper } from '$lib/utils/logoutWrapper';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let isAsideMenuOpen: boolean;

	$: loggedIn =
		$userInfo?.connectedStreamings?.spotify?.connected === true ||
		$userInfo?.connectedStreamings?.deezer !== undefined
			? true
			: false;

	let showProfileOptions: boolean = false;

	function toggleProfileOptions() {
		showProfileOptions = !showProfileOptions;
	}

	function logoutOnHeaderProfileItems(streaming: 'spotify' | 'deezer') {
		logoutWrapper(streaming, $userInfo?.connectedStreamings.spotify?.connected ?? false, false);

		showProfileOptions = false;
		isAsideMenuOpen = false;
	}
</script>

<div class="mt-auto border-t border-b-muted/10 px-4 py-4 sm:px-5 sm:py-5">
	<div
		class="
			rounded-lg
			border
			border-b-muted/10
			bg-s-default/95
			shadow-sm
			backdrop-blur-md
			transition-all
			duration-200
			hover:shadow-md
		"
	>
		<button
			class="
				group
				flex
				w-full
				cursor-pointer
				items-center
				gap-3
				px-3
				py-3
				transition-all
				duration-200
				ease-out
			"
			on:click={toggleProfileOptions}
			aria-label="Toggle profile items"
		>
			{#if loggedIn}
				{#if $userInfo?.connectedStreamings.spotify?.image}
					<img
						class="
							h-10
							w-10
							rounded-full
							border
							border-b-default
							object-cover
							sm:h-11
							sm:w-11
						"
						src={$userInfo?.connectedStreamings.spotify?.image?.url}
						alt={$userInfo?.connectedStreamings.spotify?.name}
					/>
				{:else}
					<ProfileWithoutPhoto
						userName={$userInfo?.connectedStreamings.spotify?.name}
						additionalClassesToSize="h-10 w-10 sm:h-11 sm:w-11"
					/>
				{/if}

				<div class="min-w-0 flex-1 space-y-1.5 text-left">
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

					<p class="mt-0.5 truncate text-xs text-t-muted">
						{$userInfo?.connectedStreamings.spotify?.email}
					</p>
				</div>
			{:else}
				<div
					class="
						flex
						h-10
						w-10
						items-center
						justify-center
						rounded-full
						bg-s-muted
						transition-colors
						duration-200
						group-hover:bg-s-muted/80
						sm:h-11
						sm:w-11
					"
				>
					<ProfileIcon
						iconSvgClass="h-7 w-7 text-brand-primary transition-colors duration-200 group-hover:text-brand-primary-dark"
						iconAltText={$translationsStore.generalTexts.profileNotLoggedAltText}
						color="currentColor"
					/>
				</div>

				<p class="text-xs font-medium text-t-primary md:text-sm">
					{$translationsStore.generalTexts.cardProfileAsideMenuParagraph1}
				</p>
			{/if}

			<ArrowIcon
				iconSvgClass="
					ml-auto
					h-5
					w-5
					text-t-muted
					transition-transform
					duration-200
					{showProfileOptions ? 'rotate-180' : ''}
				"
				iconAltText={$translationsStore.generalTexts.dropdownAriaLabel}
			/>
		</button>

		{#if showProfileOptions}
			<div class="px-3 pb-3">
				<div class="mb-3 h-px bg-b-muted/10"></div>

				<AsideProfileItems {loggedIn} bind:isAsideMenuOpen />

				{#if loggedIn}
					<div class="my-3 h-px bg-b-muted/10"></div>

					<button
						class="
							w-full
							cursor-pointer
							rounded-lg
							bg-status-error
							px-3
							py-2
							text-sm
							font-semibold
							text-t-inverse
							transition-all
							duration-200
							hover:bg-status-error/80
						"
						on:click={() => logoutOnHeaderProfileItems($userInfo?.primaryStreaming ?? 'spotify')}
					>
						{$translationsStore.generalTexts.profileLoggedItem3}
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
