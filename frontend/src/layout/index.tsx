import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

const layoutStyle = {
  margin: 20,
  padding: 20,
};

const Layout = props => {
  const { children } = props;
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
