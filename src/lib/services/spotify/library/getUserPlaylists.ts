// Types
import type { PlaylistSpotify } from '$lib/types/SpotifyData.type';

export async function getUserPlaylists() {
	const MAX_CONCURRENT = 5;

	const userCache = new Map<string, string>();

	try {
		const reqUserPlaylists = await fetch('/api/spotify/user/get-playlists', {
			method: 'POST'
		});

		if (!reqUserPlaylists.ok) return undefined;

		const resUserPlaylists = await reqUserPlaylists.json();

		const playlistItems: PlaylistSpotify[] = [];

		async function processPlaylist(playlist: any) {
			try {
				const reqTracksFromPlaylist = await fetch('/api/spotify/user/musics-from-playlist', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						playlistTracksHref: playlist.tracks.href
					})
				});

				if (!reqTracksFromPlaylist.ok) return;

				const resTracksFromPlaylist: any[] = await reqTracksFromPlaylist.json();

				const tracks = await Promise.all(
					resTracksFromPlaylist
						.filter((trackItem) => trackItem.track)
						.map(async (trackItem) => {
							let idToName: string | undefined;

							try {
								const userId = trackItem.added_by?.id;

								if (userId) {
									if (userCache.has(userId)) {
										idToName = userCache.get(userId);
									} else {
										const reqIdToName = await fetch('/api/spotify/user/id-to-name', {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json'
											},
											body: JSON.stringify({
												userId
											})
										});

										if (reqIdToName.ok) {
											const resIdToName = await reqIdToName.json();

											idToName = resIdToName.display_name;

											if (idToName !== undefined) {
												userCache.set(userId, idToName);
											}
										}
									}
								}
							} catch {
								idToName = undefined;
							}

							return {
								addedAt: trackItem.added_at,
								name: trackItem.track.name,
								explicit: trackItem.track.explicit,
								artists: trackItem.track.artists.map((artist: any) => artist.name),
								durationMs: trackItem.track.duration_ms,
								addedBy: idToName,
								image: trackItem.track.album.images[0],
								trackLink: trackItem.track.external_urls.spotify
							};
						})
				);

				playlistItems.push({
					name: playlist.name,
					image: playlist.images[0],
					owner: playlist.owner.display_name,
					public: playlist.public,
					description: playlist.description,
					playlistLink: playlist.external_urls.spotify,
					tracks: {
						total: playlist.tracks.total,
						items: tracks
					}
				});
			} catch {
				return;
			}
		}

		for (let i = 0; i < resUserPlaylists.length; i += MAX_CONCURRENT) {
			const batch = resUserPlaylists.slice(i, i + MAX_CONCURRENT);

			await Promise.all(batch.map(processPlaylist));
		}

		return {
			updatedAt: new Date(),
			playlistItems
		};
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'Spotify getUserPlaylists error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return undefined;
	}
}
