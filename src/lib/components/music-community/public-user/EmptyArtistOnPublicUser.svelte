<script lang="ts">
	// Assets
	import ArtistIcon from '$lib/assets/images/icons/ArtistIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	export let publicUserName: string;
	export let artistType: string;
</script>

<div class="flex w-full flex-col gap-4 xl:w-1/3">
	<h3 class="truncate text-xs font-semibold tracking-[0.18em] text-t-secondary uppercase">
		{#if artistType === 'artistOfTheMoment'}
			{$translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading3v1}
		{:else if artistType === 'customArtist'}
			{$translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading3v2}
		{/if}
	</h3>

	<div
		class="flex h-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-b-default p-5 text-t-primary shadow-xl sm:p-6 md:max-h-56 md:min-h-56"
	>
		<div class="flex h-16 w-16 items-center justify-center rounded-full bg-s-muted sm:h-20 sm:w-20">
			<ArtistIcon
				iconSvgClass="h-8 w-8 sm:h-10 sm:w-10"
				iconAltText={$translationsStore.musicCommunityPage.publicUser
					.musicCommunityPagePublicUserEmptyArtistOnPublicUserAltText}
			/>
		</div>

		<div class="max-w-[16rem] text-center sm:max-w-sm">
			<h4 class="font-semibold">
				{#if artistType === 'artistOfTheMoment'}
					{$translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading4v1}
				{:else if artistType === 'customArtist'}
					{$translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserEmptyArtistOnPublicUserHeading4v2}
				{/if}
			</h4>

			<p class="mt-1 text-xs leading-relaxed text-t-secondary">
				{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserEmptyArtistOnPublicUserParagraph1.replace(
					'{publicUserName}',
					publicUserName
				)}
			</p>
		</div>
	</div>
</div>
