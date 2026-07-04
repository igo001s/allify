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
	discoveries: {
		updatedAt: Date | undefined;
		tracks: string[];
		artists: string[];
	};
	favorites: FavoriteUser[];
	connectedStreamings: {
		spotify: UserInfoSpotify | undefined;
		deezer: undefined;
	};
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
