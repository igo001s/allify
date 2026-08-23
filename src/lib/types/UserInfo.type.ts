// MongoDB
import type { ObjectId } from 'mongodb';

// Types
import type { Tracks } from './Tracks.type';
import type { Artists } from './Artists.type';
import type { Discoveries } from './Discoveries.type';
import type { Comment } from './Comments.type';
import type { AvatarImage } from './Image.type';
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
	image?: AvatarImage;
	profileVisibility: profileVisibility;
	comments: Comment[];
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

export type PublicUserInfo = Omit<UserInfo, 'email'>;

export type SearchUserInfo = {
	_id: ObjectId;
	name: string;
	image: AvatarImage;
	spotifyConnected: boolean;
	deezerConnected: boolean;
};

export type FavoriteUser = SearchUserInfo;

export type buildProfileInfo = {
	track: TrackSpotify | undefined;
	artist: ArtistSpotify | undefined;
	profileVisibility: 'public' | 'private' | undefined;
};
