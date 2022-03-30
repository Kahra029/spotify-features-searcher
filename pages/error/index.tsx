import styles from './index.module.scss'
import Layout from '../../lib/components/layout/layout'
import Header from '../../lib/components/layout/header'
import { useRouter } from 'next/router'

const ErrorPage = () => {
    const router = useRouter();
    const returnTop = () => {
        router.push('/')
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.titles}>
                    <div className={styles.title}>Error!</div>
                    <div className={styles.subTitle}>
                        アプリケーションの利用権限がありません。<br />
                        <a href='https://twitter.com/kohehah'>作者</a>へお問い合わせください。
                    </div>
                </div>
                <div className={styles.content}>
                    <button className={styles.returnButton} onClick={returnTop}>
                        <div className={styles.buttonText}>Return</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

ErrorPage.getLayout = function getLayout(page: any) {
    return (
        <Layout>
            <Header />
            {page}
        </Layout>
    )
}

export default ErrorPage
