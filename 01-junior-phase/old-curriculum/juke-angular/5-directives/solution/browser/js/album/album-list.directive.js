'use strict';

juke.directive('albumList', function () {
  return {
    restrict: 'E',
    scope: {
      theList: '='
    },
    templateUrl: '/js/album/templates/album-list.html'
  };
});