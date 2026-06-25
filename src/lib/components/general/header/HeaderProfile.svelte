<script lang="ts">
	// Components
	import ProfileIcon from '$lib/assets/images/icons/ProfileIcon.svelte';
	import HeaderProfileItems from '$lib/components/general/header/HeaderProfileItems.svelte';
	import ProfileWithoutPhoto from '$lib/components/general/ProfileWithoutPhoto.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let showProfileOptions: boolean;
	export let openLanguageDropdown: boolean;

	$: loggedIn =
		$userInfo?.connectedStreamings?.spotify?.connected === true ||
		$userInfo?.connectedStreamings?.deezer !== undefined
			? true
			: false;

	$: primaryStreaming = $userInfo?.primaryStreaming ?? 'spotify';

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
		transition
		duration-200
		ease-out
		hover:bg-s-muted
		hover:shadow-md
		hover:ring-brand-primary
	"
	aria-haspopup="menu"
	aria-expanded={showProfileOptions}
	on:click={closeProfileOptions}
>
	{#if loggedIn}
		{#if $userInfo?.connectedStreamings[primaryStreaming]?.image}
			<img
				class={`
					h-${$userInfo?.connectedStreamings[primaryStreaming]?.image?.height}
					w-${$userInfo?.connectedStreamings[primaryStreaming]?.image?.width}
					rounded-full
					border
					object-cover
					p-1
					text-brand-primary
				`}
				src={$userInfo?.connectedStreamings[primaryStreaming]?.image?.url}
				alt={$userInfo?.connectedStreamings[primaryStreaming]?.name}
			/>
		{:else}
			<ProfileWithoutPhoto userName={$userInfo?.name} additionalClassesToSize="h-9/12 w-9/12" />
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
