// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { UserInfoSpotify } from './SpotifyData.type';

export type UserInfo = {
	_id: ObjectId;
	name: string;
	email: string;
	tickets: number;
	primaryStreaming: 'spotify' | 'deezer';
	connectedStreamings: {
		spotify?: UserInfoSpotify;
		deezer?: undefined;
	};
	discoveries?: {
		updatedAt: Date;
		tracks: string[];
		artists: string[];
	};
	favorites?: FavoriteUser[];
};

export type SearchUserInfo = {
	_id: ObjectId;
	name: string;
	image: {
		url: string;
		height: number | null;
		width: number | null;
	};
	spotifyConnected: boolean;
	deezerConnected: boolean;
};

export type FavoriteUser = SearchUserInfo;
