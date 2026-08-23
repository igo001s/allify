// Types
import type { TrackSpotify } from './Spotify.type';

export type Tracks = {
	trackOfTheMoment?: {
		track: TrackSpotify | undefined; // When a connection to Deezer exists, type it as TrackDeezer
		nextFreeUpdate?: Date;
	};
	customTrack?: {
		title: string;
		track: TrackSpotify | undefined; // When a connection to Deezer exists, type it as TrackDeezer
		nextFreeUpdate?: Date;
	};
	tracksWhoWereWithYou?: TrackSpotify[] | undefined; // When a connection to Deezer exists, type it as ArtistDeezer
};
