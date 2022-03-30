import withSession from "../../../lib/middleware/session";
import { ApiClient } from "../../../lib/middleware/apiClient";
import { ApiHandler } from "../../../lib/types/handler";
import { PlaylistResponse, SpotifyPlaylistsResponse } from "../../../lib/types/spotifyApi";

export interface RequestBody { playlistId: string, trackUris: string }
export interface ResponseBody { playlists: PlaylistResponse }

const playlist: ApiHandler<RequestBody, ResponseBody> = async (req, res) => {
    const method = req.method;

    switch (method) {
        case 'GET': {
            try {
                const accessToken = req.session.get('user').accessToken;
                const response = await ApiClient.get<SpotifyPlaylistsResponse>(
                    '/me/playlists',
                    accessToken,
                );

                res.status(200);
                res.json({ playlists: response.data.items });
            } catch (e: any) {
                res.status(500).send(e.message)
            }
            break;
        };
        default: {
            res.status(403).end();
            break;
        }
    }
}
export default withSession(playlist);