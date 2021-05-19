import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

import favicon from './favicon.ico';

const PageTitle = ({ title }) => (
  <Helmet title="Tuddar Anebdal" link={[{ rel: 'icon', type: 'image/ico', href: favicon }]} />
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(PageTitle);
