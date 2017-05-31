'use strict';

juke.directive('doubleClick', function ($parse) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var doubleClickExecutor = $parse(attrs.doubleClick);
      element.on('dblclick', function () {
        doubleClickExecutor(scope);
      });
    }
  };
});