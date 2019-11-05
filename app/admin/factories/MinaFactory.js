'use strict';

angular.module('app.admin').factory('MinaFactory', function ($http, APP_CONSTANT) {

    var minaFactory = {}

    minaFactory.lista = function (callback) {
        $http.get(APP_CONSTANT.apiRest + '/minas').then(function (response) {
            callback(response.data);
        });
    }

    minaFactory.getXId = function (id, callback) {
        $http.get(APP_CONSTANT.apiRest + '/mina/'+id).then(function (response) {
            callback(response.data);
        });
    }

    minaFactory.registrar = function (data, callback) {
        $http.post(APP_CONSTANT.apiRest+'/mina', data).then(function (resultado) {
           callback(resultado.data);
        });
    };

    minaFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/mina', data).then(function (resultado) {
         callback(resultado.data);
      });
    }

    minaFactory.eliminar = function (id, callback) {
      $http.delete(APP_CONSTANT.apiRest + '/mina/' + id).then(function (response) {
          callback(response.data);
      });
    }

    return minaFactory;
});
