import styles from './index.module.scss'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useCallback } from 'react'
import { FaSpotify } from 'react-icons/fa/'
import Layout from '../lib/components/layout/layout'
import Header from '../lib/components/layout/header'

const Index = ({ loginPath }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const login = useCallback(() => {
    window.location.href = loginPath
  }, [loginPath])
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.titles}>
          <div className={styles.title}>Features Searcher</div>
          <div className={styles.subTitle}>Custom Searcher<br />Powered by Sporify API</div>
        </div>
        <button className={styles.loginButton} onClick={login}>
          <div className={styles.buttonText}>Login</div>
          <FaSpotify className={styles.icon}></FaSpotify>
        </button>
      </div>
    </div>
  )
}

Index.getLayout = function getLayout(page: any) {
  return (
    <Layout>
      <Header />
      {page}
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const scopes = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-library-read',
    'playlist-modify-public',
    'playlist-modify-private'
  ]
  const params = new URLSearchParams()
  params.append('client_id', process.env.CLIENT_ID || '')
  params.append('response_type', 'code')
  params.append('redirect_uri', process.env.RETURN_TO || '')
  params.append('scope', scopes.join(' '))
  params.append('state', 'state')
  return {
    props: {
      loginPath: `https://accounts.spotify.com/authorize?${params.toString()}`,
    },
  }
}

export default Index
