// Svelte
import { dev } from '$app/environment';

// Stores
import { userInfo } from '$lib/stores/userInfo.store';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function returnTicket(id: ObjectId, tickets: number) {
    try {
        const returnTicketResponse = await fetch('/api/mongodb/tickets/return-ticket', {
            method: 'POST',
            body: JSON.stringify({ id, tickets })
        });

        const parsedReturnTicket = await returnTicketResponse.json();

        if (!returnTicketResponse.ok) {
            throw new Error('Failed to return ticket');
        }

        userInfo.update((currentUser) => {
            if (currentUser) {
                currentUser.tickets = parsedReturnTicket.tickets;
            }
                                
            return currentUser;
        });

        return true;
    } catch (error) {
        if (dev) {
            console.error('User returnTicket error:', error);
        }

        return false;
    }
}