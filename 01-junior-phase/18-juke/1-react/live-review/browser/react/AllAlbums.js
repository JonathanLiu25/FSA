import axios from 'axios';
import React from 'react';

class AllAlbums extends React.Component {
  render () {
    return (
      <div className="col-xs-10">
        <h3>Albums</h3>
        <div className="row">

          {this.props.theAlbums.map((album) => {
            return (
              <div key={album.id} className="col-xs-4">
                <a className="thumbnail" href="#" onClick={() => {
                  this.props.selectAnAlbum(album);
                }}>
                  <img src={`/api/albums/${album.id}/image`} />
                  <div className="caption">
                    <h5>
                      <span>{album.name}</span>
                    </h5>
                    <small>{album.songs.length}</small>
                  </div>
                </a>
              </div>
            );
          })}

        </div>

      </div>
    );
  }
}

export default AllAlbums;
