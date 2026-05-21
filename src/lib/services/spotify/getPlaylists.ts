// Types
import type { PlaylistSpotify } from '$lib/types/SpotifyData.type';

export async function getPlaylists() {
	let playlistItems = [] as PlaylistSpotify[];

	try {
		const reqUserPlaylists = await fetch('/api/spotify/user-playlists');

		if (!reqUserPlaylists.ok) return undefined;

		const resUserPlaylists = await reqUserPlaylists.json();

		for (let i = 0; i < resUserPlaylists.length; i++) {
			const reqTracksFromPlaylist = await fetch('/api/spotify/musics-from-playlist', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ playlistTracksHref: resUserPlaylists[i].tracks.href })
			});

			if (!reqTracksFromPlaylist.ok) return undefined;

			const resTracksFromPlaylist: any[] = await reqTracksFromPlaylist.json();

			let idToName: string | undefined;

			try {
				const reqIdToName = await fetch('/api/spotify/user-id-to-name', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ userId: resTracksFromPlaylist[i].added_by?.id })
				});

				const resIdToName = await reqIdToName.json();

				idToName = resIdToName.display_name;
			} catch {
				idToName = undefined;
			}

			playlistItems.push({
				name: resUserPlaylists[i].name,
				image: resUserPlaylists[i].images[0],
				owner: resUserPlaylists[i].owner.display_name,
				public: resUserPlaylists[i].public,
				description: resUserPlaylists[i].description,
				playlistLink: resUserPlaylists[i].external_urls.spotify,
				tracks: {
					total: resUserPlaylists[i].tracks.total,
					items: resTracksFromPlaylist
						.filter((trackItem) => trackItem.track)
						.map((trackItem) => ({
							addedAt: trackItem.added_at,
							name: trackItem.track.name,
							explicit: trackItem.track.explicit,
							artists: trackItem.track.artists.map((artist: any) => artist.name),
							durationMs: trackItem.track.duration_ms,
							addedBy: idToName,
							image: trackItem.track.album.images[0],
							trackLink: trackItem.track.external_urls.spotify
						}))
				}
			});
		}

		return {
			updatedAt: new Date(),
			playlistItems
		};
	} catch {
		return undefined;
	}
}
