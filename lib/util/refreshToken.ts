import axios from "axios";
import { SpotifyAuthApiResponse } from "../types/spotifyApi";

const refreshToken = async (refreshToken: string)=>{
    const clientBuffer = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, 'utf-8');
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    const response = await axios.post<SpotifyAuthApiResponse>(
        'https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-from-urlencoded',
                'Authorization': `Basic ${clientBuffer.toString('base64')}`
            }
        }
    );
    return response.data;
}
export default refreshToken;