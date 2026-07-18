export const organizationSchema = {
	'@type': 'Organization',
	'@id': 'https://allify-sv.netlify.app/#organization',
	name: 'Allify',
	url: 'https://allify-sv.netlify.app/',
	logo: {
		'@type': 'ImageObject',
		url: 'https://allify-sv.netlify.app/public-logo/allify-logo.png'
	},
	description:
		'Music profile and analytics platform that helps users understand and share their music taste.'
};

export const websiteSchema = {
	'@type': 'WebSite',
	'@id': 'https://allify-sv.netlify.app/#website',
	url: 'https://allify-sv.netlify.app/',
	name: 'Allify',
	description: 'Music profile and analytics platform.',
	inLanguage: ['pt-BR', 'en', 'es', 'de', 'fr', 'it', 'ja', 'ru', 'zh'],
	publisher: {
		'@id': 'https://allify-sv.netlify.app/#organization'
	}
};

export const webApplicationSchema = {
	'@type': 'WebApplication',
	'@id': 'https://allify-sv.netlify.app/#webapplication',
	name: 'Allify',
	url: 'https://allify-sv.netlify.app/',
	applicationCategory: 'MusicApplication',
	operatingSystem: 'Web',
	description:
		'Connect your music streaming accounts, explore your listening habits, discover new music and customize your public profile.',
	inLanguage: ['pt-BR', 'en', 'es', 'de', 'fr', 'it', 'ja', 'ru', 'zh'],
	featureList: [
		'Personalized music profile',
		'Music community',
		'Music recommendations',
		'Listening analytics',
		'Streaming insights'
	],
	offers: {
		'@type': 'Offer',
		price: '0',
		priceCurrency: 'BRL',
		availability: 'https://schema.org/InStock'
	},
	publisher: {
		'@id': 'https://allify-sv.netlify.app/#organization'
	}
};

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
					fr: 'Tickets pour accéder à des analyses et fonctionnalités avancées',
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
			zh: ['个性化音乐资料', '音乐社区', '发现新音乐', '详细的流媒体数据', '个性化推荐']
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
	},
	myMusicalProfilePage: {
		description: {
			'pt-BR':
				'Explore seu perfil musical personalizado com estatísticas, artistas mais ouvidos, músicas favoritas e insights baseados no seu histórico de streaming.',
			en: 'Explore your personalized music profile with listening statistics, top artists, favorite tracks and insights based on your streaming history.',
			es: 'Explora tu perfil musical personalizado con estadísticas, artistas favoritos y canciones más escuchadas.',
			de: 'Entdecke dein personalisiertes Musikprofil mit Statistiken, Lieblingskünstlern und Hörgewohnheiten.',
			fr: 'Découvrez votre profil musical personnalisé avec vos statistiques d’écoute et vos artistes préférés.',
			it: 'Esplora il tuo profilo musicale personalizzato con statistiche e artisti preferiti.',
			ja: 'お気に入りのアーティストや楽曲、再生統計を確認できるパーソナライズされた音楽プロフィールです。',
			ru: 'Изучайте свой персональный музыкальный профиль со статистикой прослушивания.',
			zh: '探索您的个性化音乐资料，包括播放统计、热门艺术家和歌曲。'
		}
	},
	discoveriesPage: {
		description: {
			'pt-BR':
				'Descubra novas músicas e artistas com recomendações personalizadas baseadas no seu histórico de streaming e nas suas preferências musicais.',
			en: 'Discover new songs and artists with personalized recommendations based on your streaming history and listening habits.',
			es: 'Descubre nuevas canciones y artistas con recomendaciones personalizadas basadas en tu historial de reproducción.',
			de: 'Entdecke neue Songs und Künstler mit personalisierten Empfehlungen basierend auf deinem Streamingverlauf.',
			fr: 'Découvrez de nouvelles musiques et artistes grâce à des recommandations personnalisées basées sur votre historique d’écoute.',
			it: 'Scopri nuovi brani e artisti con consigli personalizzati basati sulla tua cronologia di ascolto.',
			ja: '視聴履歴に基づいたパーソナライズされたおすすめで、新しい楽曲やアーティストを見つけましょう。',
			ru: 'Открывайте новые песни и исполнителей благодаря персонализированным рекомендациям.',
			zh: '根据您的播放历史获取个性化推荐，发现新的歌曲和艺术家。'
		}
	},
	musicCommunityPage: {
		description: {
			'pt-BR':
				'Descubra pessoas com gostos musicais semelhantes, explore perfis públicos e conecte-se com a comunidade musical do Allify.',
			en: 'Discover people with similar music tastes, explore public profiles and connect with the Allify music community.',
			es: 'Descubre personas con gustos musicales similares, explora perfiles públicos y conéctate con la comunidad musical de Allify.',
			de: 'Entdecke Menschen mit ähnlichem Musikgeschmack, erkunde öffentliche Profile und verbinde dich mit der Musik-Community von Allify.',
			fr: 'Découvrez des personnes ayant des goûts musicaux similaires, explorez des profils publics et rejoignez la communauté musicale d’Allify.',
			it: 'Scopri persone con gusti musicali simili, esplora profili pubblici e unisciti alla community musicale di Allify.',
			ja: '似た音楽の好みを持つ人を見つけ、公開プロフィールを探索し、Allify の音楽コミュニティとつながりましょう。',
			ru: 'Находите людей с похожими музыкальными вкусами, изучайте публичные профили и присоединяйтесь к музыкальному сообществу Allify.',
			zh: '发现拥有相似音乐品味的人，浏览公开个人主页，并加入 Allify 音乐社区。'
		}
	},
	profilePage: {
		description: {
			'pt-BR':
				'Gerencie seu perfil público, destaque suas músicas e artistas favoritos e personalize como você aparece na comunidade do Allify.',
			en: 'Manage your public profile, highlight your favorite songs and artists, and customize how you appear in the Allify community.',
			es: 'Administra tu perfil público, destaca tus canciones y artistas favoritos y personaliza cómo apareces en la comunidad de Allify.',
			de: 'Verwalte dein öffentliches Profil, präsentiere deine Lieblingssongs und -künstler und passe an, wie du in der Allify-Community erscheinst.',
			fr: 'Gérez votre profil public, mettez en avant vos chansons et artistes préférés et personnalisez votre présence dans la communauté Allify.',
			it: 'Gestisci il tuo profilo pubblico, metti in evidenza i tuoi brani e artisti preferiti e personalizza la tua presenza nella community di Allify.',
			ja: '公開プロフィールを管理し、お気に入りの楽曲やアーティストを紹介して、Allify コミュニティでの表示をカスタマイズしましょう。',
			ru: 'Управляйте своим публичным профилем, показывайте любимые песни и исполнителей и настраивайте свое присутствие в сообществе Allify.',
			zh: '管理您的公开个人主页，展示您最喜欢的歌曲和艺术家，并自定义您在 Allify 社区中的展示方式。'
		}
	},
	settingsPage: {
		description: {
			'pt-BR':
				'Gerencie suas configurações, conecte plataformas de streaming e personalize sua experiência no Allify.',
			en: 'Manage your settings, connect streaming platforms and personalize your Allify experience.',
			es: 'Administra tu configuración, conecta plataformas de streaming y personaliza tu experiencia en Allify.',
			de: 'Verwalte deine Einstellungen, verbinde Streaming-Plattformen und personalisiere dein Allify-Erlebnis.',
			fr: 'Gérez vos paramètres, connectez vos plateformes de streaming et personnalisez votre expérience Allify.',
			it: 'Gestisci le impostazioni, collega le piattaforme di streaming e personalizza la tua esperienza su Allify.',
			ja: '設定を管理し、ストリーミングサービスを接続して、Allify の利用体験をカスタマイズしましょう。',
			ru: 'Управляйте настройками, подключайте стриминговые платформы и персонализируйте работу с Allify.',
			zh: '管理您的设置，连接流媒体平台，并个性化您的 Allify 使用体验。'
		}
	},
	dataUsagePage: {
		description: {
			'pt-BR':
				'Saiba como o Allify utiliza seus dados, quais informações são processadas e como elas contribuem para melhorar sua experiência na plataforma.',
			en: 'Learn how Allify uses your data, what information is processed and how it helps improve your experience on the platform.',
			es: 'Descubre cómo Allify utiliza tus datos, qué información se procesa y cómo ayuda a mejorar tu experiencia en la plataforma.',
			de: 'Erfahre, wie Allify deine Daten verwendet, welche Informationen verarbeitet werden und wie sie dein Nutzungserlebnis verbessern.',
			fr: 'Découvrez comment Allify utilise vos données, quelles informations sont traitées et comment elles améliorent votre expérience sur la plateforme.',
			it: 'Scopri come Allify utilizza i tuoi dati, quali informazioni vengono elaborate e come migliorano la tua esperienza sulla piattaforma.',
			ja: 'Allify がどのようにデータを利用し、どの情報を処理して、サービス体験の向上に役立てているかをご確認ください。',
			ru: 'Узнайте, как Allify использует ваши данные, какая информация обрабатывается и как это помогает улучшить работу платформы.',
			zh: '了解 Allify 如何使用您的数据、处理哪些信息，以及这些信息如何帮助改善您的使用体验。'
		}
	},
	privacyPolicyPage: {
		description: {
			'pt-BR':
				'Leia a Política de Privacidade do Allify para entender como coletamos, utilizamos, armazenamos e protegemos seus dados pessoais.',
			en: 'Read the Allify Privacy Policy to understand how we collect, use, store and protect your personal data.',
			es: 'Lee la Política de Privacidad de Allify para comprender cómo recopilamos, utilizamos, almacenamos y protegemos tus datos personales.',
			de: 'Lies die Datenschutzrichtlinie von Allify, um zu erfahren, wie wir deine personenbezogenen Daten erfassen, verwenden, speichern und schützen.',
			fr: 'Consultez la Politique de confidentialité d’Allify pour comprendre comment nous collectons, utilisons, stockons et protégeons vos données personnelles.',
			it: 'Leggi l’Informativa sulla privacy di Allify per capire come raccogliamo, utilizziamo, conserviamo e proteggiamo i tuoi dati personali.',
			ja: 'Allify のプライバシーポリシーを確認し、個人情報の収集・利用・保管・保護方法についてご確認ください。',
			ru: 'Ознакомьтесь с Политикой конфиденциальности Allify, чтобы узнать, как мы собираем, используем, храним и защищаем ваши персональные данные.',
			zh: '阅读 Allify 隐私政策，了解我们如何收集、使用、存储和保护您的个人数据。'
		}
	},
	termsOfServicePage: {
		description: {
			'pt-BR':
				'Leia os Termos de Serviço do Allify para entender as regras, direitos e responsabilidades ao utilizar a plataforma.',
			en: 'Read the Allify Terms of Service to understand the rules, rights and responsibilities when using the platform.',
			es: 'Lee los Términos de Servicio de Allify para comprender las normas, derechos y responsabilidades al utilizar la plataforma.',
			de: 'Lies die Nutzungsbedingungen von Allify, um die Regeln, Rechte und Pflichten bei der Nutzung der Plattform zu verstehen.',
			fr: 'Consultez les Conditions d’utilisation d’Allify pour comprendre les règles, droits et responsabilités liés à l’utilisation de la plateforme.',
			it: 'Leggi i Termini di servizio di Allify per comprendere regole, diritti e responsabilità nell’utilizzo della piattaforma.',
			ja: 'Allify の利用規約を読み、サービス利用時のルール、権利、および責任についてご確認ください。',
			ru: 'Ознакомьтесь с Условиями использования Allify, чтобы понять правила, права и обязанности при использовании платформы.',
			zh: '阅读 Allify 服务条款，了解使用平台时的规则、权利和责任。'
		}
	}
};

export function getSchemaInfo<T extends keyof typeof schema>(schemaName: T) {
	return schema[schemaName];
}

export function getPublicUserJsonLd(
	userId: string,
	userName: string,
	description: string,
	locale: string
) {
	return JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			organizationSchema,
			websiteSchema,
			{
				'@type': 'ProfilePage',
				'@id': `https://allify-sv.netlify.app/music-community/${userId}/#page`,
				url: `https://allify-sv.netlify.app/music-community/${userId}`,
				name: `${userName} - Music Profile`,
				description,
				inLanguage: locale,
				isPartOf: {
					'@id': 'https://allify-sv.netlify.app/#website'
				},
				mainEntity: {
					'@type': 'Person',
					'@id': `https://allify-sv.netlify.app/music-community/${userId}/#person`,
					name: userName,
					url: `https://allify-sv.netlify.app/music-community/${userId}`
				},
				about: {
					'@id': 'https://allify-sv.netlify.app/#webapplication'
				}
			}
		]
	});
}
