// Types
import type { AvatarImage } from "./Image.type";

export type UserInfoSpotify = {
	connected: boolean;
	name: string;
	email: string;
	image: AvatarImage;
	followers: number;
	profileLink: string;
	mostListenedArtists:
		| {
				artistsLimit: number;
				nextFreeUpdate?: Date;
				mostListenedArtistItem: ArtistSpotify;
				mostListenedArtistsItems: ArtistSpotify[];
		  }
		| undefined;
	mostListenedTracks:
		| {
				tracksLimit: number;
				nextFreeUpdate?: Date;
				mostListenedTrackItem: TrackSpotify;
				mostListenedTracksItems: TrackSpotify[];
		  }
		| undefined;
};

export type ArtistSpotify = {
	id: string;
	name: string;
	popularity: number;
	followers: number;
	genres: string[];
	image: AvatarImage;
	artistLink: string;
};

export type TrackSpotify = {
	id: string;
	name: string;
	artists: string[];
	popularity: number;
	albumName: string;
	image: AvatarImage;
	trackLink: string;
};
