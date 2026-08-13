// Svelte
import { dev } from '$app/environment';

// MongoDB
import type { ObjectId } from 'mongodb';

export async function returnTicket(id: ObjectId, tickets: number) {
    try {
        const response = await fetch('/api/mongodb/tickets/return-ticket', {
            method: 'POST',
            body: JSON.stringify({ id, tickets })
        });

        return response.json();
    } catch (error) {
        if (dev) {
            console.error('User returnTicket error:', error);
        }

        return false;
    }
}