import React from 'react';
import Error from 'next/error';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NextFunctionComponent, NextContext } from 'next';

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
interface PostQueryResult {
  data: {
    postBy: {
      title: string;
      content: string;
      author: {
        nickname: string;
      };
    };
  };
}

interface Props {
  slug: string | string[] | undefined;
}

const Post: NextFunctionComponent<Props> = ({ slug }) => {
  if (!slug) {
    return <Error statusCode={404} />;
  }

  return (
    <Query query={POST_QUERY} variables={{ filter: slug }}>
      {({ data }: PostQueryResult) => {
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

Post.getInitialProps = async ({ query }: NextContext): Promise<Props> => {
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
