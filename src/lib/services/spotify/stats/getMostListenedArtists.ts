// Svelte
import { get } from 'svelte/store';

// Stores
import { translationsStore } from '$lib/stores/translations.store';
import { userInfo } from '$lib/stores/userInfo.store';

// Types
import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

export async function getMostListenedArtists() {
	const getTranslationStore = get(translationsStore);
	const userInfoStore = get(userInfo);

	let mostListenedArtistItem: ArtistSpotify;
	let mostListenedArtistsItems = [] as ArtistSpotify[];

	try {
		const reqMostListenedArtists = await fetch(`/api/spotify/stats/most-listened-artists`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				locale: getTranslationStore.locale,
				artistsLimit: userInfoStore?.connectedStreamings?.spotify?.mostListenedArtists?.limit
					? userInfoStore?.connectedStreamings?.spotify?.mostListenedArtists?.limit
					: 5
			})
		});

		if (!reqMostListenedArtists.ok) return undefined;

		const resMostListenedArtists = await reqMostListenedArtists.json();

		mostListenedArtistItem = {
			id: resMostListenedArtists[0].id,
			name: resMostListenedArtists[0].name,
			popularity: resMostListenedArtists[0].popularity,
			followers: resMostListenedArtists[0].followers.total,
			genres: resMostListenedArtists[0].genres,
			image: resMostListenedArtists[0].images[0],
			artistLink: resMostListenedArtists[0].external_urls.spotify
		};

		for (let i = 0; i < resMostListenedArtists.length; i++) {
			mostListenedArtistsItems.push({
				id: resMostListenedArtists[i].id,
				name: resMostListenedArtists[i].name,
				popularity: resMostListenedArtists[i].popularity,
				followers: resMostListenedArtists[i].followers.total,
				genres: resMostListenedArtists[i].genres,
				image: resMostListenedArtists[i].images[0],
				artistLink: resMostListenedArtists[i].external_urls.spotify
			});
		}

		return {
			limit: userInfoStore?.connectedStreamings?.spotify?.mostListenedArtists?.limit
				? userInfoStore?.connectedStreamings?.spotify?.mostListenedArtists?.limit
				: 5,
			updatedAt: new Date(),
			mostListenedArtistItem,
			mostListenedArtistsItems
		};
	} catch {
		return undefined;
	}
}
