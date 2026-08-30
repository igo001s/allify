// Svelte
import { dev } from '$app/environment';

// Types
import type { ArtistSpotify } from '$lib/types/Spotify.type';

export async function getMostListenedArtists(limit: number = 5) {
	let mostListenedArtistItem: ArtistSpotify;
	let mostListenedArtistsItems = [] as ArtistSpotify[];

	try {
		const response = await fetch(`/api/spotify/stats/most-listened-artists`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				limit
			})
		});

		if (!response.ok) return undefined;

		const parsedResponse = await response.json();

		mostListenedArtistItem = {
			id: parsedResponse[0].id,
			name: parsedResponse[0].name,
			popularity: parsedResponse[0].popularity,
			followers: parsedResponse[0].followers.total,
			genres: parsedResponse[0].genres,
			image: parsedResponse[0].images[0],
			artistLink: parsedResponse[0].external_urls.spotify
		};

		for (let i = 0; i < parsedResponse.length; i++) {
			mostListenedArtistsItems.push({
				id: parsedResponse[i].id,
				name: parsedResponse[i].name,
				popularity: parsedResponse[i].popularity,
				followers: parsedResponse[i].followers.total,
				genres: parsedResponse[i].genres,
				image: parsedResponse[i].images[0],
				artistLink: parsedResponse[i].external_urls.spotify
			});
		}

		return {
			artistsLimit: limit,
			mostListenedArtistItem,
			mostListenedArtistsItems
		};
	} catch (error) {
		if (dev) {
			console.error(
				'Spotify getMostListenedArtists error:',
				error instanceof Error ? error.message : error
			);
		}

		return undefined;
	}
}
