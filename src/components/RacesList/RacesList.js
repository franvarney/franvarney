import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FormatTime from '../../helpers/format-time';

import './RacesList.css';

class RacesList extends Component {
  constructor() {
    super();
    this.state = {
      races: []
    };
  }

  componentDidMount() {
    let id = null;
    let current = 0;

    function animate() {
      if (current === this.props.races.length) {
        return id;
      }

      this.setState({
        races: this.state.races.concat(this.props.races[current])
      });

      current += 1;
      id = setTimeout(animate.bind(this), 200);
    }

    clearTimeout(animate.call(this));
  }

  render() {
    return (
      <table className="RacesList">
        <thead>
          <tr>
            <td></td>
            <td>Player</td>
            <td>Car</td>
            <td>Time</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {this.props.races.map((race, index) => {
            const player = this.props.sortPlayers(race.participants)[0];
            return (
              <tr className="races animated fadeInLeft" key={index}>
                <td>{index + 1}</td>
                <td>{player.user.username}</td>
                <td>{player.car.name}</td>
                <td>{FormatTime(race.fastestTime)}</td>
                <td>
                  <input
                    type="button"
                    className="expand"
                    disabled={this.props.selectedRace === race._id}
                    onClick={this.props.showPlayers.bind(null, race._id)}
                    value={this.props.selectedRace === race._id ? '-' : '+'} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

RacesList.propTypes = {
  races: PropTypes.array.isRequired,
  showPlayers: PropTypes.func.isRequired,
  selectedRace: PropTypes.string.isRequired,
  sortPlayers: PropTypes.func.isRequired
};

export default RacesList;
