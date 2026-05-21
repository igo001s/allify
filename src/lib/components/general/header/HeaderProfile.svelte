<script lang="ts">
	// Components
	import ProfileIcon from '$lib/assets/images/icons/ProfileIcon.svelte';
	import HeaderProfileItems from '$lib/components/general/header/HeaderProfileItems.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let showProfileOptions: boolean;
	export let openLanguageDropdown: boolean;

	$: loggedIn = $userInfo ? true : false;
</script>

<button
	class="
		group
		flex
		h-10.5
		w-10.5
		cursor-pointer
		items-center
		justify-center
		rounded-full
		border-b-default
		bg-s-default
		shadow-sm
		ring-1
		ring-b-default
		transition
		duration-200
		ease-out
		hover:bg-s-muted
		hover:shadow-md
		hover:ring-brand-primary
	"
	aria-haspopup="menu"
	aria-expanded={showProfileOptions}
	on:click={() => {
		openLanguageDropdown = false;
		showProfileOptions = !showProfileOptions;
	}}
>
	{#if loggedIn}
		{#if $userInfo?.connectedStreamings.spotify?.image}
			<img
				class={`
					h-${$userInfo?.connectedStreamings.spotify?.image?.height}
					w-${$userInfo?.connectedStreamings.spotify?.image?.width}
					rounded-full
					border
					object-cover
					p-1
					text-brand-primary
				`}
				src={$userInfo?.connectedStreamings.spotify?.image?.url}
				alt={$userInfo?.connectedStreamings.spotify?.name}
			/>
		{:else}
			<div
				class="
					flex
					h-9/12
					w-9/12
					items-center
					justify-center
					rounded-full
					border
					object-cover
					p-1
					pt-1
					font-medium
					text-brand-primary
				"
				aria-label={$userInfo?.connectedStreamings.spotify?.name}
			>
				{$userInfo?.connectedStreamings.spotify?.name.slice(0, 1)}
			</div>
		{/if}
	{:else}
		<ProfileIcon
			iconSvgClass="
				block
				h-9
				w-9
				text-brand-primary
				transition-colors
				duration-200
				group-hover:text-brand-primary-dark
			"
			iconAltText={$translationsStore.generalTexts.profileNotLoggedAltText}
			color="currentColor"
		/>
	{/if}
</button>

<HeaderProfileItems bind:loggedIn bind:showProfileOptions />
