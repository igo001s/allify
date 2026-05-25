import type { UserInfoSpotify } from './SpotifyData.type';

export type UserInfo = {
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
};
