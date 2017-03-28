import React from 'react';
import ReactDOM from 'react-dom';

function Main () {
  return (
    <div>
      <div className="row">
        <div className="col-xs-2">
          <sidebar>
            <img src="juke.svg" className="logo" />
            <section>
              <h4 className="menu-item active">
                <a href="#">ALBUMS</a>
              </h4>
            </section>
          </sidebar>
        </div>

        <div className="col-xs-10">
          <h3>Albums</h3>
          <div className="row">

            <div className="col-xs-4">
              <a className="thumbnail" href="#">
                <img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMoneIMAGE&w=300&h=300" />
                <div className="caption">
                  <h5>
                    <span>ALBUM ONE NAME HERE</span>
                  </h5>
                  <small>NUMBER OF SONGS HERE songs</small>
                </div>
              </a>
            </div>

            <div className="col-xs-4">
              <a className="thumbnail" href="#">
                <img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMtwoIMAGE&w=300&h=300" />
                <div className="caption">
                  <h5>
                    <span>ALBUM TWO NAME HERE</span>
                  </h5>
                  <small>NUMBER OF SONGS HERE songs</small>
                </div>
              </a>
            </div>

          </div>

          <div className="album">
            <div>
              <h3>I SHOULD BE AN ALBUM NAME</h3>
              <img src="https://placeholdit.imgix.net/~text?txtsize=33&txt=IshouldBEanIMAGE&w=300&h=300" className="img-thumbnail" />
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
                <tr>
                  <td>
                    <button className="btn btn-default btn-xs">
                      <span className="glyphicon glyphicon-play"></span>
                    </button>
                  </td>
                  <td>I SHOULD BE A SONG NAME</td>
                  <td>I SHOULD BE A STRING OF THIS SONG'S ARTISTS</td>
                  <td>I SHOULD BE A SONG GENRE</td>
                </tr>
                <tr>
                  <td>
                    <button className="btn btn-default btn-xs">
                      <span className="glyphicon glyphicon-play"></span>
                    </button>
                  </td>
                  <td>I SHOULD BE ANOTHER SONG NAME</td>
                  <td>I SHOULD BE A STRING OF THAT SONG'S ARTISTS</td>
                  <td>I SHOULD BE A SONG GENRE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <footer>
          <div className="pull-left">
            <button className="btn btn-default">
              <span className="glyphicon glyphicon-step-backward"></span>
            </button>
            <button className="btn btn-default">
              <span className="glyphicon glyphicon-play"></span>
            </button>
            <button className="btn btn-default">
              <span className="glyphicon glyphicon-step-forward"></span>
            </button>
          </div>
          <div className="bar">
            <div className="progress">
              <div className="progress-bar"></div>
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}

ReactDOM.render(
  <Main />,
  document.getElementById('main')
);
