export interface SpotifyUserResponse {
  country: string,
  display_name: string,
  id: string
}

export interface SpotifyAuthApiResponse {
  access_token: string,
  token_type: string,
  scope: string,
  expires_in: number,
  refresh_token: string
}

type TrackItem = {
  album: {
    id: string
    href: string
    name: string
    images: { url: string; height: number }[]
  }
  artists: { href: string; name: string }[]
  href: string
  id: string
  name: string
  track_number: number
  uri: string
  duration_ms: number
}

export type SpotifySearchApiResponse = {
  tracks: {
    items: TrackItem[]
  }
}

export type SpotifyTracksApiResponse = {
  tracks: TrackItem[]
}

export type SpotifyRecommendationApiResponse = {
  tracks: TrackItem[]
}

export type AudioFeature = {
  danceability: number
  energy: number
  id: string
  instrumentalness: number
  key: number
  acousticness: number
  liveness: number
  loudness: number
  mode: number
  tempo: number
  valence: number
  track_href: string
}

export type SpotifyFeaturesApiResponse = {
  audio_features: AudioFeature[]
}

export type PlaylistItem = {
  id: string
  external_urls: { spotify: string }
  images: { url: string; height: number }[]
  description: string
  name: string
  owner: { display_name: string }
}

export type SpotifyPlaylistsResponse = {
  items: PlaylistItem[]
}

export type TrackRecord = TrackItem & {
  audioFeatures?: AudioFeature
}

export type TrackResponse = TrackRecord
export type SearchTracksResponse = TrackRecord[]
export type RecommendationTracksResponse = TrackRecord[]
export type PlaylistResponse = PlaylistItem[]