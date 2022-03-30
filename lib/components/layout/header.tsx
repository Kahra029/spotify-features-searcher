import styles from './header.module.scss'
import { SiBeatport, SiGithub } from 'react-icons/si'
import { FaSpotify } from 'react-icons/fa/'

export default function Header() {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <a
                    href="https://www.beatport.com/"
                    rel="Beatport Link"
                >
                    <SiBeatport className={styles.icon}></SiBeatport>
                </a>
                <a
                    href="https://www.spotify.com/"
                    rel="Spotify Link"
                >
                    <FaSpotify className={styles.icon}></FaSpotify>
                </a>
            </div>
            <div className={styles.headerContent}>
                <a
                    href="https://github.com/Kahra029/spotify-features-searcher"
                    rel="Github Link"
                >
                    <SiGithub className={styles.icon}></SiGithub>
                </a>
            </div>
        </div>
    )
}

