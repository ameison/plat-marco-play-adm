'use strict';

angular.module('app', [
  'ui.bootstrap',
  'ui.router',
  'ngCookies',
  'ngMessages',
  'ngStorage',
  'satellizer',
  'ang-drag-drop',
  'naif.base64',
  'angularMoment',
  'daterangepicker',
  'chart.js',
  // 'ngRightClick',
  //Apps intenas
  'app.common',
  'app.admin',
  'app.auth'
])

.run(function(amMoment) {
  amMoment.changeLocale('es');
})

.constant('APP_CONSTANT', {
  // 'apiRest': "http://192.168.1.116:9000/rest-sigeslub",
  // 'apiRest': "http://181.65.173.245/rest-sigeslub",
  'apiRest': "http://35.184.167.220/rest-sigeslub",
  'tiposUsuario' : [
    { "id": "INS", "nombre": "Inspector" },
    { "id": "SOP", "nombre": "Soporte" },
    { "id": "SUP", "nombre": "Supervisor Marco" },
    { "id": "ADM", "nombre": "Administrador" },
    { "id": "CLI", "nombre": "Supervisor Mina" }
  ],
  'tiposInspeccion' : [
    { "id": "IS", "nombre": "Inspección SCL" },
    { "id": "MT", "nombre": "Monitoreo temperatura" },
    { "id": "MC", "nombre": "Eventos" },
    { "id": "IE", "nombre": "Inspección engranaje" }
  ],
  'prioridadInspeccion' : [
    { "id": "AL", "nombre": "Alta" },
    { "id": "NO", "nombre": "Normal" },
    { "id": "BA", "nombre": "Baja" }
  ],
  'estadosInspeccion' : [
    { "id": "P", "nombre": "Proceso" },
    { "id": "O", "nombre": "Observado" },
    { "id": "F", "nombre": "Finalizado" }
  ],
  'estadosHistorialInspeccion' : [
    { "id": "INS", "nombre": "Inspección" },
    { "id": "REV", "nombre": "Revisión" },
    { "id": "APR", "nombre": "Aprobado" }
  ]

})

.config(function ($provide, $httpProvider, $authProvider, APP_CONSTANT) {
    $authProvider.loginUrl = APP_CONSTANT.apiRest + "/login";
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'satellizer';
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.tokenType = 'Bearer';
    $authProvider.storageType = 'localStorage';
})

.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: true
    });
  }])

.run(function ($rootScope, $state, $stateParams) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.go = $state.go.bind($state);

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, error) {
        $rootScope.data = toState.data;
        console.log(toState.data);
    });

});
