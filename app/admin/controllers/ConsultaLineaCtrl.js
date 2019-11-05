"use strict";

angular.module('app.admin').controller('ConsultaLineaCtrl', function ($scope, $state, $location, MensajeService,
  ModeloFactory, MinaFactory, CategoriaFactory, InspeccionFactory, SuperintendenciaFactory, APP_CONSTANT, $localStorage) {

  $scope.tipoUsuario = $localStorage.user.usuario_tipo;
  $scope.minaId = $localStorage.user.mina_id;
  console.log("Tipo de usuario : " + $scope.tipoUsuario);

  $scope.form = {};
  $scope.datePicker = {
    "date": {
      "startDate": undefined,
      "endDate": undefined
    }
  }

  $scope.listaMinas = function(){
    MinaFactory.lista(function(data){
      $scope.minas = data;
      $scope.form.mina = $scope.minas[0].id;
      $scope.listaSuperintendencias($scope.form.mina);
    });
  };

  $scope.listaSuperintendencias = function(minaId){
    SuperintendenciaFactory.getXMinaId(minaId, function(data){
      $scope.superintendencias = data;
      $scope.form.superintendencia = $scope.superintendencias[0].id;
    });
  };

  $scope.listaTiposInspeccion = function(){
    $scope.tipos = APP_CONSTANT.tiposInspeccion;
    $scope.form.tipo = $scope.tipos[0].id;
  }

  Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    return [this.getFullYear(), !mm[1] && '/', mm, !dd[1] && '/', dd].join(''); // padding
  };

  $scope.listaConsultaLinea = function(){
    if ($scope.datePicker.date.startDate != undefined || $scope.datePicker.date.endDate != undefined){
      var data = {
        "fechaInicial": $scope.datePicker.date.startDate._d.yyyymmdd(),
        "fechaFinal": $scope.datePicker.date.endDate._d.yyyymmdd(),
        "tipo": $scope.form.tipo,
        "superintendenciaId": $scope.form.superintendencia
      }
      //console.log("data", data);
      InspeccionFactory.getConsultaLinea(data, function(data){
        $scope.inspecciones = [];
        if (data.length > 0){
          if ($scope.form.tipo == "MC"){
            for (var i = 0; i < data.length; i++) {
              if (data[i].inspeccionCerrada != null && data[i].inspeccionCerrada != undefined){
                  $scope.inspecciones.push(data[i].inspeccionCerrada);
              }
              $scope.inspecciones.push(data[i]);
            }
          }else{
            $scope.inspecciones = data;
          }
        }else{
          MensajeService.showInfoMessage("No se encontraron resultados");
        }
      });
    }else{
      MensajeService.showInfoMessage("Ingrese un rando de fechas");
    }
  };

  $scope.generarPdf = function(inspeccionId){
    InspeccionFactory.generarPdf(inspeccionId);
  }

  $scope.eliminarInspeccion = function(inspeccionId){
    var r = confirm("¿Esta seguro de eliminar esta inspección?");
    if (r == true) {
      InspeccionFactory.eliminar(inspeccionId, function(data){
        console.log(data);
        if (data.result == "inspeccion-eliminada"){
          MensajeService.showInfoMessage("Inspección eliminada correctamente");
          $scope.listaConsultaLinea();
        }else if(data.result == "inspeccion-no-existe"){
          MensajeService.showInfoMessage("No existe esta inspección");
        }else if(data.result == "usuario-invalido"){
          MensajeService.showInfoMessage("No tienes permisos para eliminar esta inspección");
        }
      });
    }
  }

  if ($location.$$url == '/consulta-linea') {
    if ($scope.tipoUsuario == APP_CONSTANT.tiposUsuario[4].id){
      //console.log("Es tipo usuario cliente mina : " + $localStorage.user.mina_id);
      $scope.listaSuperintendencias($localStorage.user.mina_id);
    }else{
      $scope.listaMinas();
    }
    $scope.listaTiposInspeccion();
    // $scope.listaCategorias();
  }

});

