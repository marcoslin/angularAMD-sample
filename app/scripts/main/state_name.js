define(['angularAMD'], function (angularAMD) {
  'use strict';
  angularAMD.directive('stateName', ['$state', function ($state) {
    return {
      restrict: 'A',
      link: function (scope, elm, attr) {
        var state = $state.current.name;

        if ('stateName' in attr) {
          state = attr.stateName + ' ' + state;
        }

        elm.text(state);
      }
    };
  }]);
});
