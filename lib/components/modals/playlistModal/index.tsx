import styles from './index.module.scss'
import { IoIosClose } from 'react-icons/io'
const PlaylistModal: React.FunctionComponent<{
    setPlaylistModalIsOpen: (b: boolean) => void,
}> = ({
    setPlaylistModalIsOpen,
}) => {
        return (
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div
                            className={styles.iconContainer}
                            onClick={() => setPlaylistModalIsOpen(false)}
                        >
                            <IoIosClose className={styles.icon} />
                        </div>
                        <div className={styles.title}>プレイリストを作成</div>
                    </div>
                    <div className={styles.headerRight}>
                        <button
                            className={styles.searchButton}
                        >
                            <div className={styles.buttonText}>作成</div>
                        </button>
                    </div>
                </div>
                <div className={styles.main}>
                <div className={styles.featuresContainer}>
                        <div className={styles.content}>
                            <div className={styles.inputContainer}>
                                <input
                                    className={styles.searchBox}
                                    placeholder='2020/1/1'
                                    spellCheck='false'
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
export default PlaylistModal