// Svelte
import { dev } from '$app/environment';

// Utils
import { nextFreeUpdateTime } from '$lib/utils/nextFreeUpdateTime';

// Types
import type { TrackSpotify } from '$lib/types/Spotify.type';

export async function getMostListenedTracks(limit: number = 5) {
	const mostListenedTracksItems = {
		tracksLimit: limit,
		nextFreeUpdate: nextFreeUpdateTime(),
		fourWeeks: [] as TrackSpotify[],
		sixMonths: [] as TrackSpotify[],
		oneYear: [] as TrackSpotify[],
		uniqueTracks: [] as TrackSpotify[]
	};

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

		for (let i = 0; i < parsedResponse['long_term'].length; i++) {
			mostListenedTracksItems.oneYear.push({
				id: parsedResponse['long_term'][i].id,
				name: parsedResponse['long_term'][i].name,
				artists: parsedResponse['long_term'][i].artists.map((artist: TrackSpotify) => artist.name),
				popularity: parsedResponse['long_term'][i].popularity,
				albumName: parsedResponse['long_term'][i].album.name,
				image: parsedResponse['long_term'][i].album.images[0],
				externalLink: parsedResponse['long_term'][i].external_urls.spotify
			});
		}

		for (let i = 0; i < parsedResponse['medium_term'].length; i++) {
			mostListenedTracksItems.sixMonths.push({
				id: parsedResponse['medium_term'][i].id,
				name: parsedResponse['medium_term'][i].name,
				artists: parsedResponse['medium_term'][i].artists.map(
					(artist: TrackSpotify) => artist.name
				),
				popularity: parsedResponse['medium_term'][i].popularity,
				albumName: parsedResponse['medium_term'][i].album.name,
				image: parsedResponse['medium_term'][i].album.images[0],
				externalLink: parsedResponse['medium_term'][i].external_urls.spotify
			});
		}

		for (let i = 0; i < parsedResponse['short_term'].length; i++) {
			mostListenedTracksItems.fourWeeks.push({
				id: parsedResponse['short_term'][i].id,
				name: parsedResponse['short_term'][i].name,
				artists: parsedResponse['short_term'][i].artists.map((artist: TrackSpotify) => artist.name),
				popularity: parsedResponse['short_term'][i].popularity,
				albumName: parsedResponse['short_term'][i].album.name,
				image: parsedResponse['short_term'][i].album.images[0],
				externalLink: parsedResponse['short_term'][i].external_urls.spotify
			});
		}

		const uniqueTracks: TrackSpotify[] = [];

		for (const tracks of [
			mostListenedTracksItems.oneYear,
			mostListenedTracksItems.sixMonths,
			mostListenedTracksItems.fourWeeks
		]) {
			for (const track of tracks) {
				if (!uniqueTracks.some((uniqueTrack) => uniqueTrack.id === track.id)) {
					uniqueTracks.push(track);
				}
			}
		}

		mostListenedTracksItems.uniqueTracks = uniqueTracks;

		return mostListenedTracksItems;
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
