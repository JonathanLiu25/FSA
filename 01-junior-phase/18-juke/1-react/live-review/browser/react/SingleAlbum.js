import React from 'react';

function SingleAlbum (props) {
  if (!props.album || !props.album.songs) {
    return (
      <h3>Ask again later...</h3>
    );
  }
  return (
    <div className="album col-xs-10">
      <div>
        <h3>{props.album.name}</h3>
        <img src={`/api/albums/${props.album.id}/image`} className="img-thumbnail" />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {props.album.songs.map(function (song) {
            return (
              <tr key={song.id}>
                <td>
                  <button className="btn btn-default btn-xs">
                    <span className="glyphicon glyphicon-play"></span>
                  </button>
                </td>
                <td>{song.name}</td>
                <td>{song.artists.map(a => a.name).join(', ')}</td>
                <td>{song.genre}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SingleAlbum;
