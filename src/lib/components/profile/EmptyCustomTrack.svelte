<script lang="ts">
	// Assets
	import SelectMusicIcon from '$lib/assets/images/icons/SelectMusicIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Props
	export let openSelectCustomItemModal: (itemType: 'music') => void;
</script>

<div class="flex w-full flex-col gap-4 2xl:w-2/6">
	<h3 class="text-xs font-semibold tracking-[0.18em] text-t-secondary uppercase">
		{#if $userInfo?.customTrack?.title}
			{$userInfo?.customTrack?.title}
		{:else}
			{$translationsStore.profilePage.profilePageEmptyCustomMusicHeading1}
		{/if}
	</h3>

	<button
		class="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-b-default p-6 text-t-primary shadow-xl md:max-h-56 md:min-h-56"
		on:click={() => openSelectCustomItemModal('music')}
	>
		<div class="flex h-20 w-20 items-center justify-center rounded-full bg-s-muted">
			<SelectMusicIcon
				iconSvgClass="ml-1.5 h-10 w-10"
				iconAltText={$translationsStore.profilePage.profilePageEmptyCustomMusicAltText}
			/>
		</div>

		<div class="max-w-xs text-center">
			<h4 class="font-semibold">
				{$translationsStore.profilePage.profilePageEmptyCustomMusicHeading2}
			</h4>

			<p class="mt-1 text-xs leading-relaxed text-t-secondary">
				{$translationsStore.profilePage.profilePageEmptyCustomMusicParagraph1}
			</p>
		</div>
	</button>
</div>
