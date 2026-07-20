<script lang="ts">
	// Components
	import ChangeVisibilityToggle from '$lib/components/settings/ChangeVisibilityToggle.svelte';

    // Stores
    import { translationsStore } from '$lib/stores/translations.store';
	import { userInfo } from '$lib/stores/userInfo.store';
</script>

<div class="flex flex-col items-start gap-5">
	<h2>
		{$translationsStore.settingsPage.settingsPageProfileVisibilityHeading2}
	</h2>

	<p class="text-sm leading-relaxed text-t-secondary md:text-base">
        {$translationsStore.settingsPage.settingsPageProfileVisibilityParagraph1}
	</p>

	<ChangeVisibilityToggle visibility={$userInfo?.profileVisibility ?? 'public'} />
</div>