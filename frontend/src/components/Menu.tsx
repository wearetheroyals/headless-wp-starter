/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';

const MENU_QUERY = gql`
  query MenuQuery {
    headerMenu {
      url
      label
      type
    }
  }
`;

const linkStyle = {
  marginRight: 15,
};

const getSlug = (url: string): string => {
  const parts = url.split('/');
  return parts.length > 2 ? parts[parts.length - 2] : '';
};

const Menu = () => {
  return (
    <Query query={MENU_QUERY}>
      {({ data }) => {
        if (!data || !data.headerMenu) {
          return null;
        }

        console.log('renderMenu');
        const { headerMenu } = data;

        return (
          <div>
            <Link href="/">
              <a style={linkStyle}>Home</a>
            </Link>

            {Array.isArray(headerMenu) &&
              headerMenu.map(item => {
                if (item.type === 'external') {
                  return (
                    <a href={item.url} key={item.url} style={linkStyle}>
                      {item.label}
                    </a>
                  );
                }

                const [_, page, slug] = item.url.split('/');
                return (
                  <Link
                    as={`${item.url}`}
                    href={`/${page}?slug=${slug}`}
                    key={item.url}
                  >
                    <a style={linkStyle}>{item.label}</a>
                  </Link>
                );
              })}
          </div>
        );
      }}
    </Query>
  );
};

export default Menu;
