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
		oneYear: [] as ArtistSpotify[],
		uniqueArtists: [] as ArtistSpotify[]
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
				id: parsedResponse['medium_term'][i].id,
				name: parsedResponse['medium_term'][i].name,
				popularity: parsedResponse['medium_term'][i].popularity,
				followers: parsedResponse['medium_term'][i].followers.total,
				genres: parsedResponse['medium_term'][i].genres,
				image: parsedResponse['medium_term'][i].images[0],
				externalLink: parsedResponse['medium_term'][i].external_urls.spotify
			});
		}

		for (let i = 0; i < parsedResponse['short_term'].length; i++) {
			mostListenedArtistsItems.fourWeeks.push({
				id: parsedResponse['short_term'][i].id,
				name: parsedResponse['short_term'][i].name,
				popularity: parsedResponse['short_term'][i].popularity,
				followers: parsedResponse['short_term'][i].followers.total,
				genres: parsedResponse['short_term'][i].genres,
				image: parsedResponse['short_term'][i].images[0],
				externalLink: parsedResponse['short_term'][i].external_urls.spotify
			});
		}

		const uniqueArtists: ArtistSpotify[] = [];

		for (const artists of [
			mostListenedArtistsItems.oneYear,
			mostListenedArtistsItems.sixMonths,
			mostListenedArtistsItems.fourWeeks
		]) {
			for (const artist of artists) {
				if (!uniqueArtists.some((uniqueTrack) => uniqueTrack.id === artist.id)) {
					uniqueArtists.push(artist);
				}
			}
		}

		mostListenedArtistsItems.uniqueArtists = uniqueArtists;

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
