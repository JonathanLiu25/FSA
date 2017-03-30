import React from 'react';

import Songs from './Songs';
import AddSong from './AddSong';

class SinglePlaylist extends React.Component {
  render () {
    return (
      <div>
        <h3>PLAYLIST NAME HERE</h3>
        <Songs songs={[]} /> {/** Hooray for reusability! */}
        <AddSong />
        <hr />
      </div>
    );
  }
}

export default SinglePlaylist;
