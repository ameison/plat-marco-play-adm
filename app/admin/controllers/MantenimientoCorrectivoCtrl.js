"use strict";

angular.module('app.admin').controller('MantenimientoCorrectivoCtrl', function ($scope, $state, $location, MensajeService,
  CategoriaFactory, MinaFactory, EquipoFactory, InspeccionFactory, APP_CONSTANT, $q, $http, $localStorage) {

  $scope.form = {};
  $scope.form.tipoSeguimiento = APP_CONSTANT.tiposInspeccion[2].id;

  $scope.dataForm = undefined;

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

  if ($location.$$url == '/seguimiento-mantenimiento-correctivo') {

    $scope.tipoUsuario = $localStorage.user.usuario_tipo;
    $scope.form.mina = $localStorage.user.mina_id;

    $scope.listaCategorias();
    if ($scope.tipoUsuario != "CLI"){
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

      EquipoFactory.getMantenimientoCorrectivo($scope.dataForm, function(data){
        $scope.seguimientos = data
        if ($scope.seguimientos == 0){
          MensajeService.showInfoMessage("No se encontraron resultados");
        }
      });

    }else{
      MensajeService.showInfoMessage("Elija una opción de categoría de equipos");
    }

  }

  $scope.descargarExcel = function() {
    InspeccionFactory.descargarExcelCorrectivo($scope.dataForm);
  }

  $scope.descargarHistorial = function(){
    InspeccionFactory.descargarHistorialCorrectivo();
  }

});
