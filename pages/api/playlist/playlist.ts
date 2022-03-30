import withSession from "../../../lib/middleware/session";
import { ApiClient } from "../../../lib/middleware/apiClient";
import { ApiHandler } from "../../../lib/types/handler";
import moment from "moment";

export interface RequestBody { playlistId: string, trackUris: string }

const addPlaylistToItem = ((uris:string, id: string, accessToken: string) => {
    const searchParam = new URLSearchParams();
    searchParam.append('uris', uris);

    ApiClient.post(
        `/playlists/${id}/tracks?${searchParam.toString()}`,
        accessToken,
    );
})

const playlist: ApiHandler<RequestBody, {}> = async (req, res) => {
    const method = req.method;

    switch (method) {
        case 'PUT': {
            try {
                const accessToken = req.session.get('user').accessToken;
                const id = req.body.playlistId;
                const uris = req.body.trackUris;

                addPlaylistToItem(uris, id, accessToken);
                
                res.status(200).end();
            } catch (e: any) {
                res.status(500).send(e.message)
            }
            break;
        }
        case 'POST': {
            try {
                const userId = req.session.get('user').userId;
                const accessToken = req.session.get('user').accessToken;
                const date = moment().format('YYYYMMDD');

                const result = await ApiClient.post(
                    `/users/${userId}/playlists`,
                    accessToken,
                    {
                        'name': `Playlist_${date}`,
                        'public': 'true'
                    }
                );

                const uris = req.body.trackUris;
                const playlistId = result.data.id;

                addPlaylistToItem(uris, playlistId, accessToken);

                res.status(200).end();
            } catch (e: any) {
                res.status(500).send(e.message)
            }
            break;
        }
        default: {
            res.status(403).end();
            break;
        }
    }
}
export default withSession(playlist);