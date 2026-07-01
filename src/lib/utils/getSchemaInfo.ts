const schema = {
	homePage: {
		context: 'https://schema.org',
		type: 'WebApplication',
		name: 'Allify',
		url: 'https://allify-sv.netlify.app',
		applicationCategory: 'MusicApplication',
		applicationSubCategory: 'Music Analytics',
		operatingSystem: 'Web',
		inLanguage: ['pt-BR', 'en', 'es', 'de', 'fr', 'it', 'ja', 'ru', 'zh'],
		offers: [
			{
				type: 'Offer',
				price: '0',
				priceCurrency: 'BRL',
				description: {
					'pt-BR': 'Acesso gratuito a insights musicais básicos',
					en: 'Free access to basic music insights',
					es: 'Acceso gratuito a insights musicales básicos',
					de: 'Kostenloser Zugang zu grundlegenden Musik-Einblicken',
					fr: 'Accès gratuit aux analyses musicales de base',
					it: 'Accesso gratuito alle analisi musicali di base',
					ja: '基本的な音楽インサイトを無料で利用できます',
					ru: 'Бесплатный доступ к базовой музыкальной аналитике',
					zh: '免费访问基础音乐分析'
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
					de: 'Tickets für den Zugang zu erweiterten Einblicken und Funktionen',
					fr: "Tickets pour accéder à des analyses et fonctionnalités avancées",
					it: 'Ticket per accedere ad analisi e funzionalità avanzate',
					ja: '高度なインサイトと機能にアクセスするためのチケット',
					ru: 'Билеты для доступа к расширенной аналитике и функциям',
					zh: '用于访问高级分析和功能的门票'
				}
			}
		],
		featureList: {
			'pt-BR': [
				'Perfil musical personalizado',
				'Comunidade musical',
				'Descoberta de novas músicas',
				'Métricas detalhadas de streaming',
				'Recomendações personalizadas'
			],
			en: [
				'Personalized music profile',
				'Music community',
				'New music discovery',
				'Detailed streaming metrics',
				'Personalized recommendations'
			],
			es: [
				'Perfil musical personalizado',
				'Comunidad musical',
				'Descubrimiento de nueva música',
				'Métricas detalladas de streaming',
				'Recomendaciones personalizadas'
			],
			de: [
				'Personalisiertes Musikprofil',
				'Musikgemeinschaft',
				'Entdeckung neuer Musik',
				'Detaillierte Streaming-Metriken',
				'Personalisierte Empfehlungen'
			],
			fr: [
				'Profil musical personnalisé',
				'Communauté musicale',
				'Découverte de nouvelles musiques',
				'Statistiques détaillées de streaming',
				'Recommandations personnalisées'
			],
			it: [
				'Profilo musicale personalizzato',
				'Community musicale',
				'Scoperta di nuova musica',
				'Metriche dettagliate di streaming',
				'Consigli personalizzati'
			],
			ja: [
				'パーソナライズされた音楽プロフィール',
				'音楽コミュニティ',
				'新しい音楽の発見',
				'詳細なストリーミング分析',
				'パーソナライズされたおすすめ'
			],
			ru: [
				'Персональный музыкальный профиль',
				'Музыкальное сообщество',
				'Поиск новой музыки',
				'Подробная статистика стриминга',
				'Персональные рекомендации'
			],
			zh: [
				'个性化音乐资料',
				'音乐社区',
				'发现新音乐',
				'详细的流媒体数据',
				'个性化推荐'
			]
		},
		description: {
			'pt-BR':
				'Descubra insights musicais personalizados, conecte suas plataformas de streaming e explore novas formas de ouvir música com o Allify.',
			en: 'Discover personalized music insights, connect your streaming platforms and explore new ways to listen to music with Allify.',
			es: 'Descubre insights musicales personalizados, conecta tus plataformas de streaming y explora nuevas formas de escuchar música con Allify.',
			de: 'Entdecke personalisierte Musik-Einblicke, verbinde deine Streaming-Plattformen und erkunde neue Wege, Musik mit Allify zu hören.',
			fr: 'Découvrez des analyses musicales personnalisées, connectez vos plateformes de streaming et explorez de nouvelles façons d’écouter de la musique avec Allify.',
			it: 'Scopri analisi musicali personalizzate, collega le tue piattaforme di streaming ed esplora nuovi modi di ascoltare musica con Allify.',
			ja: 'パーソナライズされた音楽インサイトを発見し、ストリーミングサービスを接続して、Allifyで新しい音楽体験を楽しみましょう。',
			ru: 'Получайте персонализированную музыкальную аналитику, подключайте свои стриминговые платформы и открывайте новые способы наслаждаться музыкой с Allify.',
			zh: '发现个性化音乐分析，连接您的流媒体平台，并通过 Allify 探索全新的音乐体验。'
		},
		publisher: {
			type: 'Organization',
			name: 'Allify',
			url: 'https://allify-sv.netlify.app'
		}
	}
};

export const getSchemaInfo = (schemaName: string) =>
	schema[schemaName as keyof typeof schema];
