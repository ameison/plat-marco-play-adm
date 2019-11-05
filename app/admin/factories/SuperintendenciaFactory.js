'use strict';

angular.module('app.admin').factory('SuperintendenciaFactory', function ($http, APP_CONSTANT) {

    var superintendenciaFactory = {}

    superintendenciaFactory.lista = function (callback) {
        $http.get(APP_CONSTANT.apiRest + '/superintendencias').then(function (response) {
            callback(response.data);
        });
    }

    superintendenciaFactory.getXMinaId = function (id, callback) {
        $http.get(APP_CONSTANT.apiRest + '/superintendencias/mina/'+id).then(function (response) {
            callback(response.data);
        });
    }

    superintendenciaFactory.getXId = function (id, callback) {
        $http.get(APP_CONSTANT.apiRest + '/superintendencia/'+id).then(function (response) {
            callback(response.data);
        });
    }

    superintendenciaFactory.registrar = function (data, callback) {
        $http.post(APP_CONSTANT.apiRest+'/superintendencia', data).then(function (resultado) {
           callback(resultado.data);
        });
    };

    superintendenciaFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/superintendencia', data).then(function (resultado) {
         callback(resultado.data);
      });
    }

    superintendenciaFactory.eliminar = function (id, callback) {
        $http.delete(APP_CONSTANT.apiRest + '/superintendencia/' + id).then(function (response) {
            callback(response.data);
        });
    }

    return superintendenciaFactory;
});
