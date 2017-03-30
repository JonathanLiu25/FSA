import React from 'react';

import Artists from '../components/Artists';
import FilterArtist from '../components/FilterArtist';

class ArtistsContainer extends React.Component {
  render () {
    return (
      <div>
        <FilterArtist />
        <Artists artists={[]} />
      </div>
    );
  }
}

export default ArtistsContainer;
