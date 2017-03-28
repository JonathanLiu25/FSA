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
  render () {
    return (
      <div>
        <div className="row">
          <Sidebar albums={this.state.allAlbumsList} />
          <AllAlbums
            theAlbums={this.state.allAlbumsList}
            selectAnAlbum={theAlbumToSelect => {
              this.setState({
                selectedAlbum: theAlbumToSelect
              });
            }} />
          <SingleAlbum album={this.state.selectedAlbum} />
        </div>

        <Footer />

      </div>
    );
  }
}

export default Main;
