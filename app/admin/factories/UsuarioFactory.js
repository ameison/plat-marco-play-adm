'use strict';

angular.module('app.admin').factory('UsuarioFactory', function ($http, APP_CONSTANT) {

    var usuarioFactory = {}

     usuarioFactory.lista = function (callback) {
        $http.get(APP_CONSTANT.apiRest + '/usuarios').then(function (response) {
            callback(response.data);
        });
    }

    usuarioFactory.registrar = function (data, callback) {
        $http.post(APP_CONSTANT.apiRest+'/usuario', data).then(function (resultado) {
           callback(resultado.data);
        });
    };

    usuarioFactory.getXId = function (id, callback) {
        $http.get(APP_CONSTANT.apiRest + '/usuario/'+id).then(function (response) {
            callback(response.data);
        });
    }

    usuarioFactory.editar = function (data, callback) {
        $http.put(APP_CONSTANT.apiRest+'/usuario', data).then(function (resultado) {
           callback(resultado.data);
        });
    };

    usuarioFactory.eliminar = function (clienteId, callback) {
        $http.delete(APP_CONSTANT.apiRest + '/usuario/' + clienteId).then(function (response) {
            callback(response.data);
        });
    }

    usuarioFactory.generarExcelUsuarios = function () {
      $http({
        url: APP_CONSTANT.apiRest + '/usuarios/descargar-excel',
        method: "GET",
        responseType: 'arraybuffer'
      }).success(function (data, status, headers, config) {
        saveAs(new Blob([data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), "usuarios.xls");
      }).error(function (data, status, headers, config) {
        console.log("error al descargar excel usuarios");
      });
    }

    return usuarioFactory;
});
