import axios from 'axios';
import React from 'react';

import Sidebar from './Sidebar';
import AllAlbums from './AllAlbums';
import Footer from './Footer';
import SingleAlbum from './SingleAlbum';

class Main extends React.Component {
  constructor () {
    super();
    this.state = {
      allAlbumsList: [],
      selectedAlbum: {}
    };
    this.switchToAnAlbum = this.switchToAnAlbum.bind(this);
  }
  componentDidMount () {
    axios.get('/api/albums')
    .then(response => {
      console.trace();
      const allAlbumsData = response.data;
      // set the state, trigger re-render
      this.setState({
        allAlbumsList: allAlbumsData
      });
    });
  }
  switchToAnAlbum (theAlbumToSelect) {
    axios.get(`/api/albums/${theAlbumToSelect.id}`)
    .then((response) => {
      this.setState({
        selectedAlbum: response.data
      });
    });
  }
  render () {
    console.log(this);
    const allAlbumsOrJustOneWhoKnows = this.state.selectedAlbum.id ?
      <SingleAlbum album={this.state.selectedAlbum} />
      :
      (
        <AllAlbums
          theAlbums={this.state.allAlbumsList}
          selectAnAlbum={this.switchToAnAlbum} />
      );
    // if our JSX appears on a newline, put a parens before it starts
    return (
      <div>
        <div className="row">
          <Sidebar albums={this.state.allAlbumsList} />
          {/* if our JSX needs actual JS interpolation (values, expressions) inside it, wrap it with curly braces */}
          {allAlbumsOrJustOneWhoKnows}
        </div>

        <Footer />

      </div>
    );
  }
}

export default Main;
