// Svelte
import { dev } from '$app/environment';

// Types
import type { TrackSpotify } from '$lib/types/Spotify.type';

export async function getMostListenedTracks(limit: number = 5) {
	let mostListenedTrackItem: TrackSpotify;
	let mostListenedTracksItems = [] as TrackSpotify[];

	try {
		const response = await fetch(`/api/spotify/stats/most-listened-tracks`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				limit
			})
		});

		if (!response.ok) return undefined;

		const parsedResponse = await response.json();

		mostListenedTrackItem = {
			id: parsedResponse[0].id,
			name: parsedResponse[0].name,
			artists: parsedResponse[0].artists.map((artist: any) => artist.name),
			popularity: parsedResponse[0].popularity,
			albumName: parsedResponse[0].album.name,
			image: parsedResponse[0].album.images[0],
			trackLink: parsedResponse[0].external_urls.spotify
		};

		for (let i = 0; i < parsedResponse.length; i++) {
			mostListenedTracksItems.push({
				id: parsedResponse[i].id,
				name: parsedResponse[i].name,
				artists: parsedResponse[i].artists.map((artist: any) => artist.name),
				popularity: parsedResponse[i].popularity,
				albumName: parsedResponse[i].album.name,
				image: parsedResponse[i].album.images[0],
				trackLink: parsedResponse[i].external_urls.spotify
			});
		}

		return {
			tracksLimit: limit,
			mostListenedTrackItem,
			mostListenedTracksItems
		};
	} catch (error) {
		if (dev) {
			console.error(
				'Spotify getMostListenedTracks error:',
				error instanceof Error ? error.message : error
			);
		}

		return undefined;
	}
}
