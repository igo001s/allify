<script lang="ts">
	// Stores
	import { translationsStore } from '$lib/stores/translations.store';

	// Utils
	import { formatDuration } from '$lib/utils/formatDuration';

	// Props
	export let music: any;
</script>

<a
	class="group flex w-full cursor-pointer gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-s-muted"
	href={music.trackLink}
	target="_blank"
	rel="noopener noreferrer"
>
	{#if music.images?.[0]?.url}
		<img
			src={music.images[0].url}
			alt={music.name}
			class="h-14 w-14 shrink-0 rounded object-cover"
		/>
	{/if}

	<div class="min-w-0 flex-1">
		<div class="flex items-center justify-between gap-4">
			<div class="min-w-0">
				{#if music.name}
					<p
						class="flex items-center gap-1.5 truncate text-sm font-medium text-t-primary transition group-hover:text-brand-primary"
					>
						<span class="truncate">{music.name}</span>

						{#if music.explicit}
							<span
								class="inline-flex shrink-0 items-center rounded bg-s-muted px-1.5 py-0.5 text-[10px] font-semibold text-t-muted uppercase"
							>
								E
							</span>
						{/if}
					</p>
				{/if}

				{#if music.artists}
					<p class="truncate text-xs text-t-secondary">
						{music.artists.join(', ')}
					</p>
				{/if}
			</div>

			{#if music.durationMs}
				<span class="shrink-0 text-xs text-t-secondary">
					{formatDuration(music.durationMs)}
				</span>
			{/if}
		</div>

		{#if music.addedBy && music.addedAt}
			<p class="mt-1 text-[11px] text-t-muted">
				{$translationsStore.profilePage.profilePageUserSelectedPlaylistModalAddedBy}
				{music.addedBy} •{' '}
				{new Date(music.addedAt).toLocaleDateString($translationsStore.locale)}
			</p>
		{/if}
	</div>
</a>
