'use strict';

angular.module('app.admin').factory('EquipoFactory', function ($http, APP_CONSTANT) {

    var equipoFactory = {}

    equipoFactory.lista = function (callback) {
      $http.get(APP_CONSTANT.apiRest + '/equipos').then(function (response) {
        callback(response.data);
      });
    }

    equipoFactory.getXId = function (id, callback) {
      $http.get(APP_CONSTANT.apiRest + '/equipo/'+id).then(function (response) {
        callback(response.data);
      });
    }

    equipoFactory.getXMina = function (id, callback) {
     $http.get(APP_CONSTANT.apiRest + '/equipos/mina/'+id ).then(function (response) {
       callback(response.data);
     });
    }

    equipoFactory.getXSuperintendencia = function (id, callback) {
     $http.get(APP_CONSTANT.apiRest + '/equipos/superintendencia/'+id).then(function (response) {
       callback(response.data);
     });
    }

    equipoFactory.registrar = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest+'/equipo', data).then(function (resultado) {
       callback(resultado.data);
      });
    };

    equipoFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/equipo', data).then(function (resultado) {
       callback(resultado.data);
      });
    }

    equipoFactory.eliminar = function (equipoId, callback) {
      $http.delete(APP_CONSTANT.apiRest + '/equipo/' + equipoId).then(function (response) {
        callback(response.data);
      });
    }

    equipoFactory.getSeguimiento = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest + '/equipos/seguimiento', data).then(function (resultado) {
        callback(resultado.data);
      });
    }

    equipoFactory.getEstadisticaCliDias = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest + '/estadistica/dias', data).then(function (resultado) {
        callback(resultado.data);
      });
    }

    equipoFactory.getMantenimientoCorrectivo = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest + '/equipos/mantenimiento-correctivo', data).then(function (resultado) {
        callback(resultado.data);
      });
    }

    equipoFactory.getMonitoreoTemperatura = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest + '/equipos/monitoreo-temperatura', data).then(function (resultado) {
        callback(resultado.data);
      });
    }

    return equipoFactory;
});
