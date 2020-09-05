import React, {Component} from 'react';
import PropTypes from 'prop-types';

import FormatTime from '../../helpers/format-time';

import './UsersList.css';

class UsersList extends Component {
  constructor() {
    super();
    this.state = {
      players: []
    };
  }

  animateRows() {
    let id = null;
    let current = 0;

    function animate() {
      if (current === this.props.players.length) {
        return id;
      }

      this.setState({
        players: this.state.players.concat(this.props.players[current])
      });

      current += 1;
      id = setTimeout(animate.bind(this), 150);

      return void 0;
    }

    clearTimeout(animate.call(this));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      players: []
    }, () => {
      this.animateRows();
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.players !== nextProps.players || this.state.players !== nextState.players;
  }

  render() {
    return (
      <table className="UsersList">
        <thead>
          <tr>
            <td></td>
            <td>Player</td>
            <td>Car</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {this.state.players.map((player, index) => {
            return (
              <tr key={index} className="player animated fadeInLeft">
                <td>{index + 1}</td>
                <td>{player.user.username}</td>
                <td>{player.car.name}</td>
                <td>{FormatTime(player.finishTime)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

UsersList.propTypes = {
  players: PropTypes.array.isRequired
};

export default UsersList;
