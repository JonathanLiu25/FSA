import axios from 'axios';
import React from 'react';
import {hashHistory} from 'react-router';

import NewPlaylist from '../components/NewPlaylist';

class NewPlaylistContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      inputValue: '',
      errors: this.validate('')
    };
    this.changeName = this.changeName.bind(this);
    this.submitPlaylist = this.submitPlaylist.bind(this);
  }
  changeName (newName) {
    this.setState({
      inputValue: newName,
      errors: this.validate(newName)
    });
  }
  validate (incomingName) {
    const errors = []
    if (incomingName === '') {
      errors.push('Name is required');
    }
    if (incomingName.length > 16) {
      errors.push('Name must be less than 16 characters');
    }
    return errors;
  }
  submitPlaylist () {
    axios.post('/api/playlists', {
      name: this.state.inputValue
    })
    .then(response => {
      hashHistory.push(`/playlists/${response.data.id}`);
    })
    .catch(console.error);
  }
  render () {
    return (
      <NewPlaylist
        errors={this.state.errors}
        playlistName={this.state.inputValue}
        changePlaylistName={this.changeName}
        submitPlaylist={this.submitPlaylist} />
    );
  }
}

export default NewPlaylistContainer;
