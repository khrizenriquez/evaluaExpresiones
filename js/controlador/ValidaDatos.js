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

			msj.textContent = "";

			//		Lleno mi objeto con la er que recibo del usuario
			var n = new Automata();
			n.lenguaje(dUsuario.getER());
			console.log("Caracteres " + n.getCaracteresEspeciales());
			console.log("Operadores " + n.getOperadores());
			console.log("Alfabeto " + n.getAlfabeto());
			console.log("Transiciones " + n.getTransiciones().__proto__);

			self.mostrandoOpciones(document.getElementById("divTextoExtra"), "Alfabeto: "+n.getAlfabeto());
			self.mostrandoOpciones(document.getElementById("divER"), dUsuario.getER());
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
			if (self.validandoCadena(er.value, exp)) {
				//		Limpio el texto de los valores donde posiblemente pudieran haber valores
				self.mostrandoOpciones(document.getElementById("divTextoExtra"), "");
				msj.style.color = Generales.Colores.msjVerde;
				msj.textContent = "";

				//		Asigno los valores a mi clase DatosUsuario
				dUsuario.setCadena(exp);

				self.mostrandoOpciones(document.getElementById("divCadena"), dUsuario.getCadena(), "Cadena desde caja de texto");
			} else {
				self.mostrandoOpciones(document.getElementById("divTextoExtra"), "Cadena inválida");
				msj.style.color = Generales.Colores.msjRojo;
				msj.textContent = "Lo siento pero la cadena ingresada no es válida para la expresión regular " + er.value;
			}
		} else {
			msj.style.color = Generales.Colores.msjRojo;
			msj.textContent = "Ingresa valores correctos para la expresión regular y la cadena";
		}
		document.getElementById("btnCadena").disabled = false;
	};

	//		void: 	Solo sirve para mostrar el texto en los selectores que le indiquen
	this.mostrandoOpciones = function (selector, mensaje, etiqueta) {	
		//		Hago referencia a el parráfo, ahí coloco lo que venga de mensaje
		if (etiqueta != "" && etiqueta != null && etiqueta != undefined) 
			selector.children[0].textContent = etiqueta;

		selector.children[1].textContent = mensaje;
	};
	//		boolean: 	Validando si la cadena es aceptada por la expresión regular
	this.validandoCadena = function (er, cadena) {
		var respuesta;
		er = new RegExp("^"+ er +"$", "g");

		(er.test(cadena)) ? respuesta = true : respuesta = false;

		return respuesta;
	};
};
