import React, {Component} from 'react';
import {Route, Switch} from 'react-router';

import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import NoMatch from '../NoMatch/NoMatch';
import RaceBg1 from '../../assets/images/race_bg_1.png';
import Races from '../Races/Races';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundImage: `url(${RaceBg1})` }}>
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Races} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
