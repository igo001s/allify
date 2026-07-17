// Svelte
import { dev } from '$app/environment';

// Types
import type { TrackSpotify } from '$lib/types/SpotifyData.type';

export async function getMostListenedTracks(limit: number = 5) {
	let mostListenedTrackItem: TrackSpotify;
	let mostListenedTracksItems = [] as TrackSpotify[];

	try {
		const reqMostListenedTracks = await fetch(`/api/spotify/stats/most-listened-tracks`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				limit
			})
		});

		if (!reqMostListenedTracks.ok) return undefined;

		const resMostListenedTracks = await reqMostListenedTracks.json();

		mostListenedTrackItem = {
			id: resMostListenedTracks[0].id,
			name: resMostListenedTracks[0].name,
			artists: resMostListenedTracks[0].artists.map((artist: any) => artist.name),
			popularity: resMostListenedTracks[0].popularity,
			albumName: resMostListenedTracks[0].album.name,
			image: resMostListenedTracks[0].album.images[0],
			trackLink: resMostListenedTracks[0].external_urls.spotify
		};

		for (let i = 0; i < resMostListenedTracks.length; i++) {
			mostListenedTracksItems.push({
				id: resMostListenedTracks[i].id,
				name: resMostListenedTracks[i].name,
				artists: resMostListenedTracks[i].artists.map((artist: any) => artist.name),
				popularity: resMostListenedTracks[i].popularity,
				albumName: resMostListenedTracks[i].album.name,
				image: resMostListenedTracks[i].album.images[0],
				trackLink: resMostListenedTracks[i].external_urls.spotify
			});
		}

		return {
			tracksLimit: limit,
			updatedAt: new Date(),
			mostListenedTrackItem,
			mostListenedTracksItems
		};
	} catch (error) {
		if (dev) {
			console.error('Spotify getMostListenedTracks error:', error);
		}

		return undefined;
	}
}
