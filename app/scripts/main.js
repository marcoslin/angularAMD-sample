require.config({
  baseUrl: 'scripts/',

  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': 'ext/angular',
    'angular-route': 'ext/angular-route',
    'angular-ui-router': 'ext/angular-ui-router',
    'angularAMD': 'ext/angularAMD',
    'ngload': 'ext/ngload',
    'angular-resource': 'ext/angular-resource'
  },

  // kick start application
  deps: ['app']
});
