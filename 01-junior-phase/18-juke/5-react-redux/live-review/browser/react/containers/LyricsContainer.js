import {connect} from 'react-redux';
import React, {Component} from 'react';
import store from '../store';
import Lyrics from '../components/Lyrics';

import {searchLyrics} from '../action-creators/lyrics';

class LyricsLocalStateContainer extends Component {

  constructor() {

    super();

    this.state = {
      artistQuery: '',
      songQuery: ''
    };

    this.setSong = this.changeHandler('songQuery');
    this.setArtist = this.changeHandler('artistQuery');

  }

  changeHandler(stateKey) {
    return (event) => {
      this.setState({
        [stateKey]: event.target.value
      });
    };
  }

  render() {
    return (
      <LyricsReduxContainer
        artistQuery={this.state.artistQuery}
        songQuery={this.state.songQuery}
        setArtist={this.setArtist}
        setSong={this.setSong} />
    );
  }

}

function mapStateToProps (storeState) {
  return {
    text: storeState.lyrics.text
  };
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    handleSubmit: function (event) {
      event.preventDefault();
      dispatch(searchLyrics(
        ownProps.artistQuery,
        ownProps.songQuery
      ));
    }
  };
}

const LyricsReduxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lyrics);

export default LyricsLocalStateContainer;

