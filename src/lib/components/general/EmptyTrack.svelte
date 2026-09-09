<script lang="ts">
	// Assets
	import SelectMusicIcon from '$lib/assets/images/icons/SelectMusicIcon.svelte';
	import MusicIcon from '$lib/assets/images/icons/MusicIcon.svelte';

	// Props
	export let openModal: ((itemType: 'music' | 'artist') => void) | undefined;
	export let emptyTrackHeading3: string;
	export let emptyTrackAltText: string;
	export let sessionType: 'profile' | 'public-user';
	export let emptyTrackHeading4: string;
	export let emptyTrackParagraph1: string;
</script>

<div class="flex w-full flex-col gap-4 xl:w-1/3">
	<h3 class="heading-3 uppercase">
		{emptyTrackHeading3}
	</h3>

	<button
		class="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-b-default p-5 text-t-primary shadow-xl sm:p-6 md:max-h-56 md:min-h-56"
		on:click={() => openModal?.('music')}
	>
		<div class="flex h-16 w-16 items-center justify-center rounded-full bg-s-muted sm:h-20 sm:w-20">
			{#if sessionType === 'profile'}
				<SelectMusicIcon
					iconSvgClass="ml-1.5 h-8 w-8 sm:h-10 sm:w-10"
					iconAltText={emptyTrackAltText}
				/>
			{:else}
				<MusicIcon iconSvgClass="mr-1 h-8 w-8 sm:h-10 sm:w-10" iconAltText={emptyTrackAltText} />
			{/if}
		</div>

		<div class="max-w-[16rem] text-center sm:max-w-xs">
			<h4 class="font-semibold">
				{emptyTrackHeading4}
			</h4>

			<p class="mt-1 text-xs leading-relaxed text-t-secondary">
				{emptyTrackParagraph1}
			</p>
		</div>
	</button>
</div>
