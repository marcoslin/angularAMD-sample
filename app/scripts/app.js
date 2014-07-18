define(["angularAMD","angular-ui-router","angular-resource","main/nav_service"], function (angularAMD) {
  var app = angular.module("angularAmdSample", ["ui.router", "ngResource"]);

  app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state("home", angularAMD.route({
        url: '/home',
        templateUrl: 'views/home.html',
        controllerUrl: 'main/home_ctrl'
      }))
      .state("rooms", angularAMD.route({
        url: '/rooms',
        templateUrl: 'views/rooms.html',
        controllerUrl: 'rooms/rooms_ctrl'
      }))
      .state("users", angularAMD.route({
        url: '/users',
        templateUrl: 'views/users.html',
        controllerUrl: 'users/users_ctrl'
      }))
    ;

    // Else
    $urlRouterProvider
      .otherwise("/home");


  }]);

  return angularAMD.bootstrap(app);
});
