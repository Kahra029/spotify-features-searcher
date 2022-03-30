import withSession from '../../../lib/middleware/session';
import { ApiClient } from "../../../lib/middleware/apiClient";
import { ApiHandler } from '../../../lib/types/handler';
import executeRefreshToken from '../../../lib/util/refreshToken';
import moment from 'moment';
import axios from 'axios';

export interface ResponseBody {
    accessToken?: string,
    message?: string
}

const checklogin: ApiHandler<{}, ResponseBody> = async (req, res) => {
    try {
        const { accessToken, refreshToken, userId } = req.session.get('user');
        const now = moment();
        try {
            const accessToken = req.session.get('user').accessToken;
            ApiClient.get(
                `https://api.spotify.com/v1/me`,
                accessToken
            );
        }
        catch {
            if (refreshToken) {
                const response = await executeRefreshToken(refreshToken);
                req.session.set('user', {
                    userId,
                    accessToken: response.access_token,
                    authedTs: now.format('YYYY-MM-DD HH:mm:ss'),
                    expiresIn: response.expires_in
                });
                await req.session.save();
                res.status(200);
                res.json({ accessToken: response.access_token });
            } else {
                res.status(401);
                res.json({ message: 'unauthorized' });
            }
        }
        res.status(200);
        res.json({ accessToken });
    } catch (e: any) {
        res.status(401);
    } finally {
        res.end();
    }
}
export default withSession(checklogin);