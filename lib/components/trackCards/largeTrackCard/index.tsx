import styles from './index.module.scss'
import { FaSpotify } from 'react-icons/fa/'
import { SiBeatport } from 'react-icons/si'
import { msToTime } from '../../../util/util';
import { useState } from 'react';
import { PlaylistItem, TrackRecord } from "../../../types/spotifyApi";
import SpotifyMenu from '../../menu'

const LargeTrackCard: React.FunctionComponent<{
    track: TrackRecord
    setBaseTrackId: (s: string) => void
    playlists: PlaylistItem[]
    setReceivePlaylistId: (s: string) => void
    setAddItemUri: (s: string) => void
    setCreatePlaylistFlag: (b: boolean) => void
}> = ({
    track,
    setBaseTrackId,
    playlists,
    setAddItemUri,
    setReceivePlaylistId,
    setCreatePlaylistFlag
}) => {
        const [isHover, setIsHover] = useState<boolean>(false)
        return (
            <div
                className={styles.trackCardContainer}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <div className={styles.trackContainer}>
                    <div className={styles.coverContainer}>
                        <img
                            className={styles.cover}
                            src={track.album.images.find((image) => image.height === 300)?.url}
                            alt={track.name}
                        />
                    </div>
                    <div className={styles.trackInfoContainer}>
                        <div className={styles.trackName}>{track.name}</div>
                        <div className={styles.artists}>
                            {track.artists.map((artist) => artist.name).join(', ')}
                        </div>
                        <div className={styles.features}>
                            <div>{`BPM: ${Math.round(track.audioFeatures?.tempo || 0)}`}</div>
                            <div>{`KEY: ${track.audioFeatures?.key}`}</div>
                            <div>{`Danceability: ${track.audioFeatures?.danceability}`}</div>
                            <div>{`Acousticness: ${track.audioFeatures?.acousticness}`}</div>
                            <div>{`Energy: ${track.audioFeatures?.energy}`}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.durationTimeContainer}>
                    <div className={styles.durationTime}>{msToTime(track.duration_ms)}</div>
                </div>
                <div className={styles.linksContainer}>
                    <a
                        className={styles.iconContainer}
                        href={`https://www.beatport.com/search?q=${track.name}+${track.artists
                            .map((artist) => artist.name)
                            .join('+')}`}
                        rel="Beatport Link"
                    >
                        <SiBeatport className={styles.icon} />
                    </a>
                    <a className={styles.iconContainer} href={track.uri} rel="Spotify Link">
                        <FaSpotify className={styles.icon} />
                    </a>
                    {isHover &&
                        <SpotifyMenu
                            key={track.id}
                            track={track}
                            playlists={playlists}
                            setBaseTrackId={setBaseTrackId}
                            setAddItemUri={setAddItemUri}
                            setReceivePlaylistId={setReceivePlaylistId}
                            setCreatePlaylistFlag={setCreatePlaylistFlag}
                        />
                    }
                </div>
            </div>
        )
    }

export default LargeTrackCard