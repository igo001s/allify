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
						'@type': 'WebPage',
						'@id': 'https://allify.club/#webpage',
						url: 'https://allify.club/',
						name: 'Allify',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify.club/#webapplication'
						}
					},
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
						'@id': 'https://allify.club/my-musical-profile/#page',
						url: 'https://allify.club/my-musical-profile',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify.club/#webapplication'
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
						'@id': 'https://allify.club/discoveries/#page',
						url: 'https://allify.club/discoveries',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify.club/#webapplication'
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
						'@id': 'https://allify.club/music-community/#page',
						url: 'https://allify.club/music-community',
						name: 'Music Community',
						description:
							schema.description[locale as keyof typeof schema.description] ??
							schema.description.en,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
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
						'@id': 'https://allify.club/profile/#page',
						url: 'https://allify.club/profile',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify.club/#webapplication'
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
						'@id': 'https://allify.club/settings/#page',
						url: 'https://allify.club/settings',
						name: 'Settings',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
						},
						mainEntity: {
							'@id': 'https://allify.club/#webapplication'
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
						'@id': 'https://allify.club/data-usage/#page',
						url: 'https://allify.club/data-usage',
						name: 'Data Usage',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
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
						'@id': 'https://allify.club/privacy-policy/#page',
						url: 'https://allify.club/privacy-policy',
						name: 'Privacy Policy',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
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
						'@id': 'https://allify.club/terms-of-service/#page',
						url: 'https://allify.club/terms-of-service',
						name: 'Terms of Service',
						description: schema.description[locale] ?? schema.description.en,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						},
						about: {
							'@id': 'https://allify.club/#webapplication'
						}
					}
				]
			});
		}
		default:
			throw new Error(`Unknown schema page: ${page}`);
	}
}
