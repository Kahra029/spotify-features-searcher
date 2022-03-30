import withSession from "../../../lib/middleware/session";
import { ApiClient } from "../../../lib/middleware/apiClient";
import { ApiHandler } from "../../../lib/types/handler";
import { SearchTracksResponse, SpotifySearchApiResponse } from "../../../lib/types/spotifyApi";
import getAudioFeatures from "../../../lib/util/audiofeatures";

export interface RequestBody { query: string[] }
export interface ResponseBody { tracks: SearchTracksResponse }

const searchTracks: ApiHandler<RequestBody, ResponseBody> = async (req, res) => {
    const method = req.method;

    switch (method) {
        case 'POST': {
            try {
                const query = req.body.query as string[];
                const accessToken = req.session.get('user').accessToken;

                const searchParam = new URLSearchParams();
                searchParam.append('q', query.join(' '));
                searchParam.append('type', 'track');

                const searchResponse = await ApiClient.get<SpotifySearchApiResponse>(
                    `https://api.spotify.com/v1/search?${searchParam.toString()}`,
                    accessToken
                );

                const searchData: SpotifySearchApiResponse = searchResponse.data;
                const audioFeatures = await getAudioFeatures(searchData.tracks.items.map((item => item.id)), accessToken);

                const response: SearchTracksResponse = searchData.tracks.items.map((item) => {
                    const targetFeature = audioFeatures.find((feature) => (feature.id === item.id));
                    return { ...item, audioFeatures: targetFeature }
                });

                res.status(200);
                res.json({ tracks: response });
            } catch (e: any) {
                res.status(500).send(e.message);
            }
        }
        default: {
            res.status(403).end();
            break;
        }
    }
}

export default withSession(searchTracks);