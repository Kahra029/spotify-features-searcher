import axios from "axios";
import moment from "moment";
import withSession from "../../../lib/middleware/session";
import { ApiClient } from "../../../lib/middleware/apiClient";
import { ApiHandler } from "../../../lib/types/handler";
import { SpotifyAuthApiResponse, SpotifyUserResponse } from "../../../lib/types/spotifyApi";

class ApiAuthClient{
    static authorize: ApiHandler<{}, {}> = async (req, res) => {
        try {
            const {code} = req.query;
    
            const clientBuffer = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`, 'utf-8');
            const params = new URLSearchParams();
            params.append('grant_type', 'authorization_code');
            params.append('code', code as string);
            params.append('redirect_uri', process.env.RETURN_TO as string);
    
            const response = await axios.post<SpotifyAuthApiResponse>(
                'https://accounts.spotify.com/api/token',
                params,
                {
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${clientBuffer.toString('base64')}`
                    }
                }
            );

            const accessToken = response.data.access_token;
            const userResponse = await ApiClient.get<SpotifyUserResponse>(
                `https://api.spotify.com/v1/me`,
                accessToken
            )
            console.log(userResponse.data)

            req.session.set('user', {
                userId: userResponse.data.id,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
                authedTs: moment().format('YYYY-MM-DD HH:mm:ss'),
                expiresIn: response.data.expires_in
            });
    
            await req.session.save();
            res.status(200).redirect('/dashboard');
        } catch(e: any) {

            res.status(500).redirect('/error');
        }
    }
}
export default withSession(ApiAuthClient.authorize)