angular.module('app.admin').controller('InspeccionEditCtrl', function ($scope, $state, $stateParams,
  MensajeService, InspeccionFactory, EquipoFactory, SeccionFactory, ComponentesFactory, APP_CONSTANT,
  $uibModal, $localStorage, $q) {

  var inspeccionId = $stateParams.id;

  $scope.form = {}

  $scope.indexSeccionActual = undefined;

  $scope.prioridades = APP_CONSTANT.prioridadInspeccion;
  $scope.estados = APP_CONSTANT.estadosInspeccion;

  $scope.componentes = [];

  $scope.dimension = {
    "filas": 5,
    "columnas": 4
  }

  $scope.seleccinados = [];

  $scope.nuevaSeccion = {};

  $scope.base64Object = {};

  $scope.tipoUsuario = $localStorage.user.usuario_tipo;

  // $scope.nuevaFoto = function (file, obj) {
  //   // $scope.form.logo = obj.base64
  //   console.log(file);
  //   //console.log(obj.bobj.base64ase64);
  // };

  $scope.listaSecciones = function(){
    SeccionFactory.lista(function(data){
      //console.log(data);
      $scope.lista = data;
    });
  };

  $scope.listaComponentes = function(){
    ComponentesFactory.lista(function(data){
      //console.log(data);
      $scope.componentes = data;
    });
  };

  $scope.getInspeccion = function(){
    //console.log("Id inspeccion", inspeccionId);
    InspeccionFactory.getXId(inspeccionId, function(data){

      if ($scope.tipoUsuario == "SOP"){
        $scope.estados.splice(2, 1);
      }

      $scope.inspeccion = data;

      $scope.form.prioridad = $scope.inspeccion.prioridad;
      $scope.form.estado = $scope.inspeccion.estado;
      $scope.formato = $scope.inspeccion.hi[0];

      //$scope.getEquipos($scope.inspeccion.equipo.superintendencia.mina.id, $scope.inspeccion.equipo.id);

      $scope.listaSecciones();
      $scope.listaComponentes();

    });
  };

  $scope.getInspeccion();

  $scope.abrirImagen = function (picture) {
    $uibModal.open({
      templateUrl: 'imagenPopup.html',
      controller: 'imagenPopupCtrl',
      resolve: {
        picture: function () {
          return picture;
        }
      }
    });
  };

  $scope.removerSeccion = function(idx){
    //console.log("Indice de seccion", idx);
    var r = confirm("¿Desea quitar esta sección de la inspección?");
    if (r == true) {
        $scope.formato.contenido.data.splice(idx, 1);
    }
  }

  $scope.getMostrarImagenAyuda = function(idx){
    //console.log("Indice de seccion", idx);
    if ($scope.formato.contenido.data[idx].mostrarImagenAyuda != undefined){
      //console.log("mostrarImagenAyuda != undefined - retorna: ", $scope.formato.contenido.data[idx].mostrarImagenAyuda);
      return $scope.formato.contenido.data[idx].mostrarImagenAyuda;
    }else{
      console.log("mostrarImagenAyuda == undefined - retorna: ", false);
      return false;
      //$scope.formato.contenido.data[idx].mostrarImagenAyuda = false;
    }
  }

  /*$scope.getEquipos = function(minaId, equipoId){
    console.log("Mina id", minaId);
    console.log("Equipo id", equipoId);
    console.log("obteniendo equipos x mina");
    EquipoFactory.getXMina(minaId, function(data){
      console.log("Equipos de bd", data);
      $scope.equipos = data;
      $scope.form.equipo = equipoId;
    });
  }*/

  $scope.nuevaFoto = function(idx){
    //alert(idx);
    $scope.indexSeccionActual = idx;
    $('#fileImage').click()
  }

  $scope.agregarFoto = function ( file, obj) {
    var deferred = $q.defer();
    var url = URL.createObjectURL(file);
    Jimp.read(url)
    .then(function (item) {
      item
      //.resize(630, 434)// width, height
      .resize(630, 355)// width, height
      //.quality(50)//drops the image quality to 50%
      .quality(100)//drops the image quality to 50%
      .getBase64(file.type, function (err, newBase64) {
        if (err) {throw err;}
        var bytes = Math.round((3/4)*newBase64.length);
        $scope.base64Object.filetype = file.type;
        $scope.base64Object.filesize = bytes;
        $scope.base64Object.base64 = newBase64;

        deferred.resolve($scope.base64Object);

        var data = {
          "src": $scope.base64Object.base64,
          "sub": ""
        }

        $scope.formato.contenido.data[$scope.indexSeccionActual].contenido.data.pictures.push(data);

      });
    })
    .catch(function (err) {
      return console.log(err);// error handling
    });
    return deferred.promise;
  };

  $scope.removerFoto = function(seccionIdx, fotoIdx){
    //console.log("Pos seccion", seccionIdx);
    //console.log("Pos foto", fotoIdx);
    var r = confirm("¿Esta seguro de remover esta foto?");
    if (r == true) {
      $scope.formato.contenido.data[seccionIdx].contenido.data.pictures.splice(fotoIdx, 1);
    }
  }

  $scope.actualizarInspeccion = function(){
    var hiEstado = undefined;
    if ($scope.form.estado == APP_CONSTANT.estadosInspeccion[0].id || $scope.form.estado == APP_CONSTANT.estadosInspeccion[1].id){
      hiEstado = APP_CONSTANT.estadosHistorialInspeccion[1].id;
    }else{
      hiEstado = APP_CONSTANT.estadosHistorialInspeccion[2].id;
    }
    if (hiEstado != undefined){
      //if ($scope.form.equipo != undefined){

      var data = {
        "id": $scope.inspeccion.id,
        //"equipo": {"id": $scope.form.equipo},
        "ordenTrabajo": $scope.inspeccion.ordenTrabajo,
        "estado": $scope.form.estado,
        "prioridad": $scope.form.prioridad,
        "resumenActividad": $scope.inspeccion.resumenActividad,
        "horometro": $scope.inspeccion.horometro,
        "aprobadoSoporte": $scope.inspeccion.aprobadoSoporte,
        "observaciones": $scope.inspeccion.observaciones,
        "hi": [
          {
            "contenido": {"data": JSON.parse(angular.toJson($scope.formato.contenido.data))},
            "estado": hiEstado
          }
        ]
      }
      //console.log("data", JSON.stringify(data));
      InspeccionFactory.editar(data, function (response){
        if (response.respuesta == "actualizacion-exitosa"){
          window.history.back();
          MensajeService.showInfoMessage("Inspección actualizada correctamente");
        }else if(response.respuesta == "faltan-datos"){
          MensajeService.showInfoMessage("Faltan datos para poder actualizar esta inspección");
        }
      });

      /*}else{
        alert("No se ha seleccionado un equipo válido.")
      }*/
    }else{
      alert("El estado no ha sido definido.");
    }
  }

  $scope.onDropT = function($event,$data,iRow,iCol){
    $scope.seccion.content[iRow].content[iCol].content = $data.contenido.data;
  };

  $scope.generarTabla = function(){
    //var maxFilas = 20;
    //var maxColumnas = 10;

    //if ($scope.dimension.filas <= maxFilas && $scope.dimension.columnas <= maxColumnas){
      var tabla = {
        "obj": "table",
        "content": [],
        "pictures": []
      }
      $scope.seccion = tabla;
      for(var i = 0; i < $scope.dimension.filas; i++){
        var fila = {
          "obj": "row",
          "content": []
        }
        $scope.seccion.content.push(fila);
        for (var j = 0; j < $scope.dimension.columnas; j++) {
          var celda = {
            "obj": "column",
            "selected": false,
            "content": {}
          }
          $scope.seccion.content[i].content.push(celda);
        }
      }
    /*}else{
      alert("Se ha exedido el maximo de filas(20) y/o columnas(10).");
    }*/
  }

  $scope.agregarFila = function(){
    var fila = {
      "obj": "row",
      "content": []
    }
    $scope.seccion.content.push(fila);
    for (var j = 0; j < $scope.dimension.columnas; j++) {
      var celda = {
        "obj": "column",
        "selected": false,
        "content": {}
      }
      $scope.seccion.content[$scope.dimension.filas].content.push(celda);
    }
    $scope.dimension.filas++;
  }

  $scope.agregarColumna = function(){
    for (var i = 0; i < $scope.dimension.filas; i++) {
      var celda = {
        "obj": "column",
        "selected": false,
        "content": {}
      }
      $scope.seccion.content[i].content.push(celda);
    }
    $scope.dimension.columnas++;
  }

  $scope.eliminarFila = function(){
    if ($scope.dimension.filas >= 2){
      $scope.dimension.filas--;
      $scope.seccion.content.splice($scope.dimension.filas,  1);
    }
  }

  $scope.eliminarColumna = function(){
    if ($scope.dimension.columnas >= 2){
      $scope.dimension.columnas--;
      for (var i = 0; i < $scope.dimension.filas; i++) {
        $scope.seccion.content[i].content.splice($scope.dimension.columnas, 1);
      }
    }
  }

  $scope.guardarConfiguracion = function(value, index){
    //console.log(value);
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
    if ($scope.componentes[pIdx].contenido.data.options.length == 0){
      $scope.componentes[pIdx].contenido.data.value = "";
    }
  }

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

  $scope.agregarSeccion = function(){
    var data = {
      "nombre": $scope.nuevaSeccion.nombre,
      "reporteTemperatura": false,
      "tipo": "CU",
      "contenido": { "data": $scope.seccion },
      "orden": $scope.formato.contenido.data.length + 1
    }
    if ($scope.imagenAyuda != undefined){
      data.imagenAyuda = $scope.imagenAyuda;
    }
    //console.log("Datos de la seccion a agregar", data);

    $scope.formato.contenido.data.push(data);

  };

});

angular.module('app.admin').controller('imagenPopupCtrl', function ($scope, $uibModalInstance, picture) {
  $scope.picture = picture;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
