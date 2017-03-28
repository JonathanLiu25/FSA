import React from 'react';

function Sidebar (props) {
  return (
    <div className="col-xs-2">
      <sidebar>
        <img src="juke.svg" className="logo" />
        <section>
          <h4 className="menu-item active">
            <a href="#">ALBUMS</a>
            <ul>
              {props.albums.map(function (album) {
                return <li key={album.id}>{album.name}</li>
              })}
            </ul>
          </h4>
        </section>
      </sidebar>
    </div>
  );
}

export default Sidebar;
