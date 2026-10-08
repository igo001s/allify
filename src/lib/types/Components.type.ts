// Svelte
import type { Component } from 'svelte';

export type CardPlatformType = {
	icon: Component;
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
