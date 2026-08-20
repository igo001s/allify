<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	export let showCommentsModal: boolean;

	onMount(() => {
		document.body.style.overflow = 'hidden';
	});

	onDestroy(() => {
		document.body.style.overflow = '';
	});
</script>

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-s-inverse/60 p-5 backdrop-blur-md"
>
	<div
		class="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-b-default bg-s-default shadow-xl"
	>
		<button
			class="absolute top-2 right-2 z-10 cursor-pointer opacity-70 transition hover:scale-102 hover:opacity-100"
			aria-label={$translationsStore.profilePage.profilePageCommentsCloseModalAriaLabel}
			on:click={() => (showCommentsModal = false)}
		>
			<CloseIcon
				iconAltText={$translationsStore.profilePage.profilePageCommentsCloseModalAltText}
				iconSvgClass="h-5 w-5 text-brand-primary"
			/>
		</button>

		<div class="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
			<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
				{$translationsStore.profilePage.profilePageCommentsParagraph1}
			</p>

			<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
				{$translationsStore.profilePage.profilePageCommentsParagraph2}
			</p>

			{#if $userInfo && $userInfo.comments.length > 0}
				<div class="mt-2 flex max-h-130 flex-col gap-3 overflow-y-auto pr-2 sm:gap-4">
					{#each $userInfo.comments as comment}
						<div
							class="bg-s-secondary/40 flex items-start gap-3 rounded-lg border border-b-default p-3 sm:p-4"
						>
							<enhanced:img
								src={comment.author.image?.url ?? ''}
								alt={`${$translationsStore.profilePage.profilePageAuthorCommentImageAltText} ${comment.author.name}`}
								class="h-12 w-12 shrink-0 rounded-full object-cover"
							/>

							<div class="flex flex-col gap-1">
								<a
									href={`/music-community/${comment.author._id}`}
									class="cursor-pointer leading-relaxed font-semibold text-t-secondary transition hover:text-brand-primary sm:text-sm"
								>
									{comment.author.name}
								</a>

								<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
									{comment.comment}
								</p>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div
					class="flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-b-default bg-s-muted px-6 py-12 text-center"
				>
					<p class="max-w-lg text-xs leading-relaxed text-t-secondary">
						{$translationsStore.profilePage.profilePageAuthorEmptyComments}
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
