define(['angularAMD'], function (angularAMD) {
  'use strict';
  angularAMD.controller('navMenuController', ['$scope', '$state', function ($scope, $state) {
    $scope.isTabActive = function (tabName) {
      // Check if there is sub-states
      var stateName = $state.current.name,
        subStatePos = stateName.indexOf('.');

      if (subStatePos > -1) {
        stateName = stateName.substring(0,subStatePos);
      }

      if (tabName === stateName) {
        return 'active';
      }
    };
  }]);

  angularAMD.directive('navMenu', function () {
    return {
      restrict: 'A',
      controller: 'navMenuController',
      templateUrl: 'scripts/main/templates/nav.html'
    };
  });
});
