export type UserInfoSpotify = {
	connected: boolean;
	name: string;
	email: string;
	image: { url: string; height: number | null; width: number | null };
	country: string;
	followers: number;
	profileLink: string;
	mostListenedArtists:
		| {
				artistsLimit: number;
				updatedAt: Date;
				mostListenedArtistItem: ArtistSpotify;
				mostListenedArtistsItems: ArtistSpotify[];
		  }
		| undefined;
	mostListenedTracks:
		| {
				tracksLimit: number;
				updatedAt: Date;
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
	image: { url: string; height: number | null; width: number | null };
	artistLink: string;
};

export type TrackSpotify = {
	id: string;
	name: string;
	artists: string[];
	popularity: number;
	albumName: string;
	image: { url: string; height: number | null; width: number | null };
	trackLink: string;
};
