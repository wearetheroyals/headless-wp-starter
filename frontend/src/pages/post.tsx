import React from 'react';
import Error from 'next/error';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from '../layout';

const POST_QUERY = gql`
  query PostQuery($filter: String!) {
    postBy(slug: $filter) {
      title
      content
      author {
        nickname
      }
    }
  }
`;

const Post = ({ slug }) => {
  if (!slug) {
    return <Error statusCode={404} />;
  }

  return (
    <Query query={POST_QUERY} variables={{ filter: slug }}>
      {({ data }) => {
        if (!data || !data.postBy || !data.postBy.title) {
          return <Error statusCode={404} />;
        }

        return (
          <Layout>
            <h1>{data.postBy.title}</h1>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: data.postBy.content,
              }}
            />
          </Layout>
        );
      }}
    </Query>
  );
};

Post.getInitialProps = ({ query }) => {
  if (!query) {
    return {
      slug: '',
    };
  }

  return {
    slug: query.slug,
  };
};

export default Post;
