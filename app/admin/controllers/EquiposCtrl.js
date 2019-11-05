"use strict";

angular.module('app.admin').controller('EquiposCtrl', function ($scope, $state, $location, MensajeService,
  EquipoFactory, SuperintendenciaFactory, ModeloFactory, MinaFactory) {

  $scope.form = {};

  $scope.registrarEquipo = function(){
    var data = {
      nombre: $scope.form.nombre,
      superintendencia: {"id": $scope.form.superintendencia},
      modelo: {"id": $scope.form.modelo},
      diasOptimo: $scope.form.diasOptimo,
      diasCritico: $scope.form.diasCritico
    }
    console.log(data);
    EquipoFactory.registrar(data, function (response){
        console.log(response);
        if(response.respuesta == "registro-exitoso"){
          window.history.back();
          MensajeService.showInfoMessage("Equipo registrado exitósamente");
        }else if(response.respuesta == "equipo-existente"){
          MensajeService.showInfoMessage("Este equipo ya está registrado");
        }
    });
  };

  $scope.eliminarEquipo = function(id){
    var r = window.confirm ('¿Seguro que desea eliminar este equipo?');
    if(r){
      EquipoFactory.eliminar(id, function (response){
        if (response.respuesta == "eliminacion-exitosa"){
          MensajeService.showInfoMessage("Equipo eliminado exitósamente");
          $scope.listaEquipos();
        }else if(response.respuesta == "equipo-en-uso"){
          MensajeService.showInfoMessage("Este equipo tiene inspecciones asociadas. Por lo tanto, no es posible eliminarlo.");
        }else if(response.respuesta == "equipo-no-existe"){
          MensajeService.showInfoMessage("Este equipo no existe");
        }
      });
    }
  }

  $scope.listaEquipos = function(){
    EquipoFactory.lista(function(data){
      console.log(data);
      $scope.lista = data;
    });
  };

  $scope.listaEquiposXMina = function(){
    EquipoFactory.getXMina($scope.form.mina, function(data){
      $scope.lista = data;
    });
  };

  $scope.listaMinas = function(){
    MinaFactory.lista(function(data){
      console.log(data);
      $scope.minas = data;
      $scope.form.mina = $scope.minas[0].id;
      $scope.listaSuperintendencias($scope.form.mina, false);
    });
  };

  $scope.listaSuperintendencias = function(id){
    SuperintendenciaFactory.getXMinaId(id, function(data){
      console.log(data);
      $scope.superintendencias = data;
      $scope.form.superintendencia = $scope.superintendencias[0].id;
    });
  };

  $scope.listaModelos = function(){
    ModeloFactory.lista(function(data){
      console.log(data);
      $scope.modelos = data;
      $scope.form.modelo = $scope.modelos[0].id;
    });
  };

  if ($location.$$url == '/equipos') {
      console.log("Cargando lista de equipos");
      $scope.listaEquipos();
      $scope.listaMinas();
  }

  if ($location.$$url == '/equipo/nuevo') {
      console.log("Cargando lista de equipos");
      $scope.listaMinas();
      //$scope.listaSuperintendencias();
      $scope.listaModelos();
  }

});


angular.module('app.admin').controller('EquiposEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, EquipoFactory, SuperintendenciaFactory, ModeloFactory, MinaFactory) {

    var equipoId = $stateParams.id;

    $scope.form = {};

    EquipoFactory.getXId(equipoId, function (data){
      console.log("getXId", data);
      $scope.form = data;
      $scope.form.mina = data.superintendencia.mina.id;
      $scope.form.superintendencia = data.superintendencia.id;
      $scope.form.modelo = data.modelo.id;

      $scope.form.diasOptimo = data.diasOptimo;
      $scope.form.diasCritico = data.diasCritico;

      $scope.listaMinas()
      $scope.listaModelos()
    });

    $scope.editarEquipo = function(){
      var data = {
        id: $scope.form.id,
        nombre: $scope.form.nombre,
        superintendencia: {"id": $scope.form.superintendencia},
        modelo: {"id": $scope.form.modelo},
        diasOptimo: $scope.form.diasOptimo,
        diasCritico: $scope.form.diasCritico
      }
      console.log(data);

      EquipoFactory.editar(data, function (data){
        if(data.respuesta == 'equipo-existe'){
          MensajeService.showInfoMessage("El equipo ingresado ya existe.");
        }else if(data.respuesta == 'actualizacion-exitosa'){
          window.history.back();
          MensajeService.showInfoMessage("Equipo actualizado exitósamente");
        }
      });
    };

    $scope.listaMinas = function(){
      MinaFactory.lista(function(data){
        console.log("minas", data);
        $scope.minas = data;
        //$scope.form.mina = $scope.minas[0].id;
        $scope.listaSuperintendencias($scope.form.mina);
      });
    };

    $scope.listaSuperintendencias = function(id, esCambio){
      SuperintendenciaFactory.getXMinaId(id, function(data){
        console.log("superintendencias", data);
        $scope.superintendencias = data;
        if (esCambio){
            $scope.form.superintendencia = $scope.superintendencias[0].id;
        }
      });
    };

    $scope.listaModelos = function(){
      ModeloFactory.lista(function(data){
        console.log("modelos", data);
        $scope.modelos = data;
      });
    };



});
