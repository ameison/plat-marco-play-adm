'use strict';

angular.module('app.auth', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

      $stateProvider

          .state('auth', {
              abstract: true
          })

          .state('auth.login', {
              url: '/login',
              views: {
                  "root@app": {
                    controller: 'AuthCtrl',
                    templateUrl: 'templates/auth/views/login.html'
                  }
              },
              resolve: {
                  skipIfLoggedIn: skipIfLoggedIn
              }

          })

          .state('auth.logout', {
              url: '/logout',
              views: {
                  "root@app": {
                    controller: 'AuthCtrl'
                  }
              },
              resolve: {
                  skipIfLoggedIn: skipIfLoggedIn
              }

          });

      $urlRouterProvider.otherwise('/login');

      function skipIfLoggedIn($q, $auth, $location, $localStorage) {
        var deferred = $q.defer();
        if ($auth.isAuthenticated()) {
          //console.log("Si");
          $location.path("/");
        } else {
          deferred.resolve();
          //console.log("No");
        }
        return deferred.promise;
      }

});
