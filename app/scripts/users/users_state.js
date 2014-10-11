define(['angularAMD'], function (angularAMD) {
  'use strict';
  angularAMD.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('users.list', {
        url: '/list',
        templateUrl: 'views/users/list.html'
      })
      .state('users.search', {
        url: '/search',
        templateUrl: 'views/users/search.html'
      })
      .state('users.favorites', {
        url: '/favorites',
        templateUrl: 'views/users/favorites.html'
      })
    ;

    // Else -- This is not working for some reason:
    $urlRouterProvider
      .when('/users', '/users/list');

  }]);

});
