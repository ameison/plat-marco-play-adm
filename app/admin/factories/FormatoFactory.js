'use strict';

angular.module('app.admin').factory('FormatoFactory', function ($http, APP_CONSTANT) {

    var formatoFactory = {}

    formatoFactory.lista = function (callback) {
        $http.get(APP_CONSTANT.apiRest + '/furs').then(function (response) {
            callback(response.data);
        });
    }

    formatoFactory.getXId = function (id, callback) {
        $http.get(APP_CONSTANT.apiRest + '/fur/'+id).then(function (response) {
            callback(response.data);
        });
    }

    formatoFactory.registrar = function (data, callback) {
        $http.post(APP_CONSTANT.apiRest+'/fur', data).then(function (resultado) {
           callback(resultado.data);
        });
    };

    formatoFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/fur', data).then(function (resultado) {
         callback(resultado.data);
      });
    }

    formatoFactory.eliminar = function (id, callback) {
        $http.delete(APP_CONSTANT.apiRest + '/fur/' + id).then(function (response) {
            callback(response.data);
        });
    }

    return formatoFactory;
});
