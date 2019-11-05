"use strict";

angular.module('app.auth').controller('AuthCtrl', function ($scope, $state, $http, $localStorage, $auth) {
  $scope.user = {};
  $scope.login = function(provider) {
    if($scope.user.usuario !=undefined && $scope.user.clave !=undefined &&
       $scope.user.usuario !='' && $scope.user.clave !=''){

      $auth.login($scope.user).then(function(response) {
         if(response.data.respuesta == 'login-exitoso'){
            $localStorage.user = response.data
            $state.go('admin.principal', response.data, {'params': response.data,'navDirection':'forward'});
         }else if (response.data.respuesta == 'usuario-no-existe'){
           alert("Usuario no registrado")
           console.log("Error : "+response.data.respuesta);
         }else if (response.data.respuesta == 'pass-no-coincide'){
           alert("Clave incorrecta")
           console.log("Error : "+response.data.respuesta);
         }
      })
      .catch(function(error) {
          console.log("Error");
      });
    }else{
        console.log("campos vacios");
    }
  };
})
