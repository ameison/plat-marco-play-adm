"use strict";

angular.module('app.admin').controller('mostrarSeccionCtrl', function ($scope, MensajeService, $uibModalInstance, datos ) {
  $scope.seccion = datos.seccion;
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

angular.module('app.admin').controller('FormatosCtrl', function ($scope, $state, $location, MensajeService,
  ModeloFactory, MinaFactory, FormatoFactory, SeccionFactory, $uibModal, APP_CONSTANT) {

  $scope.form = {};
  $scope.seccionesFur = []

  $scope.mdlVerSeccion = function (seccion) {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'htmlMostrarSeccion.html',
      controller: 'mostrarSeccionCtrl',
      resolve: {
        datos: function () {
          return {
            'seccion': seccion
          }
        }
      }
    });
  };

  $scope.registrarFormato = function(){
    generarJsonSeccionesFur();
    $scope.form.modelo = {"id": $scope.form.modelo};
    $scope.form.mina = {"id": $scope.form.mina};
    console.log($scope.form);
    FormatoFactory.registrar($scope.form, function (response){
      console.log(response);
      if(response.respuesta == undefined){
        window.history.back();
        MensajeService.showInfoMessage("Formato registrado exitósamente");
      }else if(response.respuesta == "fur-existe"){
        MensajeService.showInfoMessage("El nombre del formato ya existe");
      }
    });
  };

  function generarJsonSeccionesFur(){
    $scope.form.secciones = [];
    for (var i = 0; i < $scope.seccionesFur.length; i++) {
      var seccionFur = $scope.seccionesFur[i];
      $scope.form.secciones.push({"id": seccionFur.id, "orden": i+1});
    }
  }

  $scope.agregarSeccionAFur = function(seccion){
    var existeSeccion = false;
    for (var i = 0; i < $scope.seccionesFur.length; i++) {
      var seccionFur = $scope.seccionesFur[i];
      if (seccionFur.id == seccion.id){
        existeSeccion = true;
        var r = confirm("La sección ya se encuentra en el formato. ¿Desea agregarla de todas maneras?");
        if (r == true) {
            $scope.seccionesFur.push(seccion);
        }
        break;
      }
    }
    if (!existeSeccion){
      $scope.seccionesFur.push(seccion);
    }
  }

  $scope.removerSeccion = function(idx){
    console.log(idx);
    var r = confirm("¿Desea quitar esta sección del formato?");
    if (r == true) {
        $scope.seccionesFur.splice(idx, 1);
    }
  }

  $scope.eliminarFormato = function(id){
    var r = window.confirm ('¿Seguro que desea eliminar este formato?');
    if(r){
      FormatoFactory.eliminar(id, function (response){
        if (response.respuesta == "eliminacion-exitosa"){
          MensajeService.showInfoMessage("Formato de reporte eliminado exitósamente.");
          $scope.listaFormatos();
        }else if (response.respuesta == "fur-no-existe"){
          MensajeService.showInfoMessage("Este formato de reporte no existe.");
        }
      });
    }
  }

  $scope.listaFormatos = function(){
    FormatoFactory.lista(function(data){
      console.log(data);
      $scope.lista = data;
    });
  };

  $scope.listaModelos = function(){
    ModeloFactory.lista(function(data){
      console.log(data);
      $scope.modelos = data;
      $scope.form.modelo = $scope.modelos[0].id;
      $scope.listaSecciones()
    });
  };

  $scope.listaSecciones = function(){
    SeccionFactory.getXModelo($scope.form.modelo, function(data){
      console.log(data);
      $scope.secciones = data;
    });
  };

  $scope.listaTiposInspeccion = function(){
    $scope.tiposInspeccion = APP_CONSTANT.tiposInspeccion;
    $scope.form.tipoInspeccion = $scope.tiposInspeccion[0].id;
  }

  $scope.listaMinas = function(){
    MinaFactory.lista(function(data){
      console.log(data);
      $scope.minas = data;
      $scope.form.mina = $scope.minas[0].id;
    })
  }

  if ($location.$$url == '/formatos') {
      console.log("Cargando lista de modelos");
      $scope.listaFormatos();
  }

  if ($location.$$url == '/formato/nuevo') {
      console.log("Cargando lista de categorias");
      $scope.listaModelos();
      //$scope.listaSecciones();
      $scope.listaMinas();
      $scope.listaTiposInspeccion();
  }

});

