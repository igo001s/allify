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
	likedTracks:
		| {
				limit: number;
				updatedAt: Date;
				likedTracksItems: LikedTrackSpotify[];
		  }
		| undefined;
	playlists:
		| {
				updatedAt: Date;
				playlistItems: PlaylistSpotify[];
		  }
		| undefined;
	albums:
		| {
				updatedAt: Date;
				albumItems: AlbumSpotify[];
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

export type LikedTrackSpotify = {
	addedAt: string;
	name: string;
	artists: string[];
	popularity: number;
	album: {
		name: string;
		image: { url: string; height: number | null; width: number | null };
	};
	explicit: boolean;
	releaseDate: string;
	durationMs: number;
	trackLink: string;
};

export type PlaylistSpotify = {
	name: string;
	image: { url: string; height: number | null; width: number | null };
	owner: string;
	public: boolean;
	description?: string;
	playlistLink: string;
	tracks: {
		total: number;
		items:
			| {
					addedAt: string;
					name: string;
					explicit: boolean;
					artists: string[];
					durationMs: number;
					addedBy: string | undefined;
					image: { url: string; height: number | null; width: number | null };
					trackLink: string;
			  }[]
			| undefined;
	};
};

export type AlbumSpotify = {
	addedAt: string;
	name: string;
	image: { url: string; height: number | null; width: number | null };
	releaseDate: string;
	artists: string[];
	albumLink: string;
	tracks: {
		total: number;
		items: {
			name: string;
			explicit: boolean;
			artists: string[];
			durationMs: number;
			trackNumber: number;
			trackLink: string | undefined;
		}[];
	};
};
