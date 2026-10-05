// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { Tracks } from './Tracks.type';
import type { Artists } from './Artists.type';
import type { Discoveries } from './Discoveries.type';
import type { CommentPosted, CommentReceived } from './Comments.type';
import type { UserInfoSpotify } from './Spotify.type';
import type { TrackSpotify } from './Spotify.type';
import type { ArtistSpotify } from './Spotify.type';
import type { profileVisibility } from './Visibility.type';

export type UserInfo = {
	_id: ObjectId;
	name: string;
	email: string;
	tickets: number;
	primaryStreaming: 'spotify' | 'deezer';
	image: string;
	profileVisibility: profileVisibility;
	comments: {
		commentsMadeByMe: CommentPosted[];
		commentsMadeOnMyProfile: CommentReceived[];
	};
	connectedStreamings: {
		spotify?: UserInfoSpotify;
		deezer?: undefined;
	};
	tracks?: Tracks;
	artists?: Artists;
	discoveries?: Discoveries;
	favorites?: FavoriteUser[];
	createdAt: Date;
};

export type InitialUserInfo = {
	display_name: string;
	email: string;
	image: string;
	followers: { href: string; total: number };
	external_urls: { spotify: string };
};

export type PublicUserInfo = Omit<UserInfo, 'email'>;

export type SearchUserInfo = {
	_id: ObjectId;
	name: string;
	image: string;
	spotifyConnected: boolean;
	deezerConnected: boolean;
};

export type FavoriteUser = SearchUserInfo;

export type buildProfileInfo = {
	track: TrackSpotify | undefined;
	artist: ArtistSpotify | undefined;
	profileVisibility: 'public' | 'private' | undefined;
};
