"use strict";

angular.module('app.admin').controller('ModelosCtrl', function ($scope, $state, $location, MensajeService,
  ModeloFactory, CategoriaFactory) {

  $scope.form = {};

  $scope.registrarModelo = function(){
    $scope.form.categoria = {"id": $scope.form.categoria};
    console.log($scope.form);
    ModeloFactory.registrar($scope.form, function (response){
        console.log(response);
        if(response.respuesta == undefined){
          window.history.back();
          MensajeService.showInfoMessage("Modelo registrado exitósamente");
        }else if(response.respuesta == 'modelo-existe'){
          MensajeService.showInfoMessage("Ya existe un modelo con el mismo nombre.");
        }
    });
  };

  $scope.eliminarModelo = function(id){
    var r = window.confirm ('¿Seguro que desea eliminar este modelo?');
    if(r){
      ModeloFactory.eliminar(id, function (response){
        if (response.respuesta == "eliminacion-exitosa"){
          MensajeService.showInfoMessage("Modelo eliminado exitósamente");
          $scope.listaModelos();
        }else if(response.respuesta == "modelo-en-uso"){
          MensajeService.showInfoMessage("Este modelo tiene equipos y/o formatos de reporte asociados. Por lo tanto, no es posible eliminarlo.");
        }else if(response.respuesta == "modelo-no-existe"){
          MensajeService.showInfoMessage("Este modelo no existe.");
        }
      });
    }
  }

  $scope.listaModelos = function(){
    ModeloFactory.lista(function(data){
      console.log(data);
      $scope.lista = data;
    });
  };

  $scope.listaCategorias = function(){
    CategoriaFactory.lista(function(data){
      console.log(data);
      $scope.categorias = data;
      $scope.form.categoria = $scope.categorias[0].id;
    });
  };

  if ($location.$$url == '/modelos') {
      console.log("Cargando lista de modelos");
      $scope.listaModelos();
  }

  if ($location.$$url == '/modelo/nuevo') {
      console.log("Cargando lista de categorias");
      $scope.listaCategorias();
  }

});

angular.module('app.admin').controller('ModelosEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, CategoriaFactory, ModeloFactory) {

    var modeloId = $stateParams.id;

    // $scope.tiposUsuario = APP_CONSTANT.tiposUsuario;
    $scope.form = {};

    $scope.listaCategorias = function(){
      CategoriaFactory.lista(function(data){
        console.log(data);
        $scope.categorias = data;
      });
    };

    ModeloFactory.getXId(modeloId, function (data){
      console.log(data);
      $scope.form = data;
      $scope.form.categoria = data.categoria.id;

      $scope.listaCategorias();
    });

    $scope.editarModelo = function(){
      $scope.form.categoria = {"id": $scope.form.categoria};
      console.log($scope.form);

      ModeloFactory.editar($scope.form, function (data){
        if(data.respuesta == 'modelo-existe'){
          MensajeService.showInfoMessage("El modelo ingresado ya existe.");
        }else if(data.respuesta == 'actualizacion-exitosa'){
          window.history.back();
          MensajeService.showInfoMessage("Cliente actualizado exitósamente");
        }
      });
    };

});
