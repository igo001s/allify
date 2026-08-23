// MongoDB
import type { ObjectId } from 'mongodb';

export type Comment = {
	author: {
		_id: ObjectId;
		name: string;
		image?: {
			url: string;
			height: number | null;
			width: number | null;
		};
	};
	content: string;
	createdAt: Date;
};
