<script lang="ts">
	// Svelte
	import { onMount } from 'svelte';

	// Props
	export let logoSvgClass = '';
	export let logoAltText = '';

	function resolveSeasonalDecoration(): string | null {
		const today = new Date();
		const month = today.getMonth() + 1;
		const day = today.getDate();

		if ((month === 12 && day >= 27) || (month === 1 && day <= 5)) return 'new-year';
		if (month === 12 && day >= 1 && day <= 26) return 'christmas-hat';
		if (month === 10 && day >= 25) return 'halloween';
		if (month === 6) return 'junina-hat';
		if ((month === 3 && day >= 20) || (month === 4 && day <= 10)) return 'easter';
		if ((month === 2 && day >= 10) || (month === 3 && day <= 5)) return 'carnival';
		return null;
	}

	const seasonalDecoration = resolveSeasonalDecoration();

	let SeasonalComponent: any = null;

	const decorationMap: Record<string, () => Promise<any>> = {
		'christmas-hat': () => import('./seasonal-decorations/ChristmasHatGroup.svelte'),
		'new-year': () => import('./seasonal-decorations/NewYearGroup.svelte'),
		'junina-hat': () => import('./seasonal-decorations/JuninaHatGroup.svelte'),
		easter: () => import('./seasonal-decorations/BunnyEasterGroup.svelte'),
		halloween: () => import('./seasonal-decorations/HalloweenHatGroup.svelte'),
		carnival: () => import('./seasonal-decorations/CarnivalMaskGroup.svelte')
	};

	const transformMap: Record<string, string> = {
		'christmas-hat': 'scale(0.30) translate(910, 10)',
		'new-year': 'scale(0.20) translate(1300, -50)',
		'junina-hat': 'scale(0.30) translate(940, -29) rotate(25)',
		easter: 'scale(0.32) translate(880, 80)',
		halloween: 'scale(0.15) translate(2010, -110) rotate(35)',
		carnival: 'scale(0.30) translate(940, -29) rotate(25)'
	};

	onMount(async () => {
		if (seasonalDecoration && decorationMap[seasonalDecoration]) {
			const module = await decorationMap[seasonalDecoration]();
			SeasonalComponent = module.default;
		}
	});

	$: transformGroup = seasonalDecoration ? transformMap[seasonalDecoration] : '';
</script>

<a href="/" aria-label={logoAltText} title={logoAltText}>
	<svg viewBox="0 0 380 142" preserveAspectRatio="xMidYMid meet" class={logoSvgClass} role="img">
		<title>{logoAltText}</title>

		<g
			transform="translate(0.000000,132.000000) scale(0.100000,-0.100000)"
			fill="#09623A"
			stroke="none"
		>
			<path
				d="M2207 1300 c-50 -16 -95 -58 -123 -116 -24 -50 -28 -72 -32 -171 l-5
-113 -38 0 -39 0 0 -75 0 -75 40 0 40 0 0 -215 0 -215 95 0 95 0 2 213 3 212
67 3 67 3 3 39 c3 37 8 30 121 -171 l117 -209 -56 -108 c-31 -59 -76 -144
-100 -190 l-44 -82 114 0 113 0 183 353 c101 193 203 389 227 435 l45 82 -114
0 -114 0 -69 -151 c-57 -124 -70 -147 -79 -132 -6 10 -42 77 -82 148 l-71 130
-164 5 -164 5 2 93 c2 51 7 102 13 112 14 25 48 34 83 21 26 -10 28 -9 62 59
l35 70 -40 20 c-46 23 -150 34 -193 20z"
				fill="#4CBF87"
			/>

			<path d="M1000 805 l0 -485 100 0 100 0 0 485 0 485 -100 0 -100 0 0 -485z" />

			<path d="M1340 805 l0 -485 95 0 95 0 0 485 0 485 -95 0 -95 0 0 -485z" />

			<path
				d="M1718 1244 c-35 -18 -58 -62 -58 -110 0 -28 8 -44 34 -70 29 -29 41
-34 81 -34 40 0 52 5 81 34 26 26 34 42 34 70 0 95 -92 154 -172 110z"
			/>

			<path
				d="M205 803 c-99 -246 -183 -455 -187 -465 -7 -17 1 -18 106 -18 l113 0
34 93 34 92 180 3 181 2 34 -95 34 -95 113 0 113 0 -18 43 c-9 24 -93 234
-187 465 l-170 422 -100 0 -100 0 -180 -447z m334 32 c28 -72 51 -133 51 -137
0 -5 -48 -8 -106 -8 -81 0 -105 3 -102 13 42 112 102 266 104 264 1 -1 25 -61
53 -132z"
			/>

			<path d="M1670 610 l0 -290 100 0 100 0 0 290 0 290 -100 0 -100 0 0 -290z" />
		</g>

		{#if SeasonalComponent}
			<svelte:component this={SeasonalComponent} {transformGroup} />
		{/if}
	</svg>
</a>
