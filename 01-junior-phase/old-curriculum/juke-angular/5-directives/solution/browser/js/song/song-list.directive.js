'use strict';

juke.directive('songList', function (PlayerFactory) {
  return {
    restrict: 'E',
    templateUrl: '/js/song/templates/song-list.html',
    scope: {
      songs: '='
    },
    link: function (scope) {

      scope.toggle = function (song) {
       if (song !== PlayerFactory.getCurrentSong()) {
         PlayerFactory.start(song, scope.songs);
       } else if ( PlayerFactory.isPlaying() ) {
         PlayerFactory.pause();
       } else {
         PlayerFactory.resume();
       }
     };

     scope.getCurrentSong = function () {
       return PlayerFactory.getCurrentSong();
     };

     scope.isPlaying = function (song) {
       return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
     };
   }
 };
});