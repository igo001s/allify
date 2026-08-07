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
	profileVisibility: {
		visibility: 'public' | 'private';
		nextFreeUpdate?: Date;
	};
	connectedStreamings: {
		spotify?: UserInfoSpotify;
		deezer?: undefined;
	};
	tracks?: {
		trackOfTheMoment?: {
			track: TrackSpotify | undefined; // When a connection to Deezer exists, type it as TrackDeezer
			nextFreeUpdate?: Date;
		};
		customTrack?: {
			title: string;
			track: TrackSpotify | undefined; // When a connection to Deezer exists, type it as TrackDeezer
			nextFreeUpdate?: Date;
		};
	};
	artists?: {
		artistOfTheMoment?: {
			artist: ArtistSpotify | undefined; // When a connection to Deezer exists, type it as ArtistDeezer
			nextFreeUpdate?: Date;
		};
		customArtist?: {
			title: string;
			artist: ArtistSpotify | undefined; // When a connection to Deezer exists, type it as ArtistDeezer
			nextFreeUpdate?: Date;
		};
	};
	discoveries?: {
		tracks: string[];
		artists: string[];
		nextFreeUpdate?: Date;
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

export type buildProfileInfo = {
	track: TrackSpotify | undefined;
	artist: ArtistSpotify | undefined;
	profileVisibility: 'public' | 'private' | undefined;
};
