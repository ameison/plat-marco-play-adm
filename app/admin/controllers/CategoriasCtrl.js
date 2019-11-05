"use strict";

angular.module('app.admin').controller('CategoriasCtrl', function ($scope, $state, $location, MensajeService,
  CategoriaFactory) {

  $scope.form = {};

  $scope.registrarCategoria = function(){
      console.log($scope.form);
      CategoriaFactory.registrar($scope.form, function (response){
          console.log(response);
          if(response.respuesta == undefined){
            window.history.back();
            MensajeService.showInfoMessage("Categoria registrada exitósamente");
          }else if(response.respuesta == 'categoria-existe'){
            MensajeService.showInfoMessage("Ya existe una categoría con el mismo nombre.");
          }
      });
  };

  $scope.eliminarCategoria = function(id){
    var r = window.confirm ('¿Seguro que desea eliminar esta categoría?');
    if(r){
      CategoriaFactory.eliminar(id, function (response){
        if (response.respuesta == "eliminacion-exitosa"){
          MensajeService.showInfoMessage("Categoria eliminada exitósamente");
          $scope.listaCategorias();
        }else if (response.respuesta == "categoria-en-uso"){
          MensajeService.showInfoMessage("Esta categoría tiene modelos asociados. Por lo tanto, no es posible eliminarla.");
        }else if (response.respuesta == "categoria-no-existe"){
          MensajeService.showInfoMessage("Esta categoria no existe.");
        }
      });
    }
  }

  $scope.listaCategorias = function(){
    CategoriaFactory.lista(function(data){
      $scope.lista = data;
    });
  };


  if ($location.$$url == '/categorias') {
      console.log("Cargando lista de categorias");
      $scope.listaCategorias();
  }

});

angular.module('app.admin').controller('CategoriasEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, CategoriaFactory) {

    var categoriaId = $stateParams.id;

    $scope.form = {};

    CategoriaFactory.getXId(categoriaId, function (data){
      console.log(data);
      $scope.form = data;
    });

    $scope.editarCategoria = function(){
      console.log($scope.form);
      CategoriaFactory.editar($scope.form, function (data){
        if(data.respuesta == 'categoria-existe'){
          MensajeService.showInfoMessage("La categoría ingresada ya existe.");
        }else if(data.respuesta == 'actualizacion-exitosa'){
          window.history.back();
          MensajeService.showInfoMessage("Categoría actualizada exitósamente");
        }
      });
    };

});
