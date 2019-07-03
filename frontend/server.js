/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const next = require('next');
const proxyMiddleware = require('http-proxy-middleware');

const proxy = {
  '/graphql': {
    target: 'http://wp-headless:8080',
    pathRewrite: { '^/graphql': '/graphql' },
    changeOrigin: true,
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV || 'dev';
const dev = env !== 'production';
const app = next({
  dir: './src', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

const start = async () => {
  try {
    await app.prepare();

    const server = express();
    server.use(cors());

    // Set up the proxy.
    Object.keys(proxy).map(context => {
      server.use(proxyMiddleware(context, proxy[context]));
    });

    server.get('/post/:slug', (req, res) => {
      const actualPage = '/post';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/page/:slug', (req, res) => {
      const actualPage = '/page';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/category/:slug', (req, res) => {
      const actualPage = '/category';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/_preview/:id/:wpnonce', (req, res) => {
      const actualPage = '/preview';
      const queryParams = { id: req.params.id, wpnonce: req.params.wpnonce };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    await server.listen(3000);

    console.log(`> Ready on port ${port} [${env}]`);
  } catch (err) {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  }
};

start();
