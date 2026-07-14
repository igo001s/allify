// Svelte
import { dev } from '$app/environment';

// Services
import { useTicket } from '$lib/services/user/tickets/useTicket';
import { getMostListenedArtists } from '$lib/services/spotify/stats/getMostListenedArtists';

export async function updateMostListenedArtists(email: string, limit: number, tickets: number) {
	try {
		if (!email || !tickets || !limit) return;

		const responseUseTicket = await useTicket(email, tickets);

		if (!responseUseTicket) {
			throw new Error('Failed to use ticket');
		}

		const response = await getMostListenedArtists(limit + 5);

		if (!response) {
			throw new Error('Failed to get most listened artists');
		}

		const { artistsLimit, mostListenedArtistItem, mostListenedArtistsItems, updatedAt } = response;

		const updateResponse = await fetch('/api/mongodb/updates/update-most-listened-artists', {
			method: 'POST',
			body: JSON.stringify({
				email,
				limit: artistsLimit,
				mostListenedArtist: mostListenedArtistItem,
				mostListenedArtists: mostListenedArtistsItems,
				updatedAt
			})
		});

		if (!updateResponse.ok) {
			throw new Error('Failed to update most listened artists');
		}

		const updatedData = await updateResponse.json();

		return {
			...updatedData,
			tickets: responseUseTicket.tickets
		};
	} catch (error) {
		if (dev) {
			console.error(
				'User updateMostListenedArtists error:',
				error
			);
		}

		return;
	}
}
