<script lang="ts">
	// Utils
	import { formatDuration } from '$lib/utils/formatDuration';

	// Props
	export let track: any;
</script>

<a
	class="group flex w-full cursor-pointer items-center gap-4 rounded-xl px-4 py-3 text-left transition hover:bg-s-muted"
	href={track.trackLink}
	target="_blank"
	rel="noopener noreferrer"
>
	<div class="flex h-8 w-8 shrink-0 items-center justify-center">
		<span class="text-sm font-semibold text-t-muted transition group-hover:hidden">
			{track.trackNumber ?? '—'}
		</span>
		<svg
			class="hidden h-4 w-4 text-brand-primary transition group-hover:block"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M8 5v14l11-7z" />
		</svg>
	</div>

	<div class="min-w-0 flex-1">
		<div class="flex items-center gap-2">
			{#if track.name}
				<p
					class="truncate text-sm font-medium text-t-primary transition group-hover:text-brand-primary"
				>
					{track.name}
				</p>
			{/if}

			{#if track.explicit}
				<span
					class="inline-flex shrink-0 items-center rounded bg-s-muted px-1.5 py-0.5 text-[10px] font-semibold text-t-muted uppercase"
				>
					E
				</span>
			{/if}
		</div>

		{#if track.artists}
			<p class="truncate text-xs text-t-secondary">
				{track.artists.join(', ')}
			</p>
		{/if}
	</div>

	{#if track.durationMs}
		<span class="shrink-0 text-xs text-t-muted transition group-hover:text-brand-primary">
			{formatDuration(track.durationMs)}
		</span>
	{/if}
</a>
