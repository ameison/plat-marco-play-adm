'use strict';

angular.module('app.admin').factory('CategoriaFactory', function ($http, APP_CONSTANT) {

    var categoriaFactory = {}

     categoriaFactory.lista = function (callback) {
        $http.get(APP_CONSTANT.apiRest + '/categorias').then(function (response) {
            callback(response.data);
        });
    }

    categoriaFactory.getXId = function (id, callback) {
        $http.get(APP_CONSTANT.apiRest + '/categoria/'+id).then(function (response) {
            callback(response.data);
        });
    }

    categoriaFactory.registrar = function (data, callback) {
        $http.post(APP_CONSTANT.apiRest+'/categoria', data).then(function (resultado) {
           callback(resultado.data);
        });
    };

    categoriaFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/categoria', data).then(function (resultado) {
         callback(resultado.data);
      });
    }

    categoriaFactory.eliminar = function (id, callback) {
      $http.delete(APP_CONSTANT.apiRest + '/categoria/' + id).then(function (response) {
          callback(response.data);
      });
    }

    return categoriaFactory;
});
