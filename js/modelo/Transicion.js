'use strict';

var Transicion = function (er) {
	init: {
		var e = 0;
		var letraEstado = "q";
		var objTransicion = [];
		this.estadosFinales = [];
		this.er = er;
		//this.elemento = "diagramaEstados";
		var posX = 100;
		var posY = 300;
		var transiciones = [];
		var $;// For conciseness. See the "Building Parts" intro page for more
		var diagrama = Generales.diagrama;
		var self = this;
		this.afnd = false;
	};

	//		Getters
	this.getTransicion = function () {
		var tmp = [];
		for (var i = 0; i <= e; i++) 
			tmp.push(letraEstado + "" + i);

		return tmp;
	};
	this.getEsAfnd = function () {return this.afnd};
	//		Setters
	this.setEsAfnd = function (b) {this.afnd = b};

	this.estado = function () {
		//diagram = new go.Diagram(this.elemento);
		$ = go.GraphObject.make;
		// the node template describes how each Node should be constructed
	    diagrama.nodeTemplate =
	    	$(go.Node, "Auto",  // the Shape automatically fits around the TextBlock
	    		$(go.Shape, "RoundedRectangle",  // use this kind of figure for the Shape
	         	// bind Shape.fill to Node.data.color
	          	new go.Binding("fill", "color")),
	        	$(go.TextBlock,
	          		{ margin: 5 },  // some room around the text
	          		// bind TextBlock.text to Node.data.key
	          		new go.Binding("text", "key"))
	    );

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
						from: letraEstado + "" + e,
						to: letraEstado + "" + e,
						transicion: this.er[i]
					});

					/*		Válido los estados finales, si no hay valor a la derecha y a la izquierda
					es un estado final, si no hay valor del lado derecho pero si del lado izquierdo es estado final*/
					if (this.er[(i + 2)] == undefined && this.er[(i - 1)] != undefined) {
						this.estadosFinales.push(letraEstado + "" + e);
					} else
					if (this.er[(i + 2)] == undefined) {
						this.estadosFinales.push(letraEstado + "" + e);
					}

					//		Valido que el valor siguiente (+3) sea una cerradura positiva
					if (this.er[(i + 3)] == "+") {
						objTransicion.push({
							from: letraEstado + "" + e,
							to: letraEstado + "" + (e + 1),
							transicion: this.er[(i + 2)]
						});
					}
					/*transiciones.push({
						key: letraEstado + "" + (e + 1),
						color: "lightblue",
						valor: "klenee"
					});*/
					//		Valido si viene * (klenee) en la segunda posición, si es así no inicializo mi valor con q0
					if (this.er.indexOf("*") < 2) {
						transiciones.push({
							key: letraEstado + "" + e,
							color: "lightblue",
							valor: "klenee en 0 if"
						});
						//		Valido que vengan mas valores, sino solo una vez hago la transición
						if (this.er[(i + 2)] != undefined) {
							transiciones.push({
								key: letraEstado + "" + (e + 1),
								color: "lightblue",
								valor: "klenee"
							});
						}
						e++;
					} else {
						if (e == 0) {
						} else {
							/*transiciones.push({
								key: letraEstado + "" + (e + 1),
								color: "lightblue",
								valor: "klenee en 0 else"
							});*/
						}
					}
					//e++;
				} else 
				if (this.er[(i + 1)] == "+") {
					/*		Válido los estados finales, si no hay valor a la derecha y a la izquierda
					es un estado final, si no hay valor del lado derecho pero si del lado izquierdo es estado final*/
					if (this.er[(i + 2)] == undefined && this.er[(i - 1)] != undefined) {
						this.estadosFinales.push(letraEstado + "" + (e + 1));
					} else
					if (this.er[(i + 2)] == undefined) {
						this.estadosFinales.push(letraEstado + "" + e);
					}

					//		Valido si el valor (-1) es klenee para omitir agregar valores
					if (this.er[(i - 1)] != "*") {
						objTransicion.push({
							from: letraEstado + "" + e,
							to: letraEstado + "" + (e + 1),
							transicion: this.er[i]
						});
						transiciones.push({
							key: letraEstado + "" + (e + 1),
							color: "lightblue",
							valor: "positiva"
						});
					}
					//		Válido si viene cerradura positiva en mi valor del lado derecho
					objTransicion.push({
						from: letraEstado + "" + e,
						to: letraEstado + "" + e,
						transicion: this.er[i]
					});
					if (e == 0) {
						//		Valido si viene + (cerradura positiva) en la segunda posición, si es así no inicializo mi valor con q0
						if (this.er.indexOf("+") < 2) {
							transiciones.push({
								key: letraEstado + "" + e,
								color: "lightblue",
								valor: "positiva en 0 if"
							});
							/*transiciones.push({
								key: letraEstado + "" + (e + 1),
								color: "lightblue",
								valor: "positiva en 0 if +1"
							});*/
							//trans.push(letraEstado + "" + e);
						} else {
							transiciones.push({
								key: "q0",
								color: "lightblue",
								valor: "positiva en 0 else"
							});
							transiciones.push({
								key: letraEstado + "" + (e + 1),
								color: "lightblue",
								valor: "positiva en 0 else +1"
							});
						}
					} else {
						/*transiciones.push({
							key: letraEstado + "" + e,
							color: "lightblue",
							valor: "positiva"
						});*/
						
					}
					e++;
				} else {
					//		En mi clase Automata coloco los estados uno por uno
					if (e == 0) {
						transiciones.push({
							key: "q0",
							color: "lightblue",
							valor: "sin en 0"
						});
						transiciones.push({
							key: "q1",
							color: "lightblue",
							valor: "sin sin en 0"
						});

						objTransicion.push({
							from: letraEstado + "" + e,
							to: letraEstado + "" + (e + 1),
							transicion: this.er[i]
						});
					} else {
						//		Si el valor que viene por la izquierda es * (klenee) resto en 1 a "e"
						if (this.er[(i - 1)] == "*" && this.er.indexOf("*") < 2) {
							e--;
							/*transiciones.push({
								key: letraEstado + "" + (e + 1),
								color: "lightblue",
								valor: "sin con valor izquierda"
							});*/
							objTransicion.push({
								from: letraEstado + "" + e,
								to: letraEstado + "" + (e + 1),
								transicion: this.er[i]
							});
						} else {
							transiciones.push({
								key: letraEstado + "" + (e + 1),
								color: "lightblue",
								valor: "sin"
							});

							objTransicion.push({
								from: letraEstado + "" + e,
								to: letraEstado + "" + (e + 1),
								transicion: this.er[i]
							});
						}
					}
					//		Si no hay mas valores del lado derecho es mi estado final este
					if (this.er[(i + 1)] == undefined && this.er[(i - 1)] == undefined) {
						this.estadosFinales.push(letraEstado + "" + e);
					} else 
					if (this.er[(i + 1)] == undefined) {
						this.estadosFinales.push(letraEstado + "" + (e + 1));
					}
					e++;
				}
			}
			console.log("-----------------------");
		}
		//		Obteniendo los valores que estan en mi arreglo de transiciones
		/*var objTransiciones = [];
		for (var t in transiciones) {
			objTransiciones.push({
				key: transiciones[t],
				color: "lightblue"
			});
		}*/
		console.log(transiciones);
		console.log(objTransicion);
		console.log(this.estadosFinales);

	    // the Model holds only the essential information describing the diagram

	    diagrama.model = new go.GraphLinksModel(transiciones, objTransicion);

	    diagrama.initialContentAlignment = go.Spot.Center;
	    // enable Ctrl-Z to undo and Ctrl-Y to redo
	    diagrama.undoManager.isEnabled = true;

	    //Mostrando los valores necesarios par a el alfabeto, estado incial, estado final y estados
	    this.colocandoValores("Q: ", "{ " +self.getTransicion() + " }", "Estados");
	    this.colocandoValores("q0: ", "{ q0 }", "Estado inicial");
	    this.colocandoValores("f: ", "{ " + this.estadosFinales + " }", "Estado final");
	    this.tablaTransiciones(objTransicion);
	    this.validandoAfn(objTransicion);
	};
	this.colocandoValores = function (tituloV, valores, tituloEtiqueta) {
		//		obtenidendo el valor anterior
		var v;
		setTimeout(function () {
			v = Generales.instanciaMD.obteniendoTexto(document.getElementById("divTextoExtra"));
			Generales.instanciaMD.mostrandoOpciones(document.getElementById("divTextoExtra"), v + "<label title='" +
				tituloEtiqueta
			+ "'>"+ tituloV + valores + "</label>");
		}, 2000);
	};
	//		Mando a llamar a la tabla para colocar los valores de las transiciones
	this.tablaTransiciones = function (obj) {
		//		Limpiando el valor que este antes
		document.querySelector("#tablaDatos .contenedor").innerHTML = Generales.Loaders.packmanNegro;
		setTimeout(function () {
		//		Llamando el cuerpo de la tabla
			document.querySelector("#tablaDatos .contenedor").innerHTML = "";
			Generales.instanciaMD.cuerpoTabla(document.getElementById("tablaDatos"), obj);
		}, 2000);
	}
	/*		Verificando si es afnd o afn, podemos obtener la respuesta si una transición de un estado
	sale mas de una vez en ese mismo estado, si obtengo un valor que si cumple eso omito el ciclo xq es 
	afnd*/
	this.validandoAfn = function (obj) {
		var e = document.querySelector("#tablaDatos #tipoAutomata");
		for (var i in obj) {
			i = parseInt(i);
			if (obj[(i+1)] != undefined) {
				if (obj[i]["from"] == obj[(i+1)]["from"] && obj[i]["a"] == obj[(i+1)]["a"]) {
					this.setEsAfnd(true);
					break;
				}
			}
		}
		(this.getEsAfnd()) ? e.innerHTML = "<br /><label>Es un automata no finito determinista.</label>" : e.innerHTML = "<br /><label>Es un automata finito determinista.</label>";
	};
};
