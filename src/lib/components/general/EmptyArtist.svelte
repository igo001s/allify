<script lang="ts">
	// Assets
	import SelectArtistIcon from '$lib/assets/images/icons/SelectArtistIcon.svelte';
	import ArtistIcon from '$lib/assets/images/icons/ArtistIcon.svelte';

	// Props
	export let openModal: ((itemType: 'music' | 'artist') => void) | undefined;
	export let emptyArtistHeading3: string;
	export let emptyArtistAltText: string;
	export let sessionType: 'profile' | 'public-user';
	export let emptyArtistHeading4: string;
	export let emptyArtistParagraph1: string;
</script>

<div class="flex w-full flex-col gap-4 xl:w-1/3">
	<h3 class="text-xs font-semibold tracking-[0.18em] text-t-secondary uppercase">
		{emptyArtistHeading3}
	</h3>

	<button
		class="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-b-default p-5 text-t-primary shadow-xl sm:p-6 md:max-h-56 md:min-h-56"
		on:click={() => openModal?.('artist')}
	>
		<div class="flex h-16 w-16 items-center justify-center rounded-full bg-s-muted sm:h-20 sm:w-20">
			{#if sessionType === 'profile'}
				<SelectArtistIcon
					iconSvgClass="ml-1.5 h-8 w-8 sm:h-10 sm:w-10"
					iconAltText={emptyArtistAltText}
				/>
			{:else}
				<ArtistIcon iconSvgClass="h-8 w-8 sm:h-10 sm:w-10" iconAltText={emptyArtistAltText} />
			{/if}
		</div>

		<div class="max-w-[16rem] text-center sm:max-w-xs">
			<h4 class="font-semibold">
				{emptyArtistHeading4}
			</h4>

			<p class="mt-1 text-xs leading-relaxed text-t-secondary">
				{emptyArtistParagraph1}
			</p>
		</div>
	</button>
</div>
