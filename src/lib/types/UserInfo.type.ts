import type { UserInfoSpotify } from './SpotifyData.type';

export type UserInfo = {
	name: string;
	email: string;
	tickets: number;
	primaryStreaming: 'spotify' | 'deezer';
	discoveries: {
		updatedAt: Date | undefined;
		tracks: string[];
		artists: string[];
	};
	connectedStreamings: {
		spotify: UserInfoSpotify | undefined;
		deezer: undefined;
	};
	favorites: {
		name: string;
		userImage: string;
	}[];
};

export type SearchUserInfo = {
	id: string;
	name: string;
	image: { url: string; height: number | null; width: number | null };
	primaryStreaming: 'spotify' | 'deezer';
};
