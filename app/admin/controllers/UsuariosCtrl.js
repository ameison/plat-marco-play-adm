"use strict";

angular.module('app.admin').controller('CambiarClaveCtrl', function ($scope, MensajeService, $uibModalInstance, UsuarioFactory, datos ) {

  $scope.usuario = datos.usuario;

  $scope.ok = function () {
    $uibModalInstance.close();
    $scope.form.id = datos.id;

    UsuarioFactory.editar($scope.form, function (data){
      if(data.respuesta == 'correo-existe'){
        MensajeService.showInfoMessage("El correo ingresado ya está siendo usado por otro usuario.");
      }else if(data.respuesta == 'actualizacion-exitosa'){
        //window.history.back();
        $scope.cancel();
        MensajeService.showInfoMessage("Usuario actualizado exitósamente");
      }
    });

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

angular.module('app.admin').controller('UsuariosCtrl', function ($scope, $cookieStore, $state, $uibModal,
  $localStorage, $location, MensajeService, $auth, UsuarioFactory, MinaFactory, APP_CONSTANT) {
  $scope.tiposUsuario = APP_CONSTANT.tiposUsuario;
  if ($scope.tiposUsuario.length > 4){
    $scope.tiposUsuario.splice(3, 1);
  }
  $scope.form = {};
  $scope.form.tipoUsuario = APP_CONSTANT.tiposUsuario[0].id;

  $scope.mdlCambiarClave = function (id, usuario) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'htmlCambiarClave.html',
      controller: 'CambiarClaveCtrl',
      size: 120,
      resolve: {
        datos: function () {
          return {
            'id' : id,
            'usuario': usuario
          }
        }
      }
    });
  };

  $scope.registrarUsuario = function(){
    console.log($scope.form);
    $scope.form.mina = {"id": $scope.form.mina}
    UsuarioFactory.registrar($scope.form, function (response){
        if(response.respuesta == "registro-exitoso"){
          window.history.back();
          MensajeService.showInfoMessage("Cliente registrado exitósamente");
        }else if(response.respuesta == 'correo-existe'){
          MensajeService.showInfoMessage("El correo ingresado ya está siendo usado por otro usuario.");
        }else if (response.respuesta == 'faltan-datos'){
          MensajeService.showInfoMessage("Faltan datos requeridos para el registro del usuario.");
        }
    });
  };

  $scope.eliminarUsuario = function(id){
    var r = window.confirm ('¿Seguro que desea eliminar este usuario?');
    if(r){
      UsuarioFactory.eliminar(id, function (response){
        if (response.respuesta == "eliminacion-exitosa"){
          MensajeService.showInfoMessage("Usuario eliminado correctamente.");
          $scope.listaUsuarios();
        }else if(response.respuesta == "usuario-en-uso"){
          MensajeService.showInfoMessage("Este usuario ya ha realizado inspecciones. Por lo tanto, no es posible eliminarlo.");
        }else if(response.respuesta == "usuario-no-existe"){
          MensajeService.showInfoMessage("Este usuario no existe.");
        }
      });
    }
  }

  $scope.listaUsuarios = function(){
    UsuarioFactory.lista(function(data){
      $scope.lista = data;
    });
  };

  $scope.listaMinas = function(){
    MinaFactory.lista(function(data){
      $scope.minas = data;
      $scope.form.mina = $scope.minas[0].id
    });
  };

  $scope.generarExcel = function(){
    UsuarioFactory.generarExcelUsuarios();
  }

  if ($location.$$url == '/usuarios') {
      console.log("Cargando lista de usuarios");
      $scope.listaUsuarios();
  }

  if ($location.$$url == '/usuarios/nuevo') {
      console.log("Cargando nuevos usuarios");
      $scope.listaMinas();
  }

});

angular.module('app.admin').controller('UsuariosEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, UsuarioFactory, MinaFactory, APP_CONSTANT) {

    var usuarioId = $stateParams.id;

    $scope.tiposUsuario = APP_CONSTANT.tiposUsuario;
    $scope.form = {};

    UsuarioFactory.getXId(usuarioId, function (data){
      console.log(data);
      $scope.form = data;
      $scope.form.telefono = parseInt(data.telefono);
      $scope.form.tipoUsuario = data.tipoUsuario ;
      $scope.form.mina = data.mina.id;
    });

    $scope.editarUsuario = function(){
      console.log($scope.form);
      $scope.form.mina = {"id": $scope.form.mina};
      UsuarioFactory.editar($scope.form, function (data){
        if(data.respuesta == 'correo-existe'){
          MensajeService.showInfoMessage("El correo ingresado ya está siendo usado por otro usuario.");
        }else if(data.respuesta == 'actualizacion-exitosa'){
          window.history.back();
          MensajeService.showInfoMessage("Cliente actualizado exitósamente");
        }
      });
    };

    $scope.listaMinas = function(){
      MinaFactory.lista(function(data){
        $scope.minas = data;
        $scope.form.mina = $scope.minas[0].id
      });
    };

    $scope.listaMinas();

});
