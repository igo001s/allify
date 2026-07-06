// Types
import type { UserInfoSpotify } from '$lib/types/SpotifyData.type';

// Services
import { getMostListenedArtists } from '../stats/getMostListenedArtists';
import { getMostListenedTracks } from '../stats/getMostListenedTracks';

export async function buildUserFromSpotify(infoFromSpotify: any) {
	try {
		const [mostListenedArtistsResult, mostListenedTracksResult] = await Promise.allSettled([
			getMostListenedArtists(),
			getMostListenedTracks()
		]);

		const dataFromSpotify: UserInfoSpotify = {
			connected: true,
			name: infoFromSpotify.display_name,
			email: infoFromSpotify.email,
			image: infoFromSpotify.images?.[0],
			country: infoFromSpotify.country,
			followers: infoFromSpotify.followers.total,
			profileLink: infoFromSpotify.external_urls.spotify,
			mostListenedArtists:
				mostListenedArtistsResult.status === 'fulfilled'
					? mostListenedArtistsResult.value
					: undefined,
			mostListenedTracks:
				mostListenedTracksResult.status === 'fulfilled' ? mostListenedTracksResult.value : undefined
		};

		return dataFromSpotify;
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'Spotify buildUserFromSpotify error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return undefined;
	}
}
