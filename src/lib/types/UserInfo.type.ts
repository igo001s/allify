// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { UserInfoSpotify } from './SpotifyData.type';
import type { TrackSpotify } from './SpotifyData.type';
import type { ArtistSpotify } from './SpotifyData.type';

export type UserInfo = {
	_id: ObjectId;
	name: string;
	email: string;
	image?: {
		url: string;
		height: number | null;
		width: number | null;
	};
	primaryStreaming: 'spotify' | 'deezer';
	tickets: number;
	trackOfTheMoment?: TrackSpotify | undefined; // When a connection to Deezer exists, type it as TrackDeezer
	artistOfTheMoment?: ArtistSpotify | undefined; // When a connection to Deezer exists, type it as ArtistDeezer
	profileVisibility: 'public' | 'private';
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
