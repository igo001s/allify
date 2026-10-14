<script lang="ts">
	// Components
	import ProfileIcon from '#lib/assets/icons/ProfileIcon.svelte';
	import HeaderProfileItems from '#lib/components/general/header/HeaderProfileItems.svelte';

	// Stores
	import { userInfo } from '#lib/stores/userInfo.store';

	// Props
	export let showProfileOptions: boolean;
	export let openLanguageDropdown: boolean;

	$: loggedIn = Boolean(
		$userInfo?.connectedStreamings?.spotify || $userInfo?.connectedStreamings?.deezer
	);

	function toggleProfileOptions() {
		openLanguageDropdown = false;
		showProfileOptions = !showProfileOptions;
	}
</script>

<button
	type="button"
	class="
		group
		flex
		h-10
		w-10
		cursor-pointer
		items-center
		justify-center
		rounded-full
		border
		border-b-default
		bg-s-default
		shadow-sm
		hover:bg-s-muted
		hover:shadow-md
		lg:h-11
		lg:w-11
	"
	on:click={toggleProfileOptions}
>
	{#if loggedIn}
		{#if $userInfo?.image}
			<enhanced:img
				class={`
					h-9
					w-9
					rounded-full
					border-b-default
					object-cover
					p-0.5
					text-brand-primary
					lg:h-10
					lg:w-10
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
				lg:w-10
				lg:h-10
			"
		/>
	{/if}
</button>

<HeaderProfileItems {loggedIn} bind:showProfileOptions />
