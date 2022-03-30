import styles from './index.module.scss'
import { BsThreeDots } from 'react-icons/bs'
import { PlaylistItem, TrackRecord } from "../../types/spotifyApi";

import { Menu, MenuItem, SubMenu, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

const SpotifyMenu: React.FunctionComponent<{
    track: TrackRecord
    playlists: PlaylistItem[]
    setBaseTrackId: (s: string) => void
    setReceivePlaylistId: (s: string) => void
    setAddItemUri: (s: string) => void
    setCreatePlaylistFlag: (b: boolean) => void
}> = ({
    track,
    playlists,
    setBaseTrackId,
    setAddItemUri,
    setReceivePlaylistId,
    setCreatePlaylistFlag
}) => {
        return (
            <div className={styles.wrapper}>
                <Menu
                    key={track.id}
                    menuClassName={styles.menu}
                    menuButton={
                        <a
                            className={styles.iconContainer}
                            rel="MENU">
                            <BsThreeDots className={styles.icon} />
                        </a>
                    }
                    direction='top'
                >
                    <MenuItem
                        className={styles.menuItem}
                        onClick={() => { setBaseTrackId(track.id) }}
                    >
                        <div className={styles.menuLabel}>リコメンドに移動</div>
                    </MenuItem>
                    <SubMenu
                        className={styles.subMenu}
                        label="プレイリストに追加"
                    >
                        <MenuItem
                            className={styles.menuItem}
                            onClick={(() => {
                                setCreatePlaylistFlag(true);
                                setAddItemUri(track.uri);

                            })}
                        >
                            <div className={styles.menuLabel}>新しいプレイリストに追加</div>
                        </MenuItem>
                        <MenuDivider />
                        {playlists.map((playlist) => {
                            return (
                                <MenuItem
                                    key={playlist.id}
                                    className={styles.menuItem}
                                    onClick={() => {
                                        setAddItemUri(track.uri);
                                        setReceivePlaylistId(playlist.id);
                                    }}
                                >
                                    {playlist.name}
                                </MenuItem>
                            )
                        })}
                    </SubMenu>
                </Menu>
            </div>
        )
    }

export default SpotifyMenu