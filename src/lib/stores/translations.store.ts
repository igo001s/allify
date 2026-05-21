// Svelte
import { browser } from '$app/environment';
import { derived, type Readable } from 'svelte/store';

// Stores
import { languageStore } from './language.store';

// Translations
import { en } from '../i18n/en';
import { pt } from '../i18n/pt';
import { de } from '../i18n/de';
import { es } from '../i18n/es';
import { fr } from '../i18n/fr';
import { it } from '../i18n/it';
import { ru } from '../i18n/ru';
import { zh } from '../i18n/zh';
import { ja } from '../i18n/ja';

type Translations =
	| typeof en
	| typeof pt
	| typeof de
	| typeof es
	| typeof fr
	| typeof it
	| typeof ru
	| typeof zh
	| typeof ja;

export const translationsStore: Readable<Translations> = derived(
	languageStore,
	($language) => {
		if (browser && $language) {
			localStorage.setItem('allify-language', $language);
		}

		switch ($language) {
			case 'pt-BR':
				return pt;

			case 'de-DE':
				return de;

			case 'es-ES':
				return es;

			case 'fr-FR':
				return fr;

			case 'it-IT':
				return it;

			case 'ru-RU':
				return ru;

			case 'zh-CN':
				return zh;

			case 'ja-JP':
				return ja;

			case 'en-US':
			default:
				return en;
		}
	},
	en
);
