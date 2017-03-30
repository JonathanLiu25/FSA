import React from 'react';

import Artists from '../components/Artists';
import FilterArtist from '../components/FilterArtist';

class ArtistsContainer extends React.Component {
  constructor () {
    super();
    this.state = {
      searchText: ''
    };
  }
  render () {
    const filteredArtists = this.props.artists
    .filter((artist) => {
      return artist.name.toLowerCase().includes(this.state.searchText.toLowerCase());
    });
    return (
      <div>
        <FilterArtist
          updateSearchText={newSearchTextValue => {
            this.setState({
              searchText: newSearchTextValue
            });
          }} />
        <Artists artists={filteredArtists} />
      </div>
    );
  }
}

export default ArtistsContainer;
