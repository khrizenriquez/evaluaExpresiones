'use strict';

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btnProcesar").addEventListener("click", new ValidaDatos().validaER);
	document.getElementById("btnCadena").addEventListener("click", new ValidaDatos().validaCadena);
});

var ValidaDatos = function () {
	init: {
		var self = this;
		var dUsuario = new DatosUsuario();
		var er = document.getElementById("txtER");
		var cadena = "";
		var msj = document.getElementById("msjER");
		var datosPantalla = new MostrandoDatos();
	};

	this.validaER = function () {
		//		Bloqueo el botón de procesar para que no tenga problemas con que lo presionen varias veces
		document.getElementById("btnProcesar").disabled = true;

		//		Valido que los valores seleccionados sean válidos
		if (er.value.length > 0) {
			//		Asigno los valores a mi clase DatosUsuario
			dUsuario.setER(er.value.replace(/\s/g, ""));

			//		Envío los valores a la clase Transicion()
			var t = new Transicion(er.value);
			t.estado();

			//document.getElementById("diagramaEstados").innerHTML = "";
			msj.textContent = "";

			//		Lleno mi objeto con la er que recibo del usuario
			var n = new Automata();
			n.lenguaje(dUsuario.getER());

			datosPantalla.mostrandoOpciones(document.getElementById("divTextoExtra"), "<label>Σ: {"+n.getAlfabeto() + "}</label>");
			datosPantalla.mostrandoOpciones(document.getElementById("divER"), dUsuario.getER());
		} else {
			msj.style.color = Generales.Colores.msjRojo;
			msj.textContent = "Ingresa valores correctos para la expresión regular y la cadena";
		}
		document.getElementById("btnProcesar").disabled = false;
	};

	this.validaCadena = function () {
		document.getElementById("btnCadena").disabled = true;
		var exp;
		cadena = document.getElementById("txtAreaCadena");

		if (cadena.value.length > 0) {
			msj.textContent = "";

			//		Validando la cadena
			if (self.validandoCadena(er.value, cadena.value)) {
				//		Limpio el texto de los valores donde posiblemente pudieran haber valores
				datosPantalla.mostrandoOpciones(document.getElementById("divTextoExtra"), "");
				msj.style.color = Generales.Colores.msjVerde;
				msj.textContent = "";

				//		Asigno los valores a mi clase DatosUsuario
				dUsuario.setCadena(cadena.value);

				datosPantalla.mostrandoOpciones(document.getElementById("divCadena"), dUsuario.getCadena(), "Cadena desde caja de texto");
			} else {
				datosPantalla.mostrandoOpciones(document.getElementById("divTextoExtra"), "Cadena inválida");
				msj.style.color = Generales.Colores.msjRojo;
				msj.textContent = "Lo siento pero la cadena ingresada no es válida para la expresión regular " + er.value;
			}
		} else {
			msj.style.color = Generales.Colores.msjRojo;
			msj.textContent = "Ingresa valores correctos para la expresión regular y la cadena";
		}
		document.getElementById("btnCadena").disabled = false;
	};
	//		boolean: 	Validando si la cadena es aceptada por la expresión regular
	this.validandoCadena = function (er, cadena) {
		console.log("----------------------------------");
		console.log(er);
		console.log(cadena);
		console.log("----------------------------------");
		var respuesta;
		er = new RegExp("^"+ er +"$", "g");

		(er.test(cadena)) ? respuesta = true : respuesta = false;

		return respuesta;
	};
};
