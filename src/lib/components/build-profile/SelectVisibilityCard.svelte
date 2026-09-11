<script lang="ts">
	// Props
	export let visibility: 'public' | 'private';
	export let buildProfileVisibility: 'public' | 'private' | undefined;
	export let paragraph1: string;
	export let paragraph2: string;

	function handleVisibilitySelection(selectedVisibility: 'public' | 'private') {
		if (buildProfileVisibility === selectedVisibility) {
			buildProfileVisibility = undefined;
			return;
		}

		buildProfileVisibility = selectedVisibility;
	}

	$: classByVisibilitySelected =
		buildProfileVisibility === visibility
			? 'border-brand-primary bg-brand-primary/5'
			: 'border-s-muted';
</script>

<button
	on:click={() => handleVisibilitySelection(visibility)}
	class={`flex w-full cursor-pointer flex-col items-start gap-2 rounded-xl border-2 p-4 text-left hover:border-brand-primary hover:bg-brand-primary/5 sm:gap-1.5 lg:px-6 lg:py-3 ${classByVisibilitySelected}`}
>
	<p class="text-xs font-semibold text-t-primary sm:text-sm">
		{paragraph1}
	</p>

	<p class="text-[10px] text-t-secondary sm:text-xs">
		{paragraph2}
	</p>
</button>
