import axios from "axios";
import withSession from "../../../lib/middleware/session";
import { ApiClient } from "../../../lib/middleware/apiClient";
import { ApiHandler } from "../../../lib/types/handler";
import { RecommendationTracksResponse, SpotifyRecommendationApiResponse, TrackRecord } from "../../../lib/types/spotifyApi";
import getAudioFeatures from "../../../lib/util/audiofeatures";

export interface RequestBody {
    track: TrackRecord,
    toleranceTempo: number,
    torelanceDanceability: number,
    torelanceAcousticness: number,
    torelanceEnergy: number,
}
export interface ResponseBody { tracks: RecommendationTracksResponse }

const recommendationTracks: ApiHandler<RequestBody, ResponseBody> = async (req, res) => {
    const method = req.method;

    switch (method) {
        case 'POST': {
            try {
                const trackId = req.body.track.id as string;
        
                var tempo = Math.round(req.body.track.audioFeatures?.tempo as number);
                const toleranceTempo = Math.round(req.body.toleranceTempo);
                const minTempo = tempo - toleranceTempo;
                const maxTempo = tempo + toleranceTempo;
        
                const danceability = Math.round(req.body.track.audioFeatures?.danceability as number * Math.pow(10, 3)) / Math.pow(10, 3);
                const torelanceDanceability = Math.round(req.body.torelanceDanceability * Math.pow(10, 3)) / Math.pow(10, 3);
                const minDanceability = danceability - torelanceDanceability
                const maxDanceability = danceability + torelanceDanceability
        
                const acousticness = Math.round(req.body.track.audioFeatures?.acousticness as number * Math.pow(10, 5)) / Math.pow(10, 5);
                const torelanceAcousticness = Math.round(req.body.torelanceAcousticness * Math.pow(10, 5)) / Math.pow(10, 5);
                const minAcousticness = acousticness - torelanceAcousticness
                const maxAcousticness = acousticness + torelanceAcousticness
        
                const energy = Math.round(req.body.track.audioFeatures?.energy as number * Math.pow(10, 3)) / Math.pow(10, 3);
                const torelanceEnergy = Math.round(req.body.torelanceEnergy * Math.pow(10, 3)) / Math.pow(10, 3);
                const minEnergy = energy - torelanceEnergy;
                const maxEnergy = energy + torelanceEnergy;
        
                const accessToken = req.session.get('user').accessToken;
                const searchParam = new URLSearchParams();
                searchParam.append('seed_tracks', trackId);
                searchParam.append('min_tempo', minTempo.toString())
                searchParam.append('max_tempo', maxTempo.toString())
                searchParam.append('min_acousticness', minAcousticness.toString())
                searchParam.append('max_acousticness', maxAcousticness.toString())
                searchParam.append('min_danceability', minDanceability.toString())
                searchParam.append('max_danceability', maxDanceability.toString())
                searchParam.append('min_energy', minEnergy.toString())
                searchParam.append('max_energy', maxEnergy.toString())
        
                const recommendationResponse = await ApiClient.get<SpotifyRecommendationApiResponse>(
                    `https://api.spotify.com/v1/recommendations?${searchParam.toString()}`,
                    accessToken
                )
        
                const recommendationData: SpotifyRecommendationApiResponse = recommendationResponse.data;
                const audioFeatures = await getAudioFeatures(recommendationData.tracks.map((track => track.id)), accessToken);
        
                const response: RecommendationTracksResponse = recommendationData.tracks.map((track) => {
                    const targetFeature = audioFeatures.find((feature) => (feature.id === track.id));
                    return { ...track, audioFeatures: targetFeature }
                });
        
                let sortedResponse = response.sort((a: TrackRecord, b: TrackRecord) => {
                    let x = a.audioFeatures?.tempo as number;
                    let y = b.audioFeatures?.tempo as number;
                    return (x < y) ? 1 : -1;
                });;
        
                res.status(200);
                res.json({ tracks: sortedResponse });
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


export default withSession(recommendationTracks);