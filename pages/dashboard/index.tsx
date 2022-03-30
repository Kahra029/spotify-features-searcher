import styles from './index.module.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { RiEqualizerLine } from 'react-icons/ri'
import Modal from 'react-modal'
import Layout from '../../lib/components/layout/layout'
import Header from '../../lib/components/layout/authedHeader'
import SearchTracks from '../../lib/components/searchContainer'
import RecommendationTracks from '../../lib/components/recommendationContainer'
import { PlaylistItem, TrackRecord } from '../../lib/types/spotifyApi'
import FeaturesModal from '../../lib/components/modals/featuresModal'

Modal.setAppElement("#__next");

const Dashboard = () => {
    const [isSearchTab, setIsSearchTab] = useState<boolean>(true);
    const [isRecommendationTab, setIsRecommendationTab] = useState<boolean>(false);
    const [isFeaturesSearch, setIsFeaturesSearch] = useState<boolean>(false);
    const [query, setQuery] = useState<string[]>([]);
    const [baseTrackId, setBaseTrackId] = useState<string>('');
    const [baseTrack, setBaseTrack] = useState<TrackRecord>();
    const [recommendationData, setRecommendationData] = useState<TrackRecord[]>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [tempo, setTempo] = useState<number>(5);
    const [danceability, setDanceability] = useState<number>(1.0);
    const [acousticness, setAcousticness] = useState<number>(1.0);
    const [energy, setEnergy] = useState<number>(0.5);
    const [createPlaylistFlag, setCreatePlaylistFlag] = useState<boolean>(false);
    const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
    const [receivePlaylistId, setReceivePlaylistId] = useState<string>();
    const [addItemUri, setAddItemUri] = useState<string>();

    const activeSearchContainer = (() => {
        setIsSearchTab(true);
        setIsRecommendationTab(false);
    });

    const activeRecommendationContainer = (() => {
        setIsSearchTab(false);
        setIsRecommendationTab(true);
    });

    const setBaseSearchValue = (() => {
        setTempo(5);
        setDanceability(1.0);
        setAcousticness(1.0);
        setEnergy(0.5);
    });

    const openFeaturesModal = (() => {
        setModalIsOpen(true);
    });

    const closeFeaturesModal = (() => {
        setModalIsOpen(false);
    });

    const search = ((e: any) => {
        let q = e.target.value;
        if (q) {
            setQuery(q.replace(/ /g, ' ').split(' '))
            activeSearchContainer();
            setBaseTrackId('');
        }
    });

    const searchRecommendations = ((
        baseTrack: TrackRecord,
        tempo: number,
        danceability: number,
        acousticness: number,
        energy: number,
    ) => {
        axios.post(
            '/api/track/recommendation',
            {
                track: baseTrack,
                toleranceTempo: tempo,
                torelanceDanceability: danceability,
                torelanceAcousticness: acousticness,
                torelanceEnergy: energy
            })
            .then((res) => {
                setRecommendationData(res.data.tracks)
            });
    })

    const getTrackData = ((id: string) => {
        axios.post(
            '/api/track/tracks',
            { trackId: id }
        )
            .then((res) => {
                setBaseTrack(res.data.tracks)
                activeRecommendationContainer();
            });
    })

    const getPlaylists = (() => {
        axios.get('/api/playlist')
            .then((res) => {
                setPlaylists(res.data.playlists)
            });
    })

    const createPlaylist = ((trackUri: string) => {
        axios.post(
            '/api/playlist/playlist',
            { trackUris: trackUri }
        ).then(() => {
            getPlaylists();
        })
    })

    const addItemToPlaylist = ((playlistId: string, uris: string) => {
        axios.put(
            '/api/playlist/playlist',
            { playlistId: playlistId, trackUris: uris }
        );
    })

    useEffect(() => {
        getPlaylists();
    }, [])

    useEffect(() => {
        if (baseTrackId) {
            getTrackData(baseTrackId)
        }
    }, [baseTrackId]);

    useEffect(() => {
        if (baseTrack) {
            setBaseSearchValue();
            searchRecommendations(baseTrack, tempo, danceability, acousticness, energy);
            closeFeaturesModal();
        }
    }, [baseTrack]);

    useEffect(() => {
        if (isFeaturesSearch && baseTrack) {
            searchRecommendations(baseTrack, tempo, danceability, acousticness, energy);
            setIsFeaturesSearch(false);
            closeFeaturesModal();
        }
    }, [isFeaturesSearch]);

    useEffect(() => {
        if (receivePlaylistId && addItemUri) {
            addItemToPlaylist(receivePlaylistId, addItemUri);
            setReceivePlaylistId('');
            setAddItemUri('');
        }
    }, [receivePlaylistId, addItemUri]);

    useEffect(() => {
        if (createPlaylistFlag && addItemUri) {
            createPlaylist(addItemUri);
            setCreatePlaylistFlag(false);
            setAddItemUri('');
        }
    },[createPlaylistFlag, addItemUri])

    const modalStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            width: "400px",
            padding: "20px",
            borderRadius: "15px",
            transform: "translate(-50%, -50%)",
        },
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.titles}>
                    <div className={styles.title}>Features Seacher</div>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.searchBox}
                        placeholder="search"
                        spellCheck="false"
                        onChange={search}
                    />
                    {isRecommendationTab && baseTrack &&
                        <div className={styles.iconContainer} onClick={openFeaturesModal}>
                            <RiEqualizerLine className={styles.icon} />
                        </div>
                    }
                </div>
                {isSearchTab ? (
                    <div className={styles.tab}>
                        <div className={styles.activeContainer} onClick={activeSearchContainer}>Search</div>
                        <div className={styles.inactiveContainer} onClick={activeRecommendationContainer}>Recommend</div>
                    </div>
                ) : (
                    <div className={styles.tab}>
                        <div className={styles.inactiveContainer} onClick={activeSearchContainer}>Search</div>
                        <div className={styles.activeContainer} onClick={activeRecommendationContainer}>Recommend</div>
                    </div>
                )}
                {isSearchTab &&
                    <div className={styles.tracksContainer}>
                        <SearchTracks
                            key='searchTracks'
                            query={query}
                            setBaseTrackId={setBaseTrackId}
                            playlists={playlists}
                            setAddItemUri={setAddItemUri}
                            setReceivePlaylistId={setReceivePlaylistId}
                            setCreatePlaylistFlag={setCreatePlaylistFlag}
                        />
                    </div>
                }
                {isRecommendationTab &&
                    <div className={styles.tracksContainer}>
                        <RecommendationTracks
                            key='recommendationTracks'
                            originalTrack={baseTrack}
                            recommendationData={recommendationData}
                            setBaseTrackId={setBaseTrackId}
                            playlists={playlists}
                            setAddItemUri={setAddItemUri}
                            setReceivePlaylistId={setReceivePlaylistId}
                            setCreatePlaylistFlag={setCreatePlaylistFlag}
                        />
                    </div>
                }
            </div>
            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={closeFeaturesModal}
            >
                <FeaturesModal
                    baseTrack={baseTrack}
                    tempo={tempo}
                    setTempo={setTempo}
                    danceability={danceability}
                    setDanceability={setDanceability}
                    acousticness={acousticness}
                    setAcousticness={setAcousticness}
                    energy={energy}
                    setEnergy={setEnergy}
                    setModalIsOpen={setModalIsOpen}
                    setIsFeaturesSearch={setIsFeaturesSearch}
                />
            </Modal>
        </div>
    )
}

Dashboard.getLayout = function getLayout(page: any) {
    return (
        <Layout>
            <Header />
            {page}
        </Layout>
    )
}

export default Dashboard
