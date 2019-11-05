"use strict";

angular.module('app.admin').controller('SeccionesCtrl', function ($scope, $state, $location,
  MensajeService, SeccionFactory, ComponentesFactory, ModeloFactory) {

  $scope.componentes = [];
  $scope.seccion = {}
  $scope.filas = 5;
  $scope.columnas = 4;
  $scope.seleccinados = [];

  $scope.reporteTemperatura = false;

  $scope.registrarSeccion = function(){
    var data = {
      "nombre": $scope.nombre,
      "reporteTemperatura": $scope.reporteTemperatura,
      "tipo": "CU",
      "contenido": { "data": $scope.seccion },
      "modelo": { "id": $scope.modelo }
    }
    if ($scope.imagenAyuda != undefined){
      data.imagenAyuda = $scope.imagenAyuda;
    }
    console.log(data);
    SeccionFactory.registrar(data, function (response){
        console.log(response);
        if(response.respuesta == undefined){
          window.history.back();
          MensajeService.showInfoMessage("Sección registrada exitósamente");
        }
    });
  };

  $scope.nuevaImagen = function (file, obj) {
    $scope.imagenAyuda = obj.base64
  };

  $scope.eliminarSeccion = function(id){
    var r = window.confirm ('¿Seguro que desea eliminar esta sección?');
    if(r){
      SeccionFactory.eliminar(id, function (response){
        if (response.respuesta == "eliminacion-exitosa"){
          MensajeService.showInfoMessage("Sección eliminada exitósamente");
          $scope.listaSecciones();
        }else if(response.respuesta == "seccion-en-uso"){
          MensajeService.showInfoMessage("Esta sección tiene formatos de reporte asociados. Por lo tanto, no es posible eliminarla.");
        }else if(response.respuesta == "seccion-no-existe"){
          MensajeService.showInfoMessage("Esta sección no existe.");
        }
      });
    }
  }

  $scope.listaSecciones = function(){
    SeccionFactory.lista(function(data){
      console.log(data);
      $scope.lista = data;
    });
  };

  $scope.listaModelos = function(){
    ModeloFactory.lista(function(data){
      console.log(data);
      $scope.modelos = data;
      $scope.modelo = $scope.modelos[0].id;
    });
  };

  $scope.listaComponentes = function(){
    ComponentesFactory.lista(function(data){
      console.log(data);
      $scope.componentes = data;
    });
  };

  if ($location.$$url == '/secciones') {
      console.log("Cargando lista de secciones");
      $scope.listaSecciones();
  }

  if ($location.$$url == '/secciones/nuevo') {
      console.log("Nueva seccion");
      $scope.listaComponentes();
      $scope.listaModelos();
  }

  $scope.generarTabla = function(){
    console.log("Generando tablas");
    var tabla = {
      "obj": "table",
      "content": [],
      "pictures": []
    }
    $scope.seccion = tabla;
    for(var i = 0; i < $scope.filas; i++){
      var fila = {
        "obj": "row",
        "content": []
      }
      $scope.seccion.content.push(fila);
      for (var j = 0; j < $scope.columnas; j++) {
        var celda = {
          "obj": "column",
          "selected": false,
          "content": {}
        }
        $scope.seccion.content[i].content.push(celda);
      }
    }
  }

  $scope.agregarFila = function(){
    var fila = {
      "obj": "row",
      "content": []
    }
    $scope.seccion.content.push(fila);
    for (var j = 0; j < $scope.columnas; j++) {
      var celda = {
        "obj": "column",
        "selected": false,
        "content": {}
      }
      $scope.seccion.content[$scope.filas].content.push(celda);
    }
    $scope.filas++;
  }

  $scope.agregarColumna = function(){
    for (var i = 0; i < $scope.filas; i++) {
      var celda = {
        "obj": "column",
        "selected": false,
        "content": {}
      }
      $scope.seccion.content[i].content.push(celda);
    }
    $scope.columnas++;
  }

  $scope.eliminarFila = function(){
    if ($scope.filas >= 2){
      $scope.filas--;
      $scope.seccion.content.splice($scope.filas,  1);
    }
  }

  $scope.eliminarColumna = function(){
    if ($scope.columnas >= 2){
      $scope.columnas--;
      for (var i = 0; i < $scope.filas; i++) {
        $scope.seccion.content[i].content.splice($scope.columnas, 1);
      }
    }
  }

  $scope.guardarConfiguracion = function(value, index){
    console.log(value);
    switch ($scope.componentes[index].contenido.data.obj) {
      case "input-option":
        var item = {
          "value": value
        }
        $scope.componentes[index].contenido.data.options.push(item);
        $scope.componentes[index].contenido.data.value = $scope.componentes[index].contenido.data.options[0].value;
        break;
      default:
        console.log("Raro");
    }
  }

  $scope.removerItemOption = function(pIdx, idx){
    //console.log(pIdx + " - " + idx);
    $scope.componentes[pIdx].contenido.data.options.splice(idx, 1);
    if($scope.componentes[pIdx].contenido.data.options.length == 0){
      $scope.componentes[pIdx].contenido.data.value = '';
    }
  }

  $scope.onDropT = function($event,$data,iRow,iCol){
    var correcto = true;
    if ($data.contenido.data.obj == 'input-option' && $data.contenido.data.options.length == 0){
      correcto = false;
      alert("Debe agregar opciones a este componente")
    }
    if (correcto){
      $scope.seccion.content[iRow].content[iCol].content = $data.contenido.data;
    }
  };

  $scope.agregarASeleccion = function(iRow, iCol){
    if ($scope.seccion.content[iRow].content[iCol].content.hasOwnProperty('obj')){
      var existe = false;
      var indexExist = -1;

      for (var i = 0; i < $scope.seleccinados.length; i++) {
        var item = $scope.seleccinados[i];
        if (item.row == iRow && item.col == iCol){
          existe = true;
          indexExist = i;
          break;
        }
      }

      if (!existe){
        $scope.seccion.content[iRow].content[iCol].selected = true;
        $scope.seleccinados.push({"row": iRow, "col": iCol})
      }else{
        if (indexExist >= 0){
          $scope.seccion.content[iRow].content[iCol].selected = false;
          $scope.seleccinados.splice(indexExist, 1);
        }
      }
    }else{
      console.log("la celda esta vacia");
    }
  }

  $scope.eliminarSeleccionados = function(){
    for (var i = 0; i < $scope.seleccinados.length; i++) {
      var item = $scope.seleccinados[i];
      $scope.seccion.content[item.row].content[item.col].selected = false;
      $scope.seccion.content[item.row].content[item.col].content = {};
    }
    $scope.seleccinados = [];
  }
});

