<script lang="ts">
	// Svelte
	import { onMount, onDestroy } from 'svelte';

	// Assets
	import CloseIcon from '$lib/assets/images/icons/CloseIcon.svelte';
	import TrashIcon from '$lib/assets/images/icons/TrashIcon.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';

	// Services
	import { deleteComment } from '$lib/services/user/remove/deleteComment';

	// MongoDB
	import type { ObjectId } from 'mongodb';

	// Types
	import type { CommentReceived } from '$lib/types/Comments.type';

	// Props
	export let showCommentsModal: boolean;

	async function handleDeleteComment(userId: ObjectId, authorId: ObjectId, comments: CommentReceived[]) {
		if (!userId || !authorId) {
			return;
		}

		const commentsAfterDelete = await deleteComment(userId, authorId, comments);

		userInfo.update((currentUser) => {
			if (currentUser) {
				return {
					...currentUser,
					comments: commentsAfterDelete
				};
			}

			return currentUser;
		});
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
		class="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-lg border border-b-default bg-s-default shadow-xl"
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

			{#if $userInfo && $userInfo.comments.commentsMadeOnMyProfile.length > 0}
				<div class="mt-2 flex max-h-130 flex-col gap-3 overflow-y-auto pr-2 sm:gap-4">
					{#each $userInfo.comments.commentsMadeOnMyProfile as comment}
						<div
							class="bg-s-secondary/40 hover:bg-s-secondary/60 flex items-start gap-3 rounded-xl border border-b-default p-3 transition-colors sm:gap-4 sm:p-4"
						>
							<enhanced:img
								src={comment.author.image?.url ?? ''}
								alt={`${$translationsStore.profilePage.profilePageAuthorCommentImageAltText} ${comment.author.name}`}
								class="h-11 w-11 shrink-0 rounded-full object-cover sm:h-12 sm:w-12"
							/>

							<div class="flex min-w-0 flex-1 flex-col gap-1">
								<div class="flex items-center justify-between gap-2">
									<div class="flex flex-col items-start">
										<a
											href={`/music-community/${comment.author._id}`}
											class="text-sm font-semibold text-t-secondary transition-colors hover:text-brand-primary"
										>
											{comment.author.name}
										</a>

										<time
											datetime={new Date(comment.createdAt).toISOString()}
											class="text-t-tertiary text-error shrink-0 text-[11px]"
										>
											{new Date(comment.createdAt).toLocaleDateString($translationsStore.locale, {
												year: 'numeric',
												month: 'short',
												day: 'numeric'
											})}
										</time>
									</div>

									<div>
										<button
											on:click={() =>
												handleDeleteComment(
													$userInfo?._id,
													comment?.author?._id,
													$userInfo?.comments.commentsMadeOnMyProfile
												)}
											aria-label={`${$translationsStore.profilePage.profilePageDeleteCommentOfAuthorAriaLabel} ${comment?.author?.name}`}
										>
											<TrashIcon
												iconAltText={`${$translationsStore.profilePage.profilePageDeleteCommentOfAuthorAltText} ${comment?.author?.name}`}
												iconSvgClass="h-4 w-4 text-t-secondary transition-all cursor-pointer hover:text-status-error"
											/>
										</button>
									</div>
								</div>

								<p class="text-xs leading-relaxed text-t-secondary">
									{comment.content}
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
