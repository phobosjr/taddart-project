import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import imagePano from './vue-pano.jpg';

import { Block, Container } from './components';
import PageTitle from '../../components/PageTitle';

const HomePage = ({ global: { plugins }, history: { push } }) => {
  return (
    <>
      <FormattedMessage id="HomePage.helmet.title">
        {title => <PageTitle title={title} />}
      </FormattedMessage>
      <Container className="container-fluid">
        <div className="row">
          <div className="col-12" style={{textAlign: "center"}}>
            <h1>Azul!</h1>
            <Block>
              <img src={imagePano} style={{width: "100%"}}/>
            </Block>
          </div>
        </div>
      </Container>
    </>
  );
};

export default memo(HomePage);
