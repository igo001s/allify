// Utils
import {
	getSchemaInfo,
	organizationSchema,
	websiteSchema,
	webApplicationSchema
} from '$lib/utils/getSchemaInfo';

// Types
import type { PageType, Locale } from '$lib/types/Schema.type';

export function getJsonLdByPage(page: PageType, locale: Locale) {
	switch (page) {
		case 'homePage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						...webApplicationSchema,
						inLanguage: locale,
						description: schema.description[locale] ?? schema.description.en,
						featureList: schema.featureList[locale] ?? schema.featureList.en,
						offers: schema.offers.map((offer) => ({
							'@type': offer.type,
							price: offer.price,
							priceCurrency: offer.priceCurrency,
							description: offer.description[locale] ?? offer.description.en
						}))
					}
				]
			});
		}
		case 'myMusicalProfilePage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						'@type': 'ProfilePage',
						'@id': 'https://allify-sv.netlify.app/my-musical-profile/#page',
						url: 'https://allify-sv.netlify.app/my-musical-profile',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify-sv.netlify.app/#website'
						},
						about: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						}
					}
				]
			});
		}
		case 'discoveriesPage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						'@type': 'CollectionPage',
						'@id': 'https://allify-sv.netlify.app/discoveries/#page',
						url: 'https://allify-sv.netlify.app/discoveries',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify-sv.netlify.app/#website'
						},
						about: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						}
					}
				]
			});
		}
		case 'musicCommunityPage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						'@type': 'CollectionPage',
						'@id': 'https://allify-sv.netlify.app/music-community/#page',
						url: 'https://allify-sv.netlify.app/music-community',
						name: 'Music Community',
						description:
							schema.description[locale as keyof typeof schema.description] ??
							schema.description.en,
						isPartOf: {
							'@id': 'https://allify-sv.netlify.app/#website'
						},
						about: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						},
						inLanguage: locale
					}
				]
			});
		}
		case 'profilePage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						'@type': 'ProfilePage',
						'@id': 'https://allify-sv.netlify.app/profile/#page',
						url: 'https://allify-sv.netlify.app/profile',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify-sv.netlify.app/#website'
						},
						about: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						}
					}
				]
			});
		}
		case 'settingsPage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						'@type': 'WebPage',
						'@id': 'https://allify-sv.netlify.app/settings/#page',
						url: 'https://allify-sv.netlify.app/settings',
						name: 'Settings',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify-sv.netlify.app/#website'
						},
						about: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						}
					}
				]
			});
		}
		case 'dataUsagePage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						'@type': 'WebPage',
						'@id': 'https://allify-sv.netlify.app/data-usage/#page',
						url: 'https://allify-sv.netlify.app/data-usage',
						name: 'Data Usage',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify-sv.netlify.app/#website'
						},
						about: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						}
					}
				]
			});
		}
		case 'privacyPolicyPage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						'@type': 'WebPage',
						'@id': 'https://allify-sv.netlify.app/privacy-policy/#page',
						url: 'https://allify-sv.netlify.app/privacy-policy',
						name: 'Privacy Policy',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify-sv.netlify.app/#website'
						},
						about: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						}
					}
				]
			});
		}
		case 'termsOfServicePage': {
			const schema = getSchemaInfo(page);

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					organizationSchema,
					websiteSchema,
					{
						'@type': 'WebPage',
						'@id': 'https://allify-sv.netlify.app/terms-of-service/#page',
						url: 'https://allify-sv.netlify.app/terms-of-service',
						name: 'Terms of Service',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify-sv.netlify.app/#website'
						},
						about: {
							'@id': 'https://allify-sv.netlify.app/#webapplication'
						}
					}
				]
			});
		}
		default:
			throw new Error(`Unknown schema page: ${page}`);
	}
}
