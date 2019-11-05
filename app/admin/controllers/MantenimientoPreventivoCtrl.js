"use strict";

angular.module('app.admin').controller('MantenimientoPreventivoCtrl', function ($scope, $state, $location, MensajeService,
  CategoriaFactory, MinaFactory, EquipoFactory, APP_CONSTANT, InspeccionFactory, $localStorage) {

  $scope.form = {};
  $scope.dataForm = undefined;
  $scope.tipoUsuario = $localStorage.user.usuario_tipo;
  $scope.form.mina = $localStorage.user.mina_id;

  $scope.listaTipoInspeccion = function(){
    $scope.tiposInspeccion = []
    $scope.tiposInspeccion.push(APP_CONSTANT.tiposInspeccion[0])
    $scope.tiposInspeccion.push(APP_CONSTANT.tiposInspeccion[3])
    $scope.form.tipoSeguimiento = $scope.tiposInspeccion[0].id;
  }

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

  if ($location.$$url == '/seguimiento-mantenimiento-preventivo') {
    $scope.listaTipoInspeccion();
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

      $scope.dataForm = {
        "minaId": $scope.form.mina,
        "categorias": categoriasIds,
        "tipoSeguimiento": $scope.form.tipoSeguimiento
      }

      console.log("data seguimiento", $scope.dataForm);

      EquipoFactory.getSeguimiento($scope.dataForm, function(data){
        $scope.seguimientos = data;
        if ($scope.seguimientos.length == 0){
          MensajeService.showInfoMessage("No se encontraron resultados");
        }
      });

    } else {
      MensajeService.showInfoMessage("Elija una opción de categoría de equipos");
    }
  }

  $scope.descargarExcel = function() {
    InspeccionFactory.descargarExcelPreventivo($scope.dataForm);
  }


});
