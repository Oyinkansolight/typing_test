import React from 'react';
import Head from 'next/head';
import { LayoutProps } from '../../interface';

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='flex flex-col h-screen w-screen'>
      <Head>
        <title>Typing Test App</title>
        <meta name="description" content="Typing Test App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {children}
    </div>
  )
}
