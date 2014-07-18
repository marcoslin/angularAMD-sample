define(['angularAMD'], function (angularAMD) {
  angularAMD.controller("navMenuController", function ($scope, $state) {
    $scope.isTabActive = function (tabName) {
      if (tabName === $state.current.name) {
        return "active";
      }
    };
  });

  angularAMD.directive('navMenu', function () {
    return {
      restrict: 'A',
      controller: 'navMenuController',
      templateUrl: 'scripts/main/templates/nav.html'
    };
  });
});
