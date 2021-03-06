import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import AppContainer from './containers/AppContainer';
import Albums from './components/Albums';
import Album from './components/Album';
import ArtistsContainer from './containers/ArtistsContainer';
import NewPlaylistContainer from './containers/NewPlaylistContainer';
import SinglePlaylist from './components/SinglePlaylist';
import Artist from './components/Artist';
import Songs from './components/Songs';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={AppContainer} foo={'foo'}>
      <Route path="/albums" component={Albums} />
      <Route path="/albums/:albumId" component={Album} />
      <Route path="/artists" component={ArtistsContainer} />
      <Route path="/playlists/new" component={NewPlaylistContainer} />
      <Route path="/playlists/:id" component={SinglePlaylist} />
      <Route path="/artists/:artistId" component={Artist}>
        <Route path="/artists/:artistId/albums" component={Albums} />
        <Route path="/artists/:artistId/songs" component={Songs} />
      </Route>
      <IndexRedirect to='/albums' />
    </Route>
  </Router>,
  document.getElementById('app')
);
