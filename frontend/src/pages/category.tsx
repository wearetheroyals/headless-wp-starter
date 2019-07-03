/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Error from 'next/error';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import lodashGet from 'lodash.get';

import Layout from '../layout';

const CATEGORY_PAGE_QUERY = gql`
  query CategoryQuery($slug: [String]) {
    categories(where: { slug: $slug }) {
      edges {
        node {
          description
          name
          posts {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      }
    }
  }
`;

const Category = ({ slug }) => {
  if (!slug) {
    return <Error statusCode={404} />;
  }

  return (
    <Query query={CATEGORY_PAGE_QUERY} variables={{ slug: [slug] }}>
      {({ data }) => {
        const category = lodashGet(data, 'categories.edges[0].node');
        if (!category) {
          return <Error statusCode={404} />;
        }

        const posts = lodashGet(category, 'posts.edges');

        return (
          <Layout>
            <h1>{category.name} Posts</h1>
            {Array.isArray(posts) &&
              posts.map(({ node }) => {
                return (
                  <ul key={node.slug}>
                    <li>
                      <Link
                        as={`/post/${node.slug}`}
                        href={`/post?slug=${node.slug}`}
                      >
                        <a>{node.title}</a>
                      </Link>
                    </li>
                  </ul>
                );
              })}
          </Layout>
        );
      }}
    </Query>
  );
};

Category.getInitialProps = ({ query }) => {
  if (!query) {
    return {
      slug: '',
    };
  }

  return {
    slug: query.slug,
  };
};

export default Category;
