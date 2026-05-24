// Svelte
import { get } from 'svelte/store';

// Services
import { getMostListenedTracks } from '../spotify/stats/getMostListenedTracks';
import { useTicket } from './useTicket';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';

export async function updateLimitMostListenedTracks(
	email: string | undefined,
	tracksLimit: number
) {
	if (!email || tracksLimit === undefined) return undefined;

	const userInfoValue = get(userInfo);

	if (!userInfoValue?.email || !userInfoValue?.tickets) {
		throw new Error('User email or tickets are undefined');
	}

	try {
		const request = await fetch('/api/mongodb/update-limit-most-listened-tracks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, tracksLimit })
		});

		const response = await request.json();

		if (!response.success) return undefined;

		userInfo.update((user) => {
			if (!user?.connectedStreamings?.spotify?.mostListenedTracks) return user;
			user.connectedStreamings.spotify.mostListenedTracks.limit = response.newLimit;
			return user;
		});

		const result = await getMostListenedTracks();
		if (!result) return response;

		await fetch('/api/mongodb/update-most-listened-tracks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
				mostListenedTrackAfterNewLimit: result.mostListenedTrackItem,
				mostListenedTracksAfterNewLimit: result.mostListenedTracksItems
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
			if (!user?.connectedStreamings?.spotify?.mostListenedTracks) return user;
			user.connectedStreamings.spotify.mostListenedTracks.mostListenedTrackItem =
				result.mostListenedTrackItem;
			user.connectedStreamings.spotify.mostListenedTracks.mostListenedTracksItems =
				result.mostListenedTracksItems;
			user.connectedStreamings.spotify.mostListenedTracks.updatedAt = new Date();
			user.tickets = ticketUsed.tickets;
			return user;
		});

		return { loaded: true, success: true };
	} catch {
		return undefined;
	}
}
