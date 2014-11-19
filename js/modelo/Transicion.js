'use strict';

var Transicion = function (er) {
	init: {
		var estado = 0;
		var letraEstado = "q";
		var objTransicion = [];
		this.er = er;
	};

	this.estado = function () {
		var caracteres = new Automata().carac;
		var operaciones = new Automata().op;
		var boolCa, boolOp;
		for (var i in this.er) {
			i = parseInt(i);
			boolCa = true;
			boolOp = true;
			//		Veo los valores como llaves y paréntesis para omitirlos
			for (var p in caracteres) {
				//		Si regresa -1 es xq no coinciden los valores
				if (this.er[i].indexOf(caracteres[p]) !== -1) {
					boolCa = true;
					break;
				}
				boolCa = false;	
			}
			//		Veo los valores como signos de suma o multiplicación para omitirlos
			for (var m in operaciones) {
				//		Si regresa -1 es xq no coinciden los valores
				if (this.er[i].indexOf(operaciones[m]) !== -1) {
					boolOp = true;
					break;
				}
				boolOp = false;
			}
			if (!boolCa && !boolOp) {
				if (this.er[(i + 1)] == "*") {
					//		Válido si viene klenee en mi valor del lado derecho
					objTransicion.push({
						estadoI: letraEstado + "" + estado,
						estadoF: letraEstado + "" + estado,
						transicion: this.er[i]
					});
				} else 
				if (this.er[(i + 1)] == "+") {
					//		Válido si viene cerradura positiva en mi valor del lado derecho
					estado++;
					objTransicion.push({
						estadoI: letraEstado + "" + (estado - 1),
						estadoF: letraEstado + "" + estado,
						transicion: this.er[i]
					});
					objTransicion.push({
						estadoI: letraEstado + "" + estado,
						estadoF: letraEstado + "" + estado,
						transicion: this.er[i]
					});
				} else {
					estado++;
					objTransicion.push({
						estadoI: letraEstado + "" + (estado - 1),
						estadoF: letraEstado + "" + estado,
						transicion: this.er[i]
					});
				}
				//		En mi clase Automata coloco los estados uno por uno
				new Automata().transiciones.__proto__.push(letraEstado + "" + estado);
			}
			console.log("-----------------------");
		}
		console.log(objTransicion);
	};
	this.transicion = function () {};
};
