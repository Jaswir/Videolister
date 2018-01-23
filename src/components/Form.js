import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Videolist from './Videolist';


// Constants used for listing videos playlist URL
const key = 'AIzaSyBN375Q2yTEVg2cOybnzFtVJDKjItUOnYA';
const playlistUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
const youtubeVidPrefix = 'https://www.youtube.com/embed/';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };

    Videolist.constructor();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    Videolist.handlePlaylistItemDisplay(this.state.url);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Playlist URL:
          <input type="text" value={this.state.url} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Form;
