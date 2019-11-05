"use strict";

angular.module('app.admin').controller('MonitoreoTemperaturaCtrl', function ($scope, $state, $location, MensajeService,
  CategoriaFactory, MinaFactory, EquipoFactory, InspeccionFactory, APP_CONSTANT, $localStorage) {

  $scope.form = {};
  $scope.form.tipoSeguimiento = APP_CONSTANT.tiposInspeccion[1].id;
  $scope.tipoUsuario = $localStorage.user.usuario_tipo;
  $scope.form.mina = $localStorage.user.mina_id;

  $scope.listaCategorias = function(){
    CategoriaFactory.lista(function(data){
      console.log(data);
      $scope.categorias = data;
      $scope.form.categorias = $scope.categorias[0].id;
    });
  };

  $scope.listaMinas = function(){
    MinaFactory.lista(function(data){
      console.log(data);
      $scope.minas = data;
      $scope.form.mina = $scope.minas[0].id;
    });
  };

  if ($location.$$url == '/seguimiento-monitoreo-temperatura') {
    $scope.listaCategorias();
    if ($scope.tipoUsuario != 'CLI'){
      $scope.listaMinas();
    }
  }

  $scope.obtenerGrafico = function (){
    var categoriasIds = [];
    for (var i = 0; i < $scope.categorias.length; i++) {
      if ($scope.categorias[i].checked){
        categoriasIds.push($scope.categorias[i].id);
      }
    }

    if (categoriasIds.length > 0){
      var datos = {
        "minaId": $scope.form.mina,
        "categorias": categoriasIds,
        "tipoSeguimiento": $scope.form.tipoSeguimiento
      }

      console.log("data seguimiento", datos);

      EquipoFactory.getMonitoreoTemperatura(datos, function(data){
        if (data.length == 0){
          MensajeService.showInfoMessage("No se encontraron resultados");
        }
        $scope.seguimientos = data
        console.log($scope.seguimientos);
      });
    }else{
      MensajeService.showInfoMessage("Elija una opción de categoría de equipos");
    }

  }

  $scope.generarExcel = function(equipoId){
    InspeccionFactory.generarExcelTemperatura(equipoId);
  }

});
