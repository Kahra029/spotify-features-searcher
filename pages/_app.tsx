import '../styles/globals.scss'
import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import useLoginApi from '../lib/hook/useLoginApi';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
    const getLayout = Component.getLayout ?? ((page) => page)
    const { data: loginData, error: loginError } = useLoginApi();
    const router = useRouter();
    useEffect(() => {
        if(router.pathname !== '/error' && !loginData && loginError){
            router.push('/');
        }
    }, [loginData, loginError])
    return getLayout(<Component {...pageProps} />)
}

export default MyApp
