'use strict';

angular.module('app.admin').factory('InspeccionFactory', function ($http, APP_CONSTANT) {

    var inspeccionFactory = {}

    inspeccionFactory.getXCategoriaEquipo = function (id, callback) {
      $http.get(APP_CONSTANT.apiRest + '/inspeccion/categoria-equipo/'+id).then(function (response) {
        callback(response.data);
      });
    }

    inspeccionFactory.getXModelo = function (id, callback) {
      $http.get(APP_CONSTANT.apiRest + '/inspeccion/modelo/'+id).then(function (response) {
        callback(response.data);
      });
    }

    inspeccionFactory.getXMina = function (id, callback) {
      $http.get(APP_CONSTANT.apiRest + '/inspeccion/mina/'+id).then(function (response) {
        callback(response.data);
      });
    }

    inspeccionFactory.getXTipo = function (tipo, callback) {
      $http.get(APP_CONSTANT.apiRest + '/inspeccion/tipo/'+tipo).then(function (response) {
        callback(response.data);
      });
    }

    inspeccionFactory.getXId = function (id, callback) {
      $http.get(APP_CONSTANT.apiRest + '/inspeccion/'+id).then(function (response) {
        callback(response.data);
      });
    }

    inspeccionFactory.editar = function (data, callback) {
      $http.put(APP_CONSTANT.apiRest + '/inspeccion', data).then(function (resultado) {
        callback(resultado.data);
      });
    }

    inspeccionFactory.getConsultaLinea = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest + '/inspecciones/cunsulta-linea', data).then(function (resultado) {
        callback(resultado.data);
      });
    }

    inspeccionFactory.getEstadisticaCliInsScl = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest + '/estadistica/scl', data).then(function (response) {
        callback(response.data);
      });
    }

    inspeccionFactory.getEstadisticaCliInsMc = function (data, callback) {
      $http.post(APP_CONSTANT.apiRest + '/estadistica/mc', data).then(function (response) {
        callback(response.data);
      });
    }

    inspeccionFactory.eliminar = function (id, callback) {
      $http.delete(APP_CONSTANT.apiRest + '/inspeccion/'+id).then(function (response) {
        callback(response.data);
      });
    }

    inspeccionFactory.generarPdf = function (id) {
      $http({
        url: APP_CONSTANT.apiRest + '/generar-pdf/inspeccion/' + id,
        method: "GET",
        responseType: 'arraybuffer'
      }).success(function (data, status, headers, config) {
        saveAs(new Blob([data],{type:"application/pdf"}), "inspeccion_sig"+id+".pdf");
      }).error(function (data, status, headers, config) {
        console.log("error al descargar pdf de inspeccion");
      });
    }

    inspeccionFactory.generarExcelTemperatura = function (equipoId) {
      $http({
        url: APP_CONSTANT.apiRest + '/monitoreo/descargar-excel/' + equipoId,
        method: "GET",
        responseType: 'arraybuffer'
      }).success(function (data, status, headers, config) {
        saveAs(new Blob([data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), "reporte_temperatura.xls");
      }).error(function (data, status, headers, config) {
        console.log("error al descargar excel monitoreo equipo");
      });
    }

    inspeccionFactory.descargarExcelCorrectivo = function (data) {
      $http({
        url: APP_CONSTANT.apiRest + '/correctivo/descargar-excel',
        method: "POST",
        data: data,
        headers: {
           'Content-type': 'application/json'
        },
        responseType: 'arraybuffer'
      }).success(function (data, status, headers, config) {
        saveAs(new Blob([data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), "reporte_correctivo.xls");
      }).error(function (data, status, headers, config) {
        console.log("error al descargar excel inspecciones correctivas");
      });
    }

    inspeccionFactory.descargarHistorialCorrectivo = function () {
      $http({
        url: APP_CONSTANT.apiRest + '/correctivo/historial',
        method: "GET",
        responseType: 'arraybuffer'
      }).success(function (data, status, headers, config) {
        saveAs(new Blob([data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), "historial_correctivo.xls");
      }).error(function (data, status, headers, config) {
        console.log("error al descargar excel monitoreo equipo");
      });
    }

    inspeccionFactory.descargarExcelPreventivo = function (data) {
      $http({
        url: APP_CONSTANT.apiRest + '/seguimiento/descargar-excel',
        method: "POST",
        data: data,
        headers: {
           'Content-type': 'application/json'
        },
        responseType: 'arraybuffer'
      }).success(function (data, status, headers, config) {
        saveAs(new Blob([data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"}), "reporte_preventivo.xls");
      }).error(function (data, status, headers, config) {
        console.log("error al descargar archivo");
      });
    }

    return inspeccionFactory;
});
