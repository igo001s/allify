// Types
import type { ArtistSpotify } from '$lib/types/SpotifyData.type';

export async function getMostListenedArtists(limit: number = 5) {
	let mostListenedArtistItem: ArtistSpotify;
	let mostListenedArtistsItems = [] as ArtistSpotify[];

	try {
		const reqMostListenedArtists = await fetch(`/api/spotify/stats/most-listened-artists`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				limit
			})
		});

		if (!reqMostListenedArtists.ok) return undefined;

		const resMostListenedArtists = await reqMostListenedArtists.json();

		mostListenedArtistItem = {
			id: resMostListenedArtists[0].id,
			name: resMostListenedArtists[0].name,
			popularity: resMostListenedArtists[0].popularity,
			followers: resMostListenedArtists[0].followers.total,
			genres: resMostListenedArtists[0].genres,
			image: resMostListenedArtists[0].images[0],
			artistLink: resMostListenedArtists[0].external_urls.spotify
		};

		for (let i = 0; i < resMostListenedArtists.length; i++) {
			mostListenedArtistsItems.push({
				id: resMostListenedArtists[i].id,
				name: resMostListenedArtists[i].name,
				popularity: resMostListenedArtists[i].popularity,
				followers: resMostListenedArtists[i].followers.total,
				genres: resMostListenedArtists[i].genres,
				image: resMostListenedArtists[i].images[0],
				artistLink: resMostListenedArtists[i].external_urls.spotify
			});
		}

		return {
			artistsLimit: limit,
			updatedAt: new Date(),
			mostListenedArtistItem,
			mostListenedArtistsItems
		};
	} catch (error) {
		if (import.meta.env.DEV) {
			console.error(
				'Spotify getMostListenedArtists error:',
				error instanceof Error ? error.message : String(error)
			);
		}

		return undefined;
	}
}
