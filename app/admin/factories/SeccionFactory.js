'use strict';

angular.module('app.admin').factory('SeccionFactory', function ($http, APP_CONSTANT) {

    var seccionFactory = {}

    seccionFactory.lista = function (callback) {
      $http.get(APP_CONSTANT.apiRest + '/secciones').then(function (response) {
        callback(response.data);
      });
    }

    seccionFactory.getXModelo = function (id, callback) {
      $http.get(APP_CONSTANT.apiRest + '/secciones/modelo/'+id).then(function (response) {
        callback(response.data);
      });
    }

    seccionFactory.getXId = function (id, callback) {
      $http.get(APP_CONSTANT.apiRest + '/seccion/'+id).then(function (response) {
        callback(response.data);
      });
    }

    seccionFactory.registrar = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest+'/seccion', data).then(function (resultado) {
        callback(resultado.data);
      });
    };

    seccionFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/seccion', data).then(function (resultado) {
         callback(resultado.data);
      });
    }

    seccionFactory.eliminar = function (id, callback) {
      $http.delete(APP_CONSTANT.apiRest + '/seccion/' + id).then(function (response) {
        callback(response.data);
      });
    }

    return seccionFactory;
});
