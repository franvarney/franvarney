import React, {Component} from 'react';

import Logo from '../../assets/images/logo.png';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1><img src={Logo} /></h1>
      </div>
    );
  }
}

export default Header;
