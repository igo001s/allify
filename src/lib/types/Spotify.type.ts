export type UserInfoSpotify = {
	name: string;
	email: string;
	image: string;
	followers: number;
	profileLink: string;
	mostListenedArtists: ArtistsSpotify | undefined;
	mostListenedTracks: TracksSpotify | undefined;
};

export type ArtistsSpotify = {
	artistsLimit: number;
	nextFreeUpdate: Date;
	fourWeeks: ArtistSpotify[];
	sixMonths: ArtistSpotify[];
	oneYear: ArtistSpotify[];
	uniqueArtists: ArtistSpotify[];
};

export type TracksSpotify = {
	tracksLimit: number;
	nextFreeUpdate: Date;
	fourWeeks: TrackSpotify[];
	sixMonths: TrackSpotify[];
	oneYear: TrackSpotify[];
	uniqueTracks: TrackSpotify[];
};

export type ArtistSpotify = {
	id: string;
	name: string;
	popularity: number;
	followers: number;
	genres: string[];
	image: string;
	externalLink: string;
};

export type TrackSpotify = {
	id: string;
	name: string;
	artists: string[];
	popularity: number;
	albumName: string;
	image: string;
	externalLink: string;
};
