// Svelte
import { dev } from '$app/environment';

// Utils
import { nextFreeUpdateTime } from '$lib/utils/nextFreeUpdateTime';

// Types
import type { ArtistSpotify } from '$lib/types/Spotify.type';

export async function getMostListenedArtists(limit: number = 5) {
	let mostListenedArtistsItems = {
		artistsLimit: limit,
		nextFreeUpdate: nextFreeUpdateTime(),
		fourWeeks: [] as ArtistSpotify[],
		sixMonths: [] as ArtistSpotify[],
		oneYear: [] as ArtistSpotify[]
	};

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

		for (let i = 0; i < parsedResponse['long_term'].length; i++) {
			mostListenedArtistsItems.oneYear.push({
				id: parsedResponse['long_term'][i].id,
				name: parsedResponse['long_term'][i].name,
				popularity: parsedResponse['long_term'][i].popularity,
				followers: parsedResponse['long_term'][i].followers.total,
				genres: parsedResponse['long_term'][i].genres,
				image: parsedResponse['long_term'][i].images[0],
				externalLink: parsedResponse['long_term'][i].external_urls.spotify
			});
		}

		for (let i = 0; i < parsedResponse['medium_term'].length; i++) {
			mostListenedArtistsItems.sixMonths.push({
				id: parsedResponse['long_term'][i].id,
				name: parsedResponse['long_term'][i].name,
				popularity: parsedResponse['long_term'][i].popularity,
				followers: parsedResponse['long_term'][i].followers.total,
				genres: parsedResponse['long_term'][i].genres,
				image: parsedResponse['long_term'][i].images[0],
				externalLink: parsedResponse['long_term'][i].external_urls.spotify
			});
		}

		for (let i = 0; i < parsedResponse['short_term'].length; i++) {
			mostListenedArtistsItems.fourWeeks.push({
				id: parsedResponse['long_term'][i].id,
				name: parsedResponse['long_term'][i].name,
				popularity: parsedResponse['long_term'][i].popularity,
				followers: parsedResponse['long_term'][i].followers.total,
				genres: parsedResponse['long_term'][i].genres,
				image: parsedResponse['long_term'][i].images[0],
				externalLink: parsedResponse['long_term'][i].external_urls.spotify
			});
		}

		return mostListenedArtistsItems;
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
