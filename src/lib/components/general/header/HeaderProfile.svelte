<script lang="ts">
	// Components
	import ProfileIcon from '$lib/assets/icons/ProfileIcon.svelte';
	import HeaderProfileItems from '$lib/components/general/header/HeaderProfileItems.svelte';

	// Stores
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let showProfileOptions: boolean;
	export let openLanguageDropdown: boolean;

	$: loggedIn =
		$userInfo?.connectedStreamings?.spotify || $userInfo?.connectedStreamings?.deezer !== undefined
			? true
			: false;

	function closeProfileOptions() {
		openLanguageDropdown = false;
		showProfileOptions = !showProfileOptions;
	}
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
		hover:bg-s-muted
		hover:shadow-md
		lg:h-11.5
		lg:w-11.5
	"
	aria-haspopup="menu"
	aria-expanded={showProfileOptions}
	on:click={closeProfileOptions}
>
	{#if loggedIn}
		{#if $userInfo?.image}
			<enhanced:img
				class={`
					h-10
					w-10
					rounded-full
					border
					object-cover
					p-1
					text-brand-primary
				`}
				src={$userInfo?.image}
				alt={$userInfo?.name}
			/>
		{/if}
	{:else}
		<ProfileIcon
			iconSvgClass="
				block
				h-9
				w-9
				text-brand-primary
				group-hover:text-brand-primary-dark
			"
		/>
	{/if}
</button>

<HeaderProfileItems {loggedIn} bind:showProfileOptions />
