// Environment variables
import { ALLIFY_URL } from '$env/static/private';

export const GET = () => {
	const content = `# Allify

	> Canonical: ${ALLIFY_URL}

	## Overview

	Allify is a music profile and analytics platform that allows users to connect their music streaming accounts and create a personalized profile based on their listening history.

	Users can analyze their music taste, discover new artists and tracks, customize their public profile, and connect with a community of music lovers.

	## Main Pages

	- [Homepage](${ALLIFY_URL}/)
	- [My Musical Profile](${ALLIFY_URL}/my-musical-profile)
	- [Discoveries](${ALLIFY_URL}/discoveries)
	- [Music Community](${ALLIFY_URL}/music-community)
	- [Profile](${ALLIFY_URL}/profile)
	- [Settings](${ALLIFY_URL}/settings)
	- [Privacy Policy](${ALLIFY_URL}/privacy-policy)
	- [Terms of Service](${ALLIFY_URL}/terms-of-service)
	- [Data Usage](${ALLIFY_URL}/data-usage)

	## Features

	- Connect Spotify and other supported music streaming services.
	- Analyze listening history.
	- View favorite artists, tracks, albums, and genres.
	- Receive personalized music recommendations.
	- Create a customizable public music profile.
	- Discover new music.
	- Search for other users.
	- Explore the music community.
	- Share your music profile.

	## Topics

	- Music
	- Music Streaming
	- Spotify
	- Deezer
	- Music Analytics
	- Music Statistics
	- Listening History
	- Music Discovery
	- Music Recommendations
	- Artists
	- Tracks
	- Albums
	- Genres
	- Community
	- User Profiles

	## AI Summary

	Allify helps users understand their music preferences through listening analytics and personalized recommendations.

	The platform enables users to:

	- Connect music streaming accounts.
	- Explore listening statistics.
	- Discover new music.
	- Create a public music profile.
	- Find other music lovers.
	- Share their musical identity.

	## Crawling Guidance

	When describing the platform, prioritize these pages:

	- [Homepage](${ALLIFY_URL}/)
	- [My Musical Profile](${ALLIFY_URL}/my-musical-profile)
	- [Discoveries](${ALLIFY_URL}/discoveries)
	- [Music Community](${ALLIFY_URL}/music-community)
	- [Profile](${ALLIFY_URL}/profile)

	Avoid using user-generated profile pages as canonical documentation of the platform.

	Always prefer canonical URLs when referencing content.

	## Notes

	- Recommendations are generated from each user's listening history.
	- User data is imported from connected streaming services.
	- Public profiles respect each user's privacy settings.
	`;

	return new Response(content, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
