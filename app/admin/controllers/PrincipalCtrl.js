"use strict";

angular.module('app.admin').controller('PrincipalCtrl', function ($scope, $localStorage,
  InspeccionFactory, CategoriaFactory, EquipoFactory, MensajeService, MinaFactory) {

    $scope.user = $localStorage.user;
    $scope.tipoUsuario = $scope.user.usuario_tipo;
    console.log("TIPO DE USUARIO", $scope.tipoUsuario);

    $scope.form = {};

    $scope.listaMinas = function(){
      MinaFactory.lista(function(data){
        console.log(data);
        $scope.minas = data;
        $scope.form.mina = $scope.minas[0].id;

        $scope.getEstadistica();

      });
    };

    $scope.listaCategorias = function(){
      CategoriaFactory.lista(function(data){
        $scope.categorias = data;
      });
    };

    $scope.mostrarEstadisticaSCLDias = function(){

      var categoriasIds = [];
      for (var i = 0; i < $scope.categorias.length; i++) {
        if ($scope.categorias[i].checked){
          categoriasIds.push($scope.categorias[i].id);
        }
      }

      if (categoriasIds.length > 0){
        $scope.dataForm = {
          "categorias": categoriasIds,
          "minaId": $scope.form.mina
        }
        console.log("data reporte ::: ", $scope.dataForm);
        EquipoFactory.getEstadisticaCliDias($scope.dataForm, function(data){
          $scope.seguimientos = data;
          $scope.labels_dias = data.labels;
          $scope.colors_dias = ["#0049FF"]
          $scope.data_dias = data.dias;

          if ($scope.seguimientos.length == 0){
            MensajeService.showInfoMessage("No se encontraron resultados");
          }
        });

      } else {
        MensajeService.showInfoMessage("Elija una opción de categoría de equipos");
      }
    }

    $scope.getEstadistica = function(){
      var data = {
        "minaId": $scope.form.mina
      }
      InspeccionFactory.getEstadisticaCliInsScl(data, function(data){
        $scope.labels_scl = data.meses;
        $scope.colors_scl = []
        for(var i = 0; i < 12; i++){
          $scope.colors_scl.push("#0049FF")
        }
        $scope.data_scl = data.inspecciones;
      });

      InspeccionFactory.getEstadisticaCliInsMc(data, function(data){
        $scope.labels_co = data.meses;
        $scope.series_co = data.series;
        $scope.colors_co = ['#0049FF', '#FF0000']
        $scope.data_co = [data.inspecciones_abiertas, data.inspecciones_cerradas];
      });
    };

    $scope.listaMinas();
    $scope.listaCategorias();

});
