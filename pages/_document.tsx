import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

    render() {
        return (
            <Html lang="ja">
                <Head>
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
                    <link rel="manifest" href="/favicons/site.webmanifest" />
                    <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                    <meta property="og:url" content="https://spotify-features-searcher.vercel.app/" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Featuers Searcher" />
                    <meta property="og:description" content="Custom searcher powered by Spotify API" />
                    <meta property="og:image" content="https://spotify-features-searcher.vercel.app/FeaturesSearcher.png" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:image" content="https://spotify-features-searcher.vercel.app/FeaturesSearcher.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
};

export default MyDocument;
