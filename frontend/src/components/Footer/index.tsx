import React from 'react';
import { NextFunctionComponent } from 'next';

import './style.scss';

const Footer: NextFunctionComponent<{}> = () => (
  <footer className="footer">
    <hr />
    <p>
      <span role="img" aria-label="microscope">
        🔬 A project by <a href="https://theroyals.com.au">The Royals</a>.
      </span>
    </p>
    <p>
      <span role="img" aria-label="fork">
        🍴
      </span>{' '}
      <a href="https://github.com/wearetheroyals/headless-wp-starter">
        Fork on GitHub
      </a>
      . We originally forked this project from{' '}
      <a href="https://postlight.com">Postlight Labs</a>
    </p>
    <p>
      <span role="img" aria-label="wave">
        👋
      </span>{' '}
      Need help with your next tech project?{' '}
      <a href="mailto:concierge@theroyals.com.au?subject=Partner+with+The+Royals+on+a+headless+CMS+project">
        Contact us
      </a>
      .
    </p>
  </footer>
);

export default Footer;
