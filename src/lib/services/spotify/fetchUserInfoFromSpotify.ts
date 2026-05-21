// Types
import type { UserInfoSpotify } from '$lib/types/SpotifyData.type';

// Services
import { getMostListenedArtists } from './getMostListenedArtists';
import { getMostListenedTracks } from './getMostListenedTracks';
import { getLikedTracks } from './getLikedTracks';
import { getPlaylists } from './getPlaylists';
import { getAlbums } from './getAlbums';

export async function userInfoFromSpotify() {
	let dataFromSpotify: UserInfoSpotify | undefined;

	try {
		const response = await fetch('/api/spotify/me', {
			credentials: 'include'
		});

		const data = await response.json();

		if (data.error) {
			return undefined;
		}

		dataFromSpotify = {
			connected: true,
			name: data.display_name,
			email: data.email,
			image: data.images[0],
			country: data.country,
			followers: data.followers.total,
			profileLink: data.external_urls.spotify,
			mostListenedArtists: undefined,
			mostListenedTracks: undefined,
			likedTracks: undefined,
			playlists: undefined,
			albums: undefined
		};

		try {
			const mostListenedArtists = await getMostListenedArtists();

			dataFromSpotify.mostListenedArtists = mostListenedArtists;
		} catch {
			dataFromSpotify.mostListenedArtists = undefined;
		}

		try {
			const mostListenedTracks = await getMostListenedTracks();

			dataFromSpotify.mostListenedTracks = mostListenedTracks;
		} catch {
			dataFromSpotify.mostListenedTracks = undefined;
		}

		try {
			const likedTracks = await getLikedTracks();

			dataFromSpotify.likedTracks = likedTracks;
		} catch {
			dataFromSpotify.likedTracks = undefined;
		}

		try {
			const playlists = await getPlaylists();

			dataFromSpotify.playlists = playlists;
		} catch {
			dataFromSpotify.playlists = undefined;
		}

		try {
			const albums = await getAlbums();

			dataFromSpotify.albums = albums;
		} catch {
			dataFromSpotify.albums = undefined;
		}

		return dataFromSpotify;
	} catch {
		return undefined;
	}
}
