'use strict';

angular.module('app.admin').factory('ComponentesFactory', function ($http, APP_CONSTANT) {

    var conponenteFactory = {}

    conponenteFactory.lista = function (callback) {
        $http.get(APP_CONSTANT.apiRest + '/componentes').then(function (response) {
            callback(response.data);
        });
    }

    conponenteFactory.getXId = function (id, callback) {
        $http.get(APP_CONSTANT.apiRest + '/componente/'+id).then(function (response) {
            callback(response.data);
        });
    }

    conponenteFactory.registrar = function (data, callback) {
        $http.post(APP_CONSTANT.apiRest+'/componente', data).then(function (resultado) {
           callback(resultado.data);
        });
    };

    conponenteFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/componente', data).then(function (resultado) {
         callback(resultado.data);
      });
    }

    conponenteFactory.eliminar = function (id, callback) {
      $http.delete(APP_CONSTANT.apiRest + '/componente/' + id).then(function (response) {
          callback(response.data);
      });
    }

    return conponenteFactory;
});
