"use strict";

angular.module('app.admin').controller('SuperintendenciasCtrl', function ($scope, $state, $location, MensajeService,
  SuperintendenciaFactory, MinaFactory) {

  $scope.form = {};

  $scope.registrarSuperintendencia = function(){
    $scope.form.mina = {"id": $scope.form.mina};
    console.log($scope.form);
    SuperintendenciaFactory.registrar($scope.form, function (response){
        console.log(response);
        if(response.respuesta == undefined){
          window.history.back();
          MensajeService.showInfoMessage("Superintendencia registrada exitósamente");
        }else if(response.respuesta == 'superintendencia-existe'){
          MensajeService.showInfoMessage("Ya existe una superintendencia con el mismo nombre.");
        }
    });
  };

  $scope.eliminarSuperintendencia = function(id){
    var r = window.confirm ('¿Seguro que desea eliminar esta superintendencia?');
    if(r){
      SuperintendenciaFactory.eliminar(id, function (response){
        if (response.respuesta == "eliminacion-exitosa"){
          MensajeService.showInfoMessage("Superintendencia eliminada exitósamente.");
          $scope.listaSuperintendencias();
        }else if(response.respuesta == "superintendencia-en-uso"){
          MensajeService.showInfoMessage("Esta superintendencia tiene equipos asociados. Por lo tanto, no es posible eliminarla.");
        }else if(response.respuesta == "superintendencia-no-existe"){
          MensajeService.showInfoMessage("Esta superintendencia no existe.");
        }
      });
    }
  }

  $scope.listaSuperintendencias = function(){
    SuperintendenciaFactory.lista(function(data){
      console.log(data);
      $scope.lista = data;
    });
  };

  $scope.listaMinas = function(){
    MinaFactory.lista(function(data){
      console.log(data);
      $scope.minas = data;
      $scope.form.mina = $scope.minas[0].id;
    });
  };

  if ($location.$$url == '/superintendencias') {
      console.log("Cargando lista de superintendencias");
      $scope.listaSuperintendencias();
  }

  if ($location.$$url == '/superintendencia/nuevo') {
      console.log("Cargando lista de minas");
      $scope.listaMinas();
  }

});

angular.module('app.admin').controller('SuperintendenciasEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, SuperintendenciaFactory, MinaFactory) {

    var superintendenciaId = $stateParams.id;

    $scope.form = {};

    SuperintendenciaFactory.getXId(superintendenciaId, function (data){
      console.log(data);
      $scope.form = data;
      $scope.form.mina = data.mina.id;
    });

    $scope.editarSuperintendencia = function(){
      $scope.form.mina = {"id": $scope.form.mina};
      console.log($scope.form);

      SuperintendenciaFactory.editar($scope.form, function (data){
        if(data.respuesta == 'superintendencia-existe'){
          MensajeService.showInfoMessage("La superintendencia ingresada ya existe.");
        }else if(data.respuesta == 'actualizacion-exitosa'){
          window.history.back();
          MensajeService.showInfoMessage("Superintendencia actualizada exitósamente");
        }
      });
    };

    $scope.listaMinas = function(){
      MinaFactory.lista(function(data){
        console.log(data);
        $scope.minas = data;
        $scope.form.mina = $scope.minas[0].id;
      });
    };

    $scope.listaMinas();

});
