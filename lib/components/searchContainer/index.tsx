import useSearchTracksApi from '../../hook/useSearchTracksApi'
import { PlaylistItem } from '../../types/spotifyApi';
import TrackCard from '../trackCards/trackCard';

const SearchTracks: React.FunctionComponent<{
    query: string[]
    setBaseTrackId: (s: string) => void
    playlists: PlaylistItem[]
    setReceivePlaylistId: (s: string) => void
    setAddItemUri: (s: string) => void
    setCreatePlaylistFlag: (b: boolean) => void
}> = ({
    query,
    setBaseTrackId,
    playlists,
    setAddItemUri,
    setReceivePlaylistId,
    setCreatePlaylistFlag
}) => {
        const { data: searchData } = useSearchTracksApi({ query });
        return (
            <div>
                {searchData &&
                    <div>
                        {
                            searchData?.tracks.map((track) => {
                                return (
                                    <TrackCard
                                        key={track.id}
                                        track={track}
                                        setBaseTrackId={setBaseTrackId}
                                        playlists={playlists}
                                        setAddItemUri={setAddItemUri}
                                        setReceivePlaylistId={setReceivePlaylistId}
                                        setCreatePlaylistFlag={setCreatePlaylistFlag}
                                    />
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
export default SearchTracks;