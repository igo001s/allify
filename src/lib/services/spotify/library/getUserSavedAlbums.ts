import type { AlbumSpotify } from '$lib/types/SpotifyData.type';

export async function getUserSavedAlbums() {
	let albumItems = [] as AlbumSpotify[];

	try {
		const reqUserAlbums = await fetch('/api/spotify/user/get-saved-albums');

		if (!reqUserAlbums.ok) return undefined;

		const resUserAlbums = await reqUserAlbums.json();

		for (let i = 0; i < resUserAlbums.length; i++) {
			albumItems.push({
				addedAt: resUserAlbums[i].added_at,
				name: resUserAlbums[i].album.name,
				image: resUserAlbums[i].album.images[0],
				releaseDate: resUserAlbums[i].album.release_date,
				artists: resUserAlbums[i].album.artists.map((artist: { name: string }) => artist.name),
				albumLink: resUserAlbums[i].album.external_urls.spotify,
				tracks: {
					total: resUserAlbums[i].album.total_tracks,
					items: resUserAlbums[i].album.tracks.items.map((trackItem: any) => ({
						name: trackItem.name,
						explicit: trackItem.explicit,
						artists: trackItem.artists.map((artist: { name: string }) => artist.name),
						durationMs: trackItem.duration_ms,
						trackNumber: trackItem.track_number,
						trackLink: trackItem.external_urls.spotify
					}))
				}
			});
		}

		return {
			updatedAt: new Date(),
			albumItems
		};
	} catch {
		return undefined;
	}
}
