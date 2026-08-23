// Svelte
import { dev } from '$app/environment';

// Types
import type { ArtistSpotify } from '$lib/types/Spotify.type';

export async function getMostListenedArtists(limit: number = 5) {
	let mostListenedArtistItem: ArtistSpotify;
	let mostListenedArtistsItems = [] as ArtistSpotify[];

	try {
		const mostListenedArtistsResponse = await fetch(`/api/spotify/stats/most-listened-artists`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				limit
			})
		});

		if (!mostListenedArtistsResponse.ok) return undefined;

		const parsedMostListenedArtists = await mostListenedArtistsResponse.json();

		mostListenedArtistItem = {
			id: parsedMostListenedArtists[0].id,
			name: parsedMostListenedArtists[0].name,
			popularity: parsedMostListenedArtists[0].popularity,
			followers: parsedMostListenedArtists[0].followers.total,
			genres: parsedMostListenedArtists[0].genres,
			image: parsedMostListenedArtists[0].images[0],
			artistLink: parsedMostListenedArtists[0].external_urls.spotify
		};

		for (let i = 0; i < parsedMostListenedArtists.length; i++) {
			mostListenedArtistsItems.push({
				id: parsedMostListenedArtists[i].id,
				name: parsedMostListenedArtists[i].name,
				popularity: parsedMostListenedArtists[i].popularity,
				followers: parsedMostListenedArtists[i].followers.total,
				genres: parsedMostListenedArtists[i].genres,
				image: parsedMostListenedArtists[i].images[0],
				artistLink: parsedMostListenedArtists[i].external_urls.spotify
			});
		}

		return {
			artistsLimit: limit,
			mostListenedArtistItem,
			mostListenedArtistsItems
		};
	} catch (error) {
		if (dev) {
			console.error('Spotify getMostListenedArtists error:', error);
		}

		return undefined;
	}
}
