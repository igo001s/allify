<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';

	// Utils
	import { validateComment } from '$lib/utils/validateComment';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Props
	export let profileUserName: string;
	export let showAddCommentModal: boolean;

	let comment: string = '';

	let isCommentValid: { typeError: string; error: boolean } = {
		typeError: '',
		error: false
	};

	function handleCommentInput() {
		isCommentValid = validateComment(comment);
	}

	function handleAddComment() {
		if (isCommentValid.error || !comment.trim()) {
			return;
		}

		console.log('Comment added:', comment);
	}

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
			aria-label={$translationsStore.musicCommunityPage.publicUser
				.musicCommunityPagePublicUserCloseAddCommentModalButtonAriaLabel}
			on:click={() => (showAddCommentModal = false)}
		>
			<CloseIcon
				iconAltText={$translationsStore.musicCommunityPage.publicUser
					.musicCommunityPagePublicUserCloseAddCommentModalAltText}
				iconSvgClass="h-5 w-5 text-brand-primary"
			/>
		</button>

		<div class="flex flex-col gap-3 p-5 sm:gap-4 sm:p-6 lg:p-8">
			<p class="text-lg leading-tight font-bold text-t-primary sm:text-xl">
				{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserParagraph1}
				<span class="font-bold text-brand-primary">{profileUserName}</span>
			</p>

			<p class="text-xs leading-relaxed text-t-secondary sm:text-sm">
				{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserParagraph2}
			</p>

			<label class="my-2 flex flex-col gap-1.5 text-sm font-medium text-t-primary">
				{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserInputLabel}

				<textarea
					minlength="1"
					maxlength="200"
					rows="4"
					class="mt-1 w-full resize-none rounded-lg border border-b-default bg-s-muted px-3.5 py-2.5 text-xs text-t-primary transition-all outline-none placeholder:text-t-secondary/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
					placeholder={$translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserInputPlaceholder}
					bind:value={comment}
					on:input={handleCommentInput}
				></textarea>

				<div class="flex items-start justify-between gap-3">
					{#if isCommentValid.error}
						<span class="mt-1 text-[10px] text-status-error sm:text-[11px]">
							{#if isCommentValid.typeError === 'emptyOrTooLong'}
								{$translationsStore.musicCommunityPage.publicUser
									.musicCommunityPagePublicUserInputErrorEmptyOrTooLongMessage}
							{:else if isCommentValid.typeError === 'invalidCharacters'}
								{$translationsStore.musicCommunityPage.publicUser
									.musicCommunityPagePublicUserInputErrorInvalidInsultsMessage}
							{/if}
						</span>
					{:else}
						<span></span>
					{/if}

					<span
						class={`mt-1 shrink-0 text-[10px] sm:text-[11px] ${comment.length >= 200 ? 'text-status-error' : 'text-t-secondary'}`}
					>
						{comment.length}/200
					</span>
				</div>
			</label>

			<div class="mt-1 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:justify-end sm:gap-3">
				<button
					type="button"
					class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg border border-b-default px-4 py-2 text-xs font-semibold text-t-primary transition hover:scale-102 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
					on:click={() => (showAddCommentModal = false)}
				>
					{$translationsStore.musicCommunityPage.publicUser
						.musicCommunityPagePublicUserCloseAddCommentModal}
				</button>

				<button
					type="button"
					disabled={isCommentValid.error || !comment.trim()}
					class="flex min-h-10 w-full cursor-pointer items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-xs font-semibold text-s-default transition hover:scale-102 disabled:cursor-not-allowed disabled:bg-s-inverse-muted disabled:opacity-60 sm:min-h-11 sm:w-auto sm:px-5 sm:text-sm"
					on:click={handleAddComment}
				>
					{$translationsStore.musicCommunityPage.publicUser.musicCommunityPagePublicUserPostComment}
				</button>
			</div>
		</div>
	</div>
</div>
