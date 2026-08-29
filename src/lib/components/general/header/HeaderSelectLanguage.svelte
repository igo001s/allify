<script lang="ts">
	// Svelte
	import { browser } from '$app/environment';
	import type { Picture } from 'vite-imagetools';

	// Stores
	import { languageStore } from '$lib/stores/language.store';
	import { translationsStore } from '$lib/stores/translations.store';

	// Assets
	import englishFlag from '$lib/assets/images/icons/flags/united-states-icon.webp?enhanced';
	import germanyFlag from '$lib/assets/images/icons/flags/germany-icon.webp?enhanced';
	import portugueseFlag from '$lib/assets/images/icons/flags/brazil-icon.webp?enhanced';
	import spanishFlag from '$lib/assets/images/icons/flags/spain-icon.webp?enhanced';
	import frenchFlag from '$lib/assets/images/icons/flags/france-icon.webp?enhanced';
	import italianFlag from '$lib/assets/images/icons/flags/italy-icon.webp?enhanced';
	import russianFlag from '$lib/assets/images/icons/flags/russia-icon.webp?enhanced';
	import chineseFlag from '$lib/assets/images/icons/flags/china-icon.webp?enhanced';
	import japaneseFlag from '$lib/assets/images/icons/flags/japan-icon.webp?enhanced';
	import ArrowIcon from '$lib/assets/images/icons/ArrowIcon.svelte';
	import SelectedIcon from '$lib/assets/images/icons/SelectedIcon.svelte';

	// Props
	export let openLanguageDropdown: boolean = false;
	export let showProfileOptions: boolean = false;

	$: languageOptions = [
		{ code: 'en-US', label: $translationsStore.generalTexts.headerLanguageEn, altText: $translationsStore.generalTexts.headerLanguageEnAltText, flag: englishFlag },
		{
			code: 'pt-BR',
			label: $translationsStore.generalTexts.headerLanguagePt,
			altText: $translationsStore.generalTexts.headerLanguagePtAltText,
			flag: portugueseFlag
		},
		{ code: 'es-ES', label: $translationsStore.generalTexts.headerLanguageEs, altText: $translationsStore.generalTexts.headerLanguageEsAltText, flag: spanishFlag },
		{ code: 'zh-CN', label: $translationsStore.generalTexts.headerLanguageZh, altText: $translationsStore.generalTexts.headerLanguageZhAltText, flag: chineseFlag },
		{ code: 'ru-RU', label: $translationsStore.generalTexts.headerLanguageRu, altText: $translationsStore.generalTexts.headerLanguageRuAltText, flag: russianFlag },
		{ code: 'ja-JP', label: $translationsStore.generalTexts.headerLanguageJa, altText: $translationsStore.generalTexts.headerLanguageJaAltText, flag: japaneseFlag },
		{ code: 'de-DE', label: $translationsStore.generalTexts.headerLanguageDe, altText: $translationsStore.generalTexts.headerLanguageDeAltText, flag: germanyFlag },
		{ code: 'fr-FR', label: $translationsStore.generalTexts.headerLanguageFr, altText: $translationsStore.generalTexts.headerLanguageFrAltText, flag: frenchFlag },
		{ code: 'it-IT', label: $translationsStore.generalTexts.headerLanguageIt, altText: $translationsStore.generalTexts.headerLanguageItAltText, flag: italianFlag }
	] as { code: string; label: string; altText: string; flag: Picture }[];

	$: selectedLanguage =
		languageOptions.find((lang) => lang.code === $languageStore) ?? languageOptions[0];

	function toggleLanguageDropdown() {
		showProfileOptions = false;
		openLanguageDropdown = !openLanguageDropdown;
	}

	function selectLanguage(code: string) {
		languageStore.set(code);
		openLanguageDropdown = false;
	}
</script>

<div class="relative inline-block">
	<button
		class="
			flex min-w-36 cursor-pointer items-center justify-between
			gap-3 rounded-lg
			border
			border-b-default
			bg-s-default
			px-2.5 py-1.5
			text-sm
			transition-all duration-200
			hover:border-brand-primary hover:bg-s-muted
			hover:shadow-sm
			focus:outline-none
			md:px-3
			md:py-2
		"
		aria-haspopup="listbox"
		aria-expanded={openLanguageDropdown}
		on:click={toggleLanguageDropdown}
	>
		<div class="flex min-w-0 items-center gap-2">
			{#if browser}
				<enhanced:img
					src={selectedLanguage.flag}
					alt={selectedLanguage.altText}
					class="h-4 w-4 shrink-0 rounded object-cover shadow-sm md:h-5 md:w-5"
				/>
			{/if}

			<p class="text-[11px] font-medium text-t-primary md:text-xs">
				{selectedLanguage.label}
			</p>
		</div>

		<ArrowIcon
			iconSvgClass={`w-5 h-5 pointer-events-none transition-transform duration-200
				text-t-muted
				${openLanguageDropdown ? 'rotate-180' : ''}`}
			iconAltText={$translationsStore.generalTexts.dropdownAriaLabel}
		/>
	</button>

	{#if openLanguageDropdown}
		<div
			class="
				animate-fadeIn absolute z-50 mt-2 min-w-36 overflow-hidden
				rounded-lg border
				border-b-default
				bg-s-default
				shadow-xl
			"
			role="listbox"
		>
			{#each languageOptions as language}
				<button
					class="
						w-full cursor-pointer text-left
						transition-colors duration-150
						{$languageStore === language.code
						? 'bg-brand-primary-light/15 hover:bg-brand-primary-light/20'
						: 'hover:bg-s-muted'}
					"
					on:click={() => selectLanguage(language.code)}
				>
					<div class="flex items-center gap-2 px-3 py-2.5">
						<enhanced:img
							src={language.flag}
							alt={language.altText}
							class="h-4 w-4 shrink-0 rounded object-cover shadow-sm md:h-5 md:w-5"
						/>

						<p class="text-[11px] font-medium text-t-primary md:text-xs">
							{language.label}
						</p>

						{#if $languageStore === language.code}
							<SelectedIcon
								iconSvgClass="ml-auto h-4 w-4 text-brand-primary"
								iconAltText="Selected Icon"
							/>
						{/if}
					</div>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.15s ease-out;
	}
</style>
