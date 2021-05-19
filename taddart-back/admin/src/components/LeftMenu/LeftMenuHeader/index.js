import React from 'react';
import {Link} from 'react-router-dom';

import Wrapper from './Wrapper';

const LeftMenuHeader = () => (
  <Wrapper style={{backgroundColor: "#0e2a48"}}>
    <Link style={{position: "absolute", width: "240px", height: "60px", marginLeft: "-19px"}} to="/"
          className="leftMenuHeaderLink">
      <span style={{
        color: "white",
        fontWeight: "bold",
        position: "absolute",
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        margin: "auto",
        width: "max-content",
        height: "max-content"}}>
        Tuddar N'at abdelmumen</span>
    </Link>
  </Wrapper>
);

export default LeftMenuHeader;
