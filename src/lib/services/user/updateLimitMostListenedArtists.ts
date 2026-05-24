// Svelte
import { get } from 'svelte/store';

// Services
import { getMostListenedArtists } from '../spotify/stats/getMostListenedArtists';
import { useTicket } from './useTicket';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';

export async function updateLimitMostListenedArtists(
	email: string | undefined,
	artistsLimit: number
) {
	if (!email || artistsLimit === undefined) return undefined;

	const userInfoValue = get(userInfo);

	if (!userInfoValue?.email || !userInfoValue?.tickets) {
		throw new Error('User email or tickets are undefined');
	}

	try {
		const request = await fetch('/api/mongodb/update-limit-most-listened-artists', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, artistsLimit })
		});

		const response = await request.json();

		if (!response.success) return undefined;

		userInfo.update((user) => {
			if (!user?.connectedStreamings?.spotify?.mostListenedArtists) return user;
			user.connectedStreamings.spotify.mostListenedArtists.limit = response.newLimit;
			return user;
		});

		const result = await getMostListenedArtists();
		if (!result) return response;

		await fetch('/api/mongodb/update-most-listened-artists', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				mostListenedArtistAfterNewLimit: result.mostListenedArtistItem,
				mostListenedArtistsAfterNewLimit: result.mostListenedArtistsItems
			})
		});

		if (!userInfoValue?.email || !userInfoValue?.tickets) {
			throw new Error('User email or tickets are undefined');
		}

		const ticketUsed = await useTicket(userInfoValue.email, userInfoValue.tickets);

		if (ticketUsed.error) {
			throw new Error('Failed to use ticket');
		}

		userInfo.update((user) => {
			if (!user?.connectedStreamings?.spotify?.mostListenedArtists) return user;
			user.connectedStreamings.spotify.mostListenedArtists.mostListenedArtistItem =
				result.mostListenedArtistItem;
			user.connectedStreamings.spotify.mostListenedArtists.mostListenedArtistsItems =
				result.mostListenedArtistsItems;
			user.connectedStreamings.spotify.mostListenedArtists.updatedAt = new Date();
			user.tickets = ticketUsed.tickets;
			return user;
		});

		return { loaded: true, success: true };
	} catch {
		return undefined;
	}
}
