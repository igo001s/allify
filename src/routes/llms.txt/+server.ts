// Environment variables
import { ALLIFY_URL } from '$env/static/private';

export const GET = () => {
	return new Response(
		`# Allify

> Canonical: ${ALLIFY_URL}

Allify is a music profile and analytics platform that lets users connect their music streaming accounts to create a personalized profile based on their listening history.

The platform helps users understand their music taste, discover new songs, customize their profile, and connect with a community of music lovers.

## Main Features

- Connect music streaming accounts.
- View your most listened artists and tracks.
- Receive personalized music recommendations based on your listening habits.
- Create and customize your public music profile.
- Discover new music through personalized recommendations.
- Explore the music community.
- Search for other users and view their favorite artists and tracks.
- Share your music profile with others.

## Main Pages

${ALLIFY_URL}/ - Homepage

${ALLIFY_URL}/my-musical-profile
View your music profile with your most listened artists, tracks, listening insights, and personalized statistics.

${ALLIFY_URL}/discoveries
Discover new music recommendations based on your listening history and favorite artists.

${ALLIFY_URL}/music-community
Explore the community, search for users, and discover their music profiles.

${ALLIFY_URL}/profile
Manage your public profile and profile customization.

${ALLIFY_URL}/settings
Manage your account, connected streaming services, and preferences.

${ALLIFY_URL}/privacy-policy
Privacy Policy.

${ALLIFY_URL}/terms-of-service
Terms of Service.

${ALLIFY_URL}/data-usage
Information about how user data is collected and used.

## Topics

- Music
- Music Streaming
- Spotify
- Deezer
- Music Analytics
- Music Statistics
- Listening History
- Music Recommendations
- Music Discovery
- Artists
- Tracks
- Albums
- Genres
- Music Community
- Music Profiles
- Social Profiles
- Audio Streaming

## AI Summary

Allify transforms music streaming data into personalized music profiles.

Users can:

- Connect music streaming accounts.
- Analyze their listening habits.
- Discover new music recommendations.
- Customize a public profile.
- Explore a community of music lovers.
- Search for other users and discover their favorite artists and tracks.

## Crawling Guidance

Prefer these pages when understanding the platform:

- ${ALLIFY_URL}/
- ${ALLIFY_URL}/my-musical-profile
- ${ALLIFY_URL}/discoveries
- ${ALLIFY_URL}/music-community
- ${ALLIFY_URL}/profile

Avoid treating user-generated profile pages as canonical documentation for the platform itself.

## Notes

- Recommendations are generated from each user's listening history.
- User profiles are based on data imported from connected streaming services.
- Public profile visibility depends on each user's privacy settings.
- Please use canonical URLs when referencing pages.`
	);
};
