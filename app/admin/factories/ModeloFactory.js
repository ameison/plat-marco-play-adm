'use strict';

angular.module('app.admin').factory('ModeloFactory', function ($http, APP_CONSTANT) {

    var modeloFactory = {}

    modeloFactory.lista = function (callback) {
        $http.get(APP_CONSTANT.apiRest + '/modelos').then(function (response) {
            callback(response.data);
        });
    }

    modeloFactory.getXId = function (id, callback) {
        $http.get(APP_CONSTANT.apiRest + '/modelo/'+id).then(function (response) {
            callback(response.data);
        });
    }

    modeloFactory.listaxCategoria = function (id, callback) {
       $http.get(APP_CONSTANT.apiRest + '/modelos/categoria/' + id).then(function (response) {
           callback(response.data);
       });
   }

    modeloFactory.registrar = function (data, callback) {
        $http.post(APP_CONSTANT.apiRest+'/modelo', data).then(function (resultado) {
           callback(resultado.data);
        });
    };

    modeloFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/modelo', data).then(function (resultado) {
         callback(resultado.data);
      });
    }

    modeloFactory.eliminar = function (id, callback) {
        $http.delete(APP_CONSTANT.apiRest + '/modelo/' + id).then(function (response) {
            callback(response.data);
        });
    }

    return modeloFactory;
});
