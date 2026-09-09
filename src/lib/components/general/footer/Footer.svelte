<script lang="ts">
	// Components
	import FooterFirstSection from './FooterFirstSection.svelte';
	import FooterSecondSection from './FooterSecondSection.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<footer class="footer-spacing bg-s-inverse">
	<div class="pb-8 lg:pb-12">
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
			pt-8
			text-center
			text-xs
			text-t-inverse-muted
			lg:pt-12
		"
	>
		<p>
			© {new Date().getFullYear()} Allify.
			{$translationsStore.generalTexts.footerCopyrightText}
		</p>
	</div>
</footer>
