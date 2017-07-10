import React, {Component} from 'react';

import Loading from '../../components/Loading/Loading';
import RacesList from '../../components/RacesList/RacesList';
import UsersList from '../../components/UsersList/UsersList';

import './Races.css';

class Races extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      players: [],
      races: [],
      selectedRace: null
    };
  }

  getRaces(callback) {
    fetch('http://localhost:5000/races') // TODO use config url
      .then((response) => response.json())
      .then((races) => callback(null, races))
      .catch(callback);
  }

  showPlayers(raceId) {
    const race = this.state.races.find((race) => (race._id === raceId));
    this.setState({
      players: race.participants,
      selectedRace: race._id
    });
  }

  sortPlayers(players) {
    return players.sort((a, b) => {
      if (a.finishTime < b.finishTime) return -1;
      if (a.finishTime > b.finishTime) return 1;
      return 0;
    });
  }

  setOffset() {
    const racesHeight = this.racesEl.clientHeight;
    const playersHeight = this.playersEl.clientHeight;
    this.setState({
      offset: (racesHeight - playersHeight) / 2
    });
  }

  onResize() {
    // TODO debounce
    this.setOffset();
  }

  componentDidMount() {
    this.getRaces((err, races) => {
      if (err) return console.error(err); // TODO handle err
      this.setState({
        players: races[0].participants,
        races,
        selectedRace: races[0]._id
      });

      this.setOffset();
      window.addEventListener('resize', this.setOffset.bind(this));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setOffset);
  }

  render() {
    if (!this.state.races.length) {
      return (<Loading />);
    }

    return (
      <div className="Races">
        <div
          className="column"
          id="Race-results"
          ref={(el) => (this.racesEl = el)}>
          <h2>Results</h2>
          <RacesList
            races={this.state.races}
            selectedRace={this.state.selectedRace}
            showPlayers={this.showPlayers.bind(this)}
            sortPlayers={this.sortPlayers} />
        </div>
        <div
          style={{ marginTop: `${this.state.offset}px` }}
          className="column"
          id="Player-results"
          ref={(el) => (this.playersEl = el)}>
          <h2>Players</h2>
          <UsersList players={this.sortPlayers(this.state.players)} />
        </div>
      </div>
    );
  }
}

export default Races;
