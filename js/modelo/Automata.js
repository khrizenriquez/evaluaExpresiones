/*
		Autor: Khriz Enríquez @khrizenriquez

		Tendrá la definición de los valores que me servirán para crear la gráfica y el diagrama de estados
*/
var Automata = function () {
	//		Inicializando mis valores por defecto
	init: {
		this.alfabeto = [];
		this.caracteresEspeciales = [];
		this.operadores = [];
		this.op = ["+", "*"];
		this.carac = ["{", "[", "(", ")", "]","}"];
	};

	//		Getters
	this.getAlfabeto = function () {return this.alfabeto;};
	this.getCaracteresEspeciales = function () {return this.caracteresEspeciales;};
	this.getOperadores = function () {return this.operadores;};
	//		Setters
	this.setAlfabeto = function (t) {this.alfabeto = t;};
	this.setCaracteresEspeciales = function (c) {this.caracteresEspeciales = c;};
	this.setOperadores = function (o) {this.operadores = o;};

	//		Quitando valores a los arreglos
	//		arr: t 			| int: pos
	this.removeToken = function (arr, pos) {
		arr.splice(pos, 1);
	};

	/*arr: l
	Separando los caracteres que vengan en el arreglo y los uso como tokens, los valores que no me sirvan los
	envío a los metodos de caracteres especiales y operadores
	*/
	this.lenguaje = function (l) {
		separaCadena(l);
	};

	//		String: cadena
	var separaCadena = function (cadena) {
		var expLetras = new RegExp("^[a-z]*$", "");
		var expNum = new RegExp("^[0-9]*$", "");
		var c = cadena;
		var carac = [], op = [];

		//		Primero quito los caracteres especiales
		for (var i in c) {
			//		Validando si es número y tiene signo menos
			if (c[i] == "-") {
				if ((typeof(Number(c[i + 1])) == "number" && Number(c[i + 1]) !== "NaN")) {
					if (c[i - 1] !== undefined) {
						if (expLetras.test(c[i - 1]) == false && expNum.test(c[i - 1]) == false) {
							c = c.replace(c[i + 1], "");
							i--;
						} else {
							c = c.replace(c[i], ",");
							i--;
						}
					}
				}
			}

			//		Validando que mi cadena no tenga caracteres especiales
			for (var j in this.carac) {
				if (cadena[i] == this.carac[j]) {
					carac.push(cadena[i]);
					for (var j1 in cadena) 
						c = c.replace(this.carac[j1], ",");
				}
			}
			//		Validando que mi cadena no tenga operadores
			for (var l in this.op) {
				if (cadena[i] == this.op[l]) {
					op.push(cadena[i]);
					for (var l1 in cadena) 
							c = c.replace(this.op[l1], ",");
				}
			}
		}

		//		Envío los arreglos ya de manera separada
		filtroAlfabeto(c.replace(/,/g, ""), "alfabeto");
		filtroAlfabeto(carac, "caracter");
		filtroAlfabeto(op, "operadores")
	}.bind(this);

	//		Necesito omitir los valores repetidos
	//		String: a 			String: tipo
	var filtroAlfabeto = function (a, tipo) {
		//		Convierto de string a arreglo mi parametro "a", de esa manera puedo ordenarlo
		if (typeof(a) === "string") a = a.split("");

		//		Primero ordeno mi arreglo para que sea fácil eliminar los valores repetidos
		a.sort(function (a, b) {
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		});

		//		Recorro mi arreglo y elimino el valor si el indice actual es el mismo que el indice actual + 1
		if (a.length > 1) {
			for (var i = 0, j = a.length; i < j; i++) {
				if (a[i + 1] !== undefined) {
					if (a[i] == a[i + 1]) {
						a.splice((i + 1), 1);
						i--;
					}
				}
			}
		}

		//		Elimino la primer coma (,) posible
		if (a[0] == "") a.splice(0, 1);

		if (tipo == "alfabeto") {
			this.setAlfabeto(a);
		}
		else 
		if (tipo == "caracter") 
			this.setCaracteresEspeciales(a);
		else 
		if (tipo == "operadores") 
			this.setOperadores(a);
	}.bind(this);
};