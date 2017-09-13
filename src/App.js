import DebounceInput from 'react-debounce-input';
import React, {Component} from 'react';

import './App.css';

const API_KEY = 'dc6zaTOxFJmzC'; // should be configured

class App extends Component {
  constructor() {
    super();
    this.state = {
      keyword: '',
      result: ''
    };
  }

  componentDidMount() {
    document.getElementById('text-keyword').focus();
  }

  formatUrl(keyword) {
    return `http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${API_KEY}&limit=1`;
  }

  onChange (key, event) {
    this.setState({
      [key]: event.target.value
    });

    this.onSearch(event);
  }

  onSearch(event) {
    event.preventDefault();

    const url = this.formatUrl(this.state.keyword);

    fetch(url)
      .then((response) => {
        return response.json();
      }).then((body) => {
        // if (body && body.status !== 200) ...error
        console.log(body);
        this.setState({
          result: body.data[0].images.original.url
        });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Giphy Search</h1>
        <p>Type to search for a GIF.</p>
        <form>
          <DebounceInput
            debounceTimeout={300}
            id="text-keyword"
            minLength={1}
            value={this.state.keyword}
            onChange={this.onChange.bind(this, 'keyword')} />
          {/* <button type="submit" onClick={this.onSearch.bind(this)}>Go</button> */}
        </form>
        {this.state.result && <div>
          <img alt="presentation" src={this.state.result} />
        </div>}
      </div>
    );
  }
}

export default App;