angular.module('app.admin').controller('SeccionesEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, SeccionFactory, ComponentesFactory, ModeloFactory) {

    var seccionId = $stateParams.id;

    SeccionFactory.getXId(seccionId, function (data){
      $scope.nombre = data.nombre;
      $scope.seccion = data.contenido.data;
      $scope.imagenAyuda = data.imagenAyuda;
      $scope.reporteTemperatura = data.reporteTemperatura;
      $scope.modelo = data.modelo.id;
    });

    $scope.componentes = [];
    $scope.seleccinados = [];

    $scope.listaComponentes = function(){
      ComponentesFactory.lista(function(data){
        console.log(data);
        $scope.componentes = data;
      });
    };

    $scope.listaModelos = function(){
      ModeloFactory.lista(function(data){
        console.log(data);
        $scope.modelos = data;
      });
    };

    $scope.listaComponentes();
    $scope.listaModelos();

    $scope.actualizarSeccion = function(){
      var data = {
        "id": seccionId,
        "nombre": $scope.nombre,
        "contenido": {"data": $scope.seccion},
        "reporteTemperatura": $scope.reporteTemperatura,
        "modelo": { "id": $scope.modelo }
      }
      if ($scope.imagenAyuda != undefined){
        data.imagenAyuda = $scope.imagenAyuda
      }
      SeccionFactory.editar(data, function (response){
        if(response.respuesta == 'actualizacion-exitosa'){
          window.history.back();
          MensajeService.showInfoMessage("Seccion actualizada exitósamente");
        }
      });
    };

    $scope.nuevaImagen = function (file, obj) {
      $scope.imagenAyuda = obj.base64
    };

    $scope.guardarConfiguracion = function(value, index){
      console.log(value);
      switch ($scope.componentes[index].contenido.data.obj) {
        case "input-option":
          var item = {
            "value": value
          }
          $scope.componentes[index].contenido.data.options.push(item);
          $scope.componentes[index].contenido.data.value = $scope.componentes[index].contenido.data.options[0].value;
          break;
        default:
          console.log("Raro");
      }
    }

    $scope.removerItemOption = function(pIdx, idx){
      console.log(pIdx + " - " + idx);
      $scope.componentes[pIdx].contenido.data.options.splice(idx, 1);
      if ($scope.componentes[pIdx].contenido.data.options.length == 0){
        $scope.componentes[pIdx].contenido.data.value = "";
      }
    }

    $scope.onDropT = function($event,$data,iRow,iCol){
      $scope.seccion.content[iRow].content[iCol].content = $data.contenido.data;
    };

    $scope.agregarASeleccion = function(iRow, iCol){
      if ($scope.seccion.content[iRow].content[iCol].content.hasOwnProperty('obj')){
        var existe = false;
        var indexExist = -1;

        for (var i = 0; i < $scope.seleccinados.length; i++) {
          var item = $scope.seleccinados[i];
          if (item.row == iRow && item.col == iCol){
            existe = true;
            indexExist = i;
            break;
          }
        }

        if (!existe){
          $scope.seccion.content[iRow].content[iCol].selected = true;
          $scope.seleccinados.push({"row": iRow, "col": iCol})
        }else{
          if (indexExist >= 0){
            $scope.seccion.content[iRow].content[iCol].selected = false;
            $scope.seleccinados.splice(indexExist, 1);
          }
        }
      }else{
        console.log("la celda esta vacia");
      }
    }

    $scope.eliminarSeleccionados = function(){
      for (var i = 0; i < $scope.seleccinados.length; i++) {
        var item = $scope.seleccinados[i];
        $scope.seccion.content[item.row].content[item.col].selected = false;
        $scope.seccion.content[item.row].content[item.col].content = {};
      }
      $scope.seleccinados = [];
    }

});
