// Svelte
import { browser } from '$app/environment';
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
				case 'de-DE': {
					const { de } = await import('../i18n/de');
					set(de);

					break;
				}
				case 'es-ES': {
					const { es } = await import('../i18n/es');
					set(es);

					break;
				}
				case 'fr-FR': {
					const { fr } = await import('../i18n/fr');
					set(fr);

					break;
				}
				case 'it-IT': {
					const { it } = await import('../i18n/it');
					set(it);

					break;
				}
				case 'ru-RU': {
					const { ru } = await import('../i18n/ru');
					set(ru);

					break;
				}
				case 'zh-CN': {
					const { zh } = await import('../i18n/zh');
					set(zh);

					break;
				}
				case 'ja-JP': {
					const { ja } = await import('../i18n/ja');
					set(ja);

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
