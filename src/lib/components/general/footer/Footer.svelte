<script lang="ts">
	// Components
	import FooterFirstSection from './FooterFirstSection.svelte';
	import FooterSecondSection from './FooterSecondSection.svelte';

	// Stores
	import { translationsStore } from '$lib/stores/translations.store';
</script>

<footer class="bg-s-inverse px-5 pt-8 pb-5 md:p-10 xl:px-16 xl:pt-16 xl:pb-10">
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
			pt-5
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