angular.module('app.admin').controller('FormatosEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, FormatoFactory, ModeloFactory, SeccionFactory, MinaFactory, $uibModal, APP_CONSTANT) {

    var formatoId = $stateParams.id;
    $scope.secciones = []
    $scope.form = {};

    $scope.listaModelos = function(){
      ModeloFactory.lista(function(data){
        console.log(data);
        $scope.modelos = data;
      });
    };

    $scope.listaSecciones = function(){
      SeccionFactory.getXModelo($scope.form.modelo, function(data){
        console.log(data);
        $scope.secciones = data;
      });
    };

    $scope.listaMinas = function(){
      MinaFactory.lista(function(data){
        console.log(data);
        $scope.minas = data;
      })
    }

    $scope.listaTiposInspeccion = function(){
      $scope.tiposInspeccion = APP_CONSTANT.tiposInspeccion;
      //$scope.form.tipoInspeccion = $scope.tiposInspeccion[0].id;
    }

    $scope.listaModelos();
    $scope.listaMinas();
    //$scope.listaSecciones();
    $scope.listaTiposInspeccion();

    FormatoFactory.getXId(formatoId, function (data){
      console.log(data);
      $scope.form = data;
      $scope.form.modelo = data.modelo.id;
      $scope.form.mina = data.mina.id;

      $scope.listaSecciones();

    });

    $scope.editarFormato = function(){
      var data = {
        "id": $scope.form.id,
        "nombre": $scope.form.nombre,
        "modelo": {"id": $scope.form.modelo},
        "mina": {"id": $scope.form.mina},
        "tipoInspeccion": $scope.form.tipoInspeccion,
        "secciones": generarJsonSeccionesFur()
      }
      FormatoFactory.editar(data, function (data){
        if(data.respuesta == 'actualizacion-exitosa'){
          window.history.back();
          MensajeService.showInfoMessage("Formato actualizado exitósamente");
        }
      });
    };

    $scope.mdlVerSeccion = function (seccion) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'htmlMostrarSeccion.html',
        controller: 'mostrarSeccionCtrl',
        resolve: {
          datos: function () {
            return {
              'seccion': seccion
            }
          }
        }
      });
    };

    $scope.removerSeccion = function(idx){
      console.log(idx);
      var r = confirm("¿Desea quitar esta sección del formato?");
      if (r == true) {
          $scope.form.secciones.splice(idx, 1);
      }
    }

    $scope.agregarSeccionAFur = function(seccion){
      console.log("Seccion seleccionada", JSON.stringify(seccion));
      var existeSeccion = false;
      for (var i = 0; i < $scope.form.secciones.length; i++) {
        var seccionFur = $scope.form.secciones[i];
        if (seccionFur.id == seccion.id){
          existeSeccion = true;
          var r = confirm("La sección ya se encuentra en el formato. ¿Desea agregarla de todas maneras?");
          if (r == true) {
              $scope.form.secciones.push(seccion);
          }
          break;
        }
      }
      if (!existeSeccion){
        $scope.form.secciones.push(seccion);
      }
    }

    function generarJsonSeccionesFur(){
      var secciones = [];
      for (var i = 0; i < $scope.form.secciones.length; i++) {
        var seccionFur = $scope.form.secciones[i];
        secciones.push({"id": seccionFur.id, "orden": i+1});
      }
      return secciones;
    }

});
