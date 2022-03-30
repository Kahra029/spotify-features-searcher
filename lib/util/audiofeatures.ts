import { ApiClient } from "../../lib/middleware/apiClient";
import { SpotifyFeaturesApiResponse } from '../types/spotifyApi';

const getAudioFeatures = async (ids: string[], accessToken: string) =>{
    const featuresParams = new URLSearchParams();

    featuresParams.append('ids', ids.join(','));
    const features = await ApiClient.get<SpotifyFeaturesApiResponse>(
        `audio-features?${featuresParams.toString()}`,
        accessToken
    );
    const response: SpotifyFeaturesApiResponse = features.data;

    return response.audio_features;
};
export default getAudioFeatures;