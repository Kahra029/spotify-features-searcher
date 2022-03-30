import styles from './index.module.scss'
import { TrackRecord } from '../../../types/spotifyApi'
import { IoIosClose } from 'react-icons/io'
const FeaturesModal: React.FunctionComponent<{
    baseTrack: TrackRecord | undefined
    tempo: number,
    setTempo: (n: number) => void,
    danceability: number,
    setDanceability: (n: number) => void,
    acousticness: number,
    setAcousticness: (n: number) => void,
    energy: number,
    setEnergy: (n: number) => void,
    setModalIsOpen: (b: boolean) => void,
    setIsFeaturesSearch: (b: boolean) => void
}> = ({
    baseTrack,
    tempo,
    setTempo,
    danceability,
    setDanceability,
    acousticness,
    setAcousticness,
    energy,
    setEnergy,
    setModalIsOpen,
    setIsFeaturesSearch
}) => {
        return (
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div
                            className={styles.iconContainer}
                            onClick={() => setModalIsOpen(false)}
                        >
                            <IoIosClose className={styles.icon} />
                        </div>
                        <div className={styles.title}>詳細検索</div>
                    </div>
                    <div className={styles.headerRight}>
                        <button 
                            className={styles.searchButton}
                            onClick={(() => {setIsFeaturesSearch(true)})}
                        >
                            <div className={styles.buttonText}>検索</div>
                        </button>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.featuresContainer}>
                        <div className={styles.featuresTitle}>Tempo</div>
                        <div className={styles.content}>
                            <div className={styles.baseValue}>{baseTrack?.audioFeatures?.tempo}</div>
                            <div className={styles.inputContainer}>
                                <div>±</div>
                                <input
                                    className={styles.searchBox}
                                    placeholder={tempo.toString()}
                                    spellCheck='false'
                                    maxLength={3}
                                    onChange={(e: any) => { setTempo(e.target.value) }}
                                />

                            </div>
                        </div>
                    </div>
                    <div className={styles.featuresContainer}>
                        <div className={styles.featuresTitle}>Danceability</div>
                        <div className={styles.content}>
                            <div className={styles.baseValue}>{baseTrack?.audioFeatures?.danceability}</div>
                            <div className={styles.inputContainer}>
                                <div>±</div>
                                <input
                                    className={styles.searchBox}
                                    placeholder={danceability.toString()}
                                    spellCheck='false'
                                    maxLength={6}
                                    onChange={(e: any) => { setDanceability(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.featuresContainer}>
                        <div className={styles.featuresTitle}>Acousticness</div>
                        <div className={styles.content}>
                            <div className={styles.baseValue}>{baseTrack?.audioFeatures?.acousticness}</div>
                            <div className={styles.inputContainer}>
                                <div>±</div>
                                <input
                                    className={styles.searchBox}
                                    placeholder={acousticness.toString()}
                                    spellCheck='false'
                                    maxLength={6}
                                    onChange={(e: any) => { setAcousticness(e.target.value) }}
                                />

                            </div>
                        </div>
                    </div>
                    <div className={styles.featuresContainer}>
                        <div className={styles.featuresTitle}>Energy</div>
                        <div className={styles.content}>
                            <div className={styles.baseValue}>{baseTrack?.audioFeatures?.energy}</div>
                            <div className={styles.inputContainer}>
                                <div>±</div>
                                <input
                                    className={styles.searchBox}
                                    placeholder={energy.toString()}
                                    spellCheck='false'
                                    maxLength={6}
                                    onChange={(e: any) => { setEnergy(e.target.value) }}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
export default FeaturesModal