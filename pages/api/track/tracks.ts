import withSession from "../../../lib/middleware/session";
import { ApiClient } from "../../../lib/middleware/apiClient";
import { ApiHandler } from "../../../lib/types/handler";
import { TrackResponse, SpotifyTracksApiResponse } from "../../../lib/types/spotifyApi";
import getAudioFeatures from "../../../lib/util/audiofeatures";

export interface RequestBody { trackId: string }
export interface ResponseBody { tracks: TrackResponse }

const searchTracks: ApiHandler<RequestBody, ResponseBody> = async (req, res) => {
    const method = req.method;

    switch (method) {
        case 'POST': {
            try {
                const accessToken = req.session.get('user').accessToken;

                const trackId = req.body.trackId as string;

                const searchParam = new URLSearchParams();
                searchParam.append('ids', trackId);

                const trackResponse = await ApiClient.get<SpotifyTracksApiResponse>(
                    `https://api.spotify.com/v1/tracks?${searchParam.toString()}`,
                    accessToken
                )
                
                const trackData: SpotifyTracksApiResponse = trackResponse.data;
                const audioFeatures = await getAudioFeatures(trackData.tracks.map(((track) => track.id)), accessToken);

                const track = trackData.tracks.map((track) => {
                    const targetFeature = audioFeatures.find((feature) => (feature.id === track.id));
                    return { ...track, audioFeatures: targetFeature }
                })
                const response = track[0]
                res.status(200)
                res.json({ tracks: response })
            } catch (e: any) {
                res.status(500).send(e.message)
            }
        }
        default: {
            res.status(403).end();
        }
    }

}

export default withSession(searchTracks);