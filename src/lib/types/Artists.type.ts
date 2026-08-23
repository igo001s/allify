// Types
import type { ArtistSpotify } from './Spotify.type';

export type Artists = {
	artistOfTheMoment?: {
		artist: ArtistSpotify | undefined; // When a connection to Deezer exists, type it as ArtistDeezer
		nextFreeUpdate?: Date;
	};
	customArtist?: {
		title: string;
		artist: ArtistSpotify | undefined; // When a connection to Deezer exists, type it as ArtistDeezer
		nextFreeUpdate?: Date;
	};
	artistsWhoWereWithYou?: ArtistSpotify[];
};
