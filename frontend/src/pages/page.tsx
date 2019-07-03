import React from 'react';
import Error from 'next/error';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Layout from '../layout';

const PAGE_QUERY = gql`
  query PageQuery($uri: String!) {
    pageBy(uri: $uri) {
      title
      content
    }
  }
`;

const Page = ({ slug }) => {
  if (!slug) {
    return <Error statusCode={404} />;
  }

  return (
    <Query query={PAGE_QUERY} variables={{ uri: slug }}>
      {({ data }) => {
        if (!data || !data.pageBy || !data.pageBy.title) {
          return <Error statusCode={404} />;
        }

        return (
          <Layout>
            <h1>{data.pageBy.title}</h1>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: data.pageBy.content,
              }}
            />
          </Layout>
        );
      }}
    </Query>
  );
};

Page.getInitialProps = ({ query }) => {
  if (!query) {
    return {
      slug: '',
    };
  }

  return {
    slug: query.slug,
  };
};

export default Page;
