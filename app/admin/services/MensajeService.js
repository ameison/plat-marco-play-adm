
'use strict';
angular.module('app.admin').service('MensajeService', function () {

	this.showInfoMessage = function (txtMensaje){
		  var caja = document.getElementById("caja-mensajes-sistema");
			caja.innerHTML = "<label class='lbl-caja-mensajes-sistema'>"+txtMensaje+"</label>";
			caja.style.display = 'block';

	    setTimeout(function() {
				var cc = document.getElementById("caja-mensajes-sistema");
				cc.innerHTML = "";
				cc.style.display = 'none';
			},3000);
	}

});
