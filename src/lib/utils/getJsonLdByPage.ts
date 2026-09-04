export function getJsonLdByPage(
	page: string,
	locale: string,
	name: string,
	allifyDescription: string,
	description: string,
	id?: string
): string {
	const allifyOrganizationLd = {
		'@type': 'Organization',
		'@id': 'https://allify.club/#organization',
		name: 'Allify',
		url: 'https://allify.club/',
		logo: {
			'@type': 'ImageObject',
			url: 'https://allify.club/public-logo/allify-logo.png'
		},
		description: allifyDescription
	};

	const allifyWebsiteLd = {
		'@type': 'WebSite',
		'@id': 'https://allify.club/#website',
		name: 'Allify',
		url: 'https://allify.club/',
		publisher: {
			'@id': 'https://allify.club/#organization'
		}
	};

	switch (page) {
		case 'homePage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'WebPage',
						'@id': 'https://allify.club/#webpage',
						url: 'https://allify.club/',
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'myMusicalProfilePage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'ProfilePage',
						'@id': 'https://allify.club/my-musical-profile#webpage',
						url: 'https://allify.club/my-musical-profile',
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'discoveriesPage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'WebPage',
						'@id': 'https://allify.club/discoveries#webpage',
						url: 'https://allify.club/discoveries',
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'musicCommunityPage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'WebPage',
						'@id': 'https://allify.club/music-community#webpage',
						url: 'https://allify.club/music-community',
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'musicCommunityPageUser': {
			if (!id) {
				throw new Error('ID is required for musicCommunityPageUser');
			}

			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'ProfilePage',
						'@id': `https://allify.club/music-community/${id}#webpage`,
						url: `https://allify.club/music-community/${id}`,
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'profilePage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'ProfilePage',
						'@id': `https://allify.club/profile#webpage`,
						url: `https://allify.club/profile`,
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'settingsPage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'WebPage',
						'@id': `https://allify.club/settings#webpage`,
						url: `https://allify.club/settings`,
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'paymentSuccessPage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'WebPage',
						'@id': `https://allify.club/payment-success#webpage`,
						url: `https://allify.club/payment-success`,
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'privacyPolicyPage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'WebPage',
						'@id': `https://allify.club/privacy-policy#webpage`,
						url: `https://allify.club/privacy-policy`,
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'termsOfServicePage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'WebPage',
						'@id': `https://allify.club/terms-of-service#webpage`,
						url: `https://allify.club/terms-of-service`,
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		case 'dataUsagePage': {
			return JSON.stringify({
				'@context': 'https://schema.org',
				'@graph': [
					allifyOrganizationLd,
					allifyWebsiteLd,
					{
						'@type': 'WebPage',
						'@id': `https://allify.club/data-usage#webpage`,
						url: `https://allify.club/data-usage`,
						name,
						description,
						inLanguage: locale,
						isPartOf: {
							'@id': 'https://allify.club/#website'
						}
					}
				]
			});
		}
		default:
			throw new Error(`Unknown schema page: ${page}`);
	}
}
