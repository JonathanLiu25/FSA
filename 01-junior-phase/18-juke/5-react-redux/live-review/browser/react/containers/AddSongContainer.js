import {connect} from 'react-redux';
import React from 'react';
import AddSong from '../components/AddSong';
import store from '../store';
import {loadAllSongs, addSongToPlaylist} from '../action-creators/playlists';

class AddSongLocalStateContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({
      songId: 1,
      error: false
    });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    this.props.loadAllSongs();

  }

  handleChange(evt) {
    this.setState({
      songId: evt.target.value,
      error: false
    });
  }

  handleSubmit(evt) {

    evt.preventDefault();

    const playlistId = this.props.selectedPlaylist.id;
    const songId = this.state.songId;

    this.props.addSongToPlaylist(playlistId, songId)
    .catch(() => this.setState({ error: true }));

  }

  render() {

    const error = this.state.error;
    const songId = this.state.songId;

    return (
      <AddSong
        {...this.props}
        error={error}
        songId={songId}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}/>
    );
  }
}

function mapStateToProps (storeState) {
  return {
    songs: storeState.songs,
    selectedPlaylist: storeState.playlists.selected
  };
}

// must be witty considering its brevity
// const mapStateToProps = ({songs}) => ({songs});

// function mapDispatchToProps (dispatch) {
//   return {
//     loadAllSongs: function () {
//       return dispatch(loadAllSongs());
//     },
//     addSongToPlaylist: function (playlistId, songId) {
//       return dispatch(addSongToPlaylist(playlistId, songId));
//     }
//   };
// }

// object form for mapDispatchToProps
const mapDispatchToProps = {
  // left hand side: prop name, right hand side: action creator
  loadAllSongs: loadAllSongs,
  addSongToPlaylist: addSongToPlaylist
};

const AddSongReduxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSongLocalStateContainer);

export default AddSongReduxContainer;
