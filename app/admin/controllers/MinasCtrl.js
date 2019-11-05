"use strict";

angular.module('app.admin').controller('MinasCtrl', function ($scope, $state, $location, MensajeService,
  MinaFactory) {

  $scope.form = {};

  $scope.registrarMina = function(){

    console.log(JSON.stringify($scope.form));

    MinaFactory.registrar($scope.form, function (response){
      console.log(response);
      if(response.respuesta == undefined){
        window.history.back();
        MensajeService.showInfoMessage("Mina registrada exitósamente");
      }else if(response.respuesta == 'mina-existe'){
        MensajeService.showInfoMessage("Ya existe una mina con el mismo nombre.");
      }
    });
  };

  $scope.nuevoLogo = function (file, obj) {
    $scope.form.logo = obj.base64
  };

  $scope.eliminarMina = function(id){
    var r = window.confirm ('¿Seguro que desea eliminar esta mina?');
    if(r){
      MinaFactory.eliminar(id, function (response){
        if (response.respuesta == "eliminacion-exitosa"){
          MensajeService.showInfoMessage("Mina eliminada exitósamente.");
          $scope.listaMinas();
        }else if(response.respuesta == "mina-en-uso"){
          MensajeService.showInfoMessage("Esta mina tiene superintendencias asociadas. Por lo tanto, no es posible eliminarla.");
        }else if(response.respuesta == "mina-no-existe"){
          MensajeService.showInfoMessage("Esta mina no existe.");
        }
      });
    }
  }

  $scope.listaMinas = function(){
    MinaFactory.lista(function(data){
      $scope.lista = data;
    });
  };


  if ($location.$$url == '/minas') {
      console.log("Cargando lista de minas");
      $scope.listaMinas();
  }

});

angular.module('app.admin').controller('MinasEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, MinaFactory) {

    var minaId = $stateParams.id;

    $scope.form = {};

    MinaFactory.getXId(minaId, function (data){
      console.log(data);
      $scope.form = data;
    });

    $scope.editarMina = function(){
      console.log($scope.form);
      MinaFactory.editar($scope.form, function (data){
        if(data.respuesta == 'mina-existe'){
          MensajeService.showInfoMessage("La mina ingresada ya existe.");
        }else if(data.respuesta == 'actualizacion-exitosa'){
          window.history.back();
          MensajeService.showInfoMessage("Mina actualizada exitósamente");
        }
      });
    };

    $scope.nuevoLogo = function (file, obj) {
      $scope.form.logo = obj.base64
    };

});
