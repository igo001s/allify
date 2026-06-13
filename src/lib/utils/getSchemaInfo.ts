const schema = {
	homePage: {
		context: 'https://schema.org',
		type: 'WebApplication',
		name: 'Allify',
		url: 'https://allify-sv.netlify.app',
		applicationCategory: 'MusicApplication',
		applicationSubCategory: 'Music Analytics',
		operatingSystem: 'Web',
		inLanguage: ['pt-BR', 'en', 'es', 'de'],
		offers: [
			{
				type: 'Offer',
				price: '0',
				priceCurrency: 'BRL',
				description: {
					'pt-BR': 'Acesso gratuito a insights musicais básicos',
					en: 'Free access to basic music insights',
					es: 'Acceso gratuito a insights musicales básicos',
					de: 'Kostenloser Zugang zu grundlegenden Musik-Einblicken'
				}
			},
			{
				type: 'Offer',
				price: '0+',
				priceCurrency: 'BRL',
				description: {
					'pt-BR': 'Tickets para acesso a insights e funcionalidades avançadas',
					en: 'Tickets for access to advanced insights and features',
					es: 'Tickets para acceder a insights y funcionalidades avanzadas',
					de: 'Tickets für den Zugang zu erweiterten Einblicken und Funktionen'
				}
			}
		],
		featureList: {
			'pt-BR': [
				'Perfil musical personalizado',
				'Comunidade musical',
				'Descoberta de novas músicas',
				'Métricas detalhadas de streaming',
				'Rankings com amigos'
			],
			en: [
				'Personalized music profile',
				'Music community',
				'New music discovery',
				'Detailed streaming metrics',
				'Rankings with friends'
			],
			es: [
				'Perfil musical personalizado',
				'Comunidad musical',
				'Descubrimiento de nueva música',
				'Métricas detalladas de streaming',
				'Rankings con amigos'
			],
			de: [
				'Personalisiertes Musikprofil',
				'Musikgemeinschaft',
				'Entdeckung neuer Musik',
				'Detaillierte Streaming-Metriken',
				'Rankings mit Freunden'
			]
		},
		description: {
			'pt-BR':
				'Descubra insights musicais personalizados, conecte suas plataformas de streaming e explore novas formas de ouvir música com o Allify.',
			en: 'Discover personalized music insights, connect your streaming platforms and explore new ways to listen to music with Allify.',
			es: 'Descubre insights musicales personalizados, conecta tus plataformas de streaming y explora nuevas formas de escuchar música con Allify.',
			de: 'Entdecke personalisierte Musik-Einblicke, verbinde deine Streaming-Plattformen und erkunde neue Wege, Musik mit Allify zu hören.'
		},
		publisher: {
			type: 'Organization',
			name: 'Allify',
			url: 'https://allify-sv.netlify.app'
		}
	}
};

export const getSchemaInfo = (schemaName: string) => schema[schemaName as keyof typeof schema];
