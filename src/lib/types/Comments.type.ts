// Types
import type { AvatarImage } from './Image.type';

// MongoDB
import type { ObjectId } from 'mongodb';

export type CommentPosted = {
	recipientId: ObjectId;
	content: string;
	createdAt: Date;
};

export type CommentReceived = {
	author: AuthorComment;
	content: string;
	createdAt: Date;
};

export type AuthorComment = {
	_id: ObjectId;
	name: string;
	image?: AvatarImage;
};
