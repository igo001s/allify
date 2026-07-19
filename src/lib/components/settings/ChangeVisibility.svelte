<script lang="ts">
    // Stores
    import { translationsStore } from '$lib/stores/translations.store';
</script>

<div class="flex flex-col items-start gap-5">
	<h2>
		{$translationsStore.settingsPage.settingsPageProfileVisibilityHeading2}
	</h2>

	<p class="text-sm leading-relaxed text-t-secondary md:text-base">
        {$translationsStore.settingsPage.settingsPageProfileVisibilityParagraph1}
	</p>
</div>