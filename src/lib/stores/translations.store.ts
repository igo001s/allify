// Svelte
import { browser } from '$app/env';
import { derived, type Readable } from 'svelte/store';

// Stores
import { languageStore } from './language.store';

// Translations
import { en } from '../i18n/en';

export const translationsStore: Readable<typeof en> = derived(
	languageStore,
	($language, set) => {
		if (browser && $language) {
			localStorage.setItem('allify-language', $language);
		}

		const loadTranslations = async () => {
			switch ($language) {
				case 'pt-BR': {
					const { pt } = await import('../i18n/pt');
					set(pt);

					break;
				}
				case 'es-ES': {
					const { es } = await import('../i18n/es');
					set(es);

					break;
				}
				case 'en-US':
				default: {
					set(en);
				}
			}
		};

		void loadTranslations();
	},
	en
);
