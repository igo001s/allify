// Types
import type { UserInfoSpotify } from '$lib/types/SpotifyData.type';

// Services
import { getMostListenedArtists } from '../stats/getMostListenedArtists';
import { getMostListenedTracks } from '../stats/getMostListenedTracks';
import { getLikedTracks } from '../library/getLikedTracks';
import { getPlaylists } from '../library/getPlaylists';
import { getAlbums } from '../library/getAlbums';

export async function buildUserFromSpotify(infoFromSpotify: any) {
	try {
		const [
			mostListenedArtistsResult,
			mostListenedTracksResult,
			likedTracksResult,
			playlistsResult,
			albumsResult
		] = await Promise.allSettled([
			getMostListenedArtists(),
			getMostListenedTracks(),
			getLikedTracks(),
			getPlaylists(),
			getAlbums()
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
				mostListenedTracksResult.status === 'fulfilled'
					? mostListenedTracksResult.value
					: undefined,

			likedTracks: likedTracksResult.status === 'fulfilled' ? likedTracksResult.value : undefined,

			playlists: playlistsResult.status === 'fulfilled' ? playlistsResult.value : undefined,

			albums: albumsResult.status === 'fulfilled' ? albumsResult.value : undefined
		};

		return dataFromSpotify;
	} catch {
		return undefined;
	}
}
