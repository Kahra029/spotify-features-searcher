import { ReactNode } from "react";
import Head from 'next/head';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>Features Searcher</title>
      </Head>
      <main>{children}</main>
    </>
  )
}