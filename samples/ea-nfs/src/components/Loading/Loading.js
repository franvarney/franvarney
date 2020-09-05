import React, {Component} from 'react';

import Wheel from '../../assets/images/wheel.png';

import './Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="Loading">
        <img className="rotating" src={Wheel} alt="" />
        <span>Loading...</span>
      </div>
    );
  }
}

export default Loading;
