import React, {Component} from 'react';
import {Helmet} from 'react-helmet';

import './NoMatch.css';

class NoMatch extends Component {
  render() {
    return (
      <div className="NoMatch">
        <Helmet>
          <title>Not Found</title>
        </Helmet>
        <p>404: Not Found</p>
      </div>
    );
  }
}

export default NoMatch;
