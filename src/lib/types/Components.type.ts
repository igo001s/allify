// Svelte
import type { SvelteComponent } from 'svelte';

export type CardPlatformType = {
	icon: typeof SvelteComponent;
	title: string;
	description: string;
	href: string;
};

export type FooterColumnItems = {
	title: string;
	items:
		| {
				text: string;
				href:
					| '/my-musical-profile'
					| '/music-archive'
					| '/music-community'
					| '/privacy-policy'
					| '/terms-of-service'
					| '/data-usage';
		  }[]
		| { image: unknown; href: string; ariaLabel: string }[];
};
