'use strict';

document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("btnProcesar").addEventListener("click", new ValidaDatos().validaDatos);
	document.getElementById("btnEliminarArchivo").addEventListener("click", new ValidaDatos().quitarArchivo);
	document.getElementById("fileCadena").addEventListener("change", function () {
		new ValidaDatos().archivoTexto(this.files);
	});
});

var ValidaDatos = function () {
	var self = this;
	var msj = document.getElementById("msjER");
	var dUsuario = new DatosUsuario();
	this.validaDatos = function () {
		//		Bloqueo el botón de procesar para que no tenga problemas con que lo presionen varias veces
		document.getElementById("btnProcesar").disabled = true;
		var er = document.getElementById("txtER");
		var cadena = document.getElementById("txtAreaCadena");
		var file = document.getElementById("fileCadena");
		var exp;

		//		Valido que los valores seleccionados sean válidos
		if (er.value.length > 0 || cadena.value.length > 0) {
			if (er.value.length > 0 || cadena.value.length > 0) {}
			msj.msjVerde;
			msj.textContent = "";

			//		Le doy prioridad a mi archivo de texto
			(file.value.length > 0) ? exp = self.archivoTexto(file.files) : exp = cadena.value;

			//		Validando la cadena
			if (self.validandoCadena(er.value, exp)) {
				//		Limpio el texto de los valores donde posiblemente pudieran haber valores
				self.mostrandoOpciones(document.getElementById("divTextoExtra"), "");
				msj.style.color = Colores.msjVerde;
				msj.textContent = "";

				//		Asigno los valores a mi clase DatosUsuario
				dUsuario.setER(er.value.replace(/\s/g, ""));
				dUsuario.setCadena(exp);

				self.mostrandoOpciones(document.getElementById("divER"), dUsuario.getER());
				self.mostrandoOpciones(document.getElementById("divCadena"), dUsuario.getCadena(), "Cadena desde caja de texto");

				document.getElementById("fileCadena").value = "";

				//		Lleno mi objeto con la er que recibo del usuario
				//		Lleno mi objeto con la er que recibo del usuario
				var n = new Automata();
				n.lenguaje(dUsuario.getER());
				console.log("Caracteres " + n.getCaracteresEspeciales());
				console.log("Operadores " + n.getOperadores());
				console.log("Alfabeto " + n.getAlfabeto());
			} else {
				self.mostrandoOpciones(document.getElementById("divTextoExtra"), "Cadena inválida");
				msj.style.color = Colores.msjRojo;
				msj.textContent = "Lo siento pero la cadena ingresada no es válida para la expresión regular " + er.value;
			}
		} else {
			msj.style.color = Colores.msjRojo;
			msj.textContent = "Ingresa valores correctos para la expresión regular y la cadena";
		}
		document.getElementById("btnProcesar").disabled = false;
	};

	this.quitarArchivo = function () {
		document.getElementById("fileCadena").value = "";
	};

	//		String 		Retorno el texto que vengan en el archivo
	this.archivoTexto = function (archivos) {
		var archivo = archivos[0];
		var respuesta;

		//		Válido la extensión del archivo, por ahora solo acepto archivos .txt
		if (archivo.name.substring(archivo.name.lastIndexOf(".") + 1, archivo.length) === "txt") {
			//		Limpio el posible texto lleno
			msj.style.color = Colores.msjVerde;
			msj.textContent = "";

			var reader = new FileReader();
			reader.onload = function (e) {
				//		Espero a que los elementos ya esten disponibles para utilizarce
				dUsuario.setCadena(e.target.result);
				self.mostrandoOpciones(document.getElementById("divCadena"), dUsuario.getCadena(), "Cadena desde archivo");

				document.getElementById("txtAreaCadena").value = "";
				respuesta = e.target.result;
			};
			reader.readAsText(archivo);

			//		Lleno mi objeto con la er que recibo del usuario
			var n = new Automata();
			n.lenguaje(dUsuario.getER());
			console.log("Caracteres ");
			console.log(n.getCaracteresEspeciales());

			return respuesta;
		} else {
			msj.style.color = Colores.msjRojo;
			msj.textContent = "El archivo que seleccionaste no es válido, por ahora solo aceptamos archivos con extensiones .txt";

			return null;
		}
	};

	//		void: 		Solo sirve para mostrar el texto en los selectores que le indiquen
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
	}
};