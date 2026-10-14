<script lang="ts">
	// Assets
	import SelectArtistIcon from '#lib/assets/icons/SelectArtistIcon.svelte';
	import ArtistIcon from '#lib/assets/icons/ArtistIcon.svelte';

	// Props
	export let openModal: ((itemType: 'music' | 'artist') => void) | undefined;
	export let emptyArtistHeading3: string;
	export let emptyArtistAriaLabel: string;
	export let sessionType: 'profile' | 'public-user';
	export let emptyArtistHeading4: string;
	export let emptyArtistParagraph1: string;

	function isProfilePage(sessionType: string): string {
		if (sessionType === 'profile') {
			return 'cursor-pointer';
		}

		return '';
	}
</script>

<div class="flex w-full flex-col gap-4 xl:w-1/3">
	<h3 class="heading-3 uppercase">
		{emptyArtistHeading3}
	</h3>

	<button
		type="button"
		class={`flex h-80 flex-col items-center justify-center gap-4 rounded-xl border border-b-default p-4 shadow-xl sm:gap-6 sm:p-5 md:h-56 md:gap-3 lg:p-6 ${isProfilePage(sessionType)}`}
		on:click={() => openModal?.('music')}
	>
		<div class="flex h-20 w-20 items-center justify-center rounded-full bg-s-muted">
			{#if sessionType === 'profile'}
				<SelectArtistIcon iconSvgClass="ml-1.5 h-12 w-12" iconAriaLabel={emptyArtistAriaLabel} />
			{:else}
				<ArtistIcon iconSvgClass="ml-0.5 mt-0.5 h-12 w-12" iconAriaLabel={emptyTrackAriaLabel} />
			{/if}
		</div>

		<div class="space-y-2 text-center sm:max-w-xs md:space-y-1.5">
			<h4 class="heading-4">
				{emptyArtistHeading4}
			</h4>

			<p class="text-xs text-t-secondary">
				{emptyArtistParagraph1}
			</p>
		</div>
	</button>
</div>
