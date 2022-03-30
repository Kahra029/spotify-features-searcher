import TrackCard from '../trackCards/trackCard';
import { PlaylistItem, TrackRecord } from '../../types/spotifyApi';
import LargeTrackCard from '../trackCards/largeTrackCard';

const RecommendationTracks: React.FunctionComponent<{
    originalTrack: TrackRecord | undefined
    recommendationData: TrackRecord[] | undefined
    setBaseTrackId: (s: string) => void
    playlists: PlaylistItem[]
    setReceivePlaylistId: (s: string) => void
    setAddItemUri: (s: string) => void
    setCreatePlaylistFlag: (b: boolean) => void
}> = ({
    originalTrack,
    recommendationData,
    setBaseTrackId,
    playlists,
    setAddItemUri,
    setReceivePlaylistId,
    setCreatePlaylistFlag
}) => {
        return (
            <div>
                {recommendationData &&
                    <div>
                        <div>
                            {
                                originalTrack &&
                                <LargeTrackCard
                                    key={originalTrack.id}
                                    track={originalTrack}
                                    setBaseTrackId={setBaseTrackId}
                                    playlists={playlists}
                                    setAddItemUri={setAddItemUri}
                                    setReceivePlaylistId={setReceivePlaylistId}
                                    setCreatePlaylistFlag={setCreatePlaylistFlag}
                                />
                            }
                        </div>
                        <div>
                            {
                                recommendationData?.map((track) => {
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
                    </div>
                }
            </div>
        )
    }
export default RecommendationTracks;