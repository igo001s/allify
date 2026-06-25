<script lang="ts">
	// Components
	import FooterFirstSection from './FooterFirstSection.svelte';
	import FooterSecondSection from './FooterSecondSection.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<footer class="bg-s-inverse">
	<div class="px-8 py-12 sm:px-12 2xl:px-24">
		<div
			class="
				grid
				grid-cols-1
				gap-12
				lg:grid-cols-[4fr_1fr_1fr_1fr]
			"
		>
			<FooterFirstSection />

			<FooterSecondSection />
		</div>
	</div>

	<div
		class="
			border-t
			border-b-muted
			py-4
			text-center
			text-xs
			text-t-inverse-muted
		"
	>
		<p>
			© {new Date().getFullYear()} Allify.
			{$translationsStore.generalTexts.footerCopyrightText}
		</p>
	</div>
</footer>
