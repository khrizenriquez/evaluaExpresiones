var DatosUsuario = function () {
	//		Inicializando mis valores por defecto
	init: {
		this.cadena = "";
		this.er = "";
	};

	//		Setters
	this.setER = function (er) {this.er = er;};
	this.setCadena = function (cadena) {this.cadena = cadena;};
	//		Getters
	this.getER = function () {return this.er;};
	this.getCadena = function (cadena) {return this.cadena;};

	//		Función para validar las cadenas por medio de la expresion regular dada
	this.validandoCadena = function () {};
};