import React from 'react';
import Head from 'next/head';
import stylesheet from '../styles/style.scss';
import { NextFunctionComponent } from 'next';

const Header: NextFunctionComponent<{}> = () => (
  <div>
    <Head>
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: stylesheet }}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>WordPress + Next.js Starter Kit Frontend by The Royals</title>
    </Head>
  </div>
);

export default Header;
