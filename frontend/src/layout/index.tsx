import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import { NextFunctionComponent } from 'next';

const layoutStyle = {
  margin: 20,
  padding: 20,
};

interface Props {
  children: any;
}

const Layout: NextFunctionComponent<Props> = ({ children }) => {
  return (
    <div style={layoutStyle}>
      <Header />
      <Menu></Menu>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
