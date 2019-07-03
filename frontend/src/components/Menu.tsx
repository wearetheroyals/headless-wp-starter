/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { NextFunctionComponent } from 'next';

const MENU_QUERY = gql`
  query MenuQuery {
    headerMenu {
      url
      label
      type
    }
  }
`;
interface MenuQueryResult {
  data: {
    headerMenu: {
      url: string;
      label: string;
      type: string;
    };
  };
}

const linkStyle = {
  marginRight: 15,
};

const Menu: NextFunctionComponent<{}> = () => {
  return (
    <Query query={MENU_QUERY}>
      {({ data }: MenuQueryResult) => {
        if (!data || !data.headerMenu) {
          return null;
        }

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
