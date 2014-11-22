var MostrandoDatos = function () {};
//		void: 	Solo sirve para mostrar el texto en los selectores que le indiquen
MostrandoDatos.prototype.mostrandoOpciones = function (selector, mensaje, etiqueta) {	
	//		Hago referencia a el parráfo, ahí coloco lo que venga de mensaje
	if (etiqueta != "" && etiqueta != null && etiqueta != undefined) 
		selector.children[0].textContent = etiqueta;

	selector.children[1].innerHTML = mensaje;
};

MostrandoDatos.prototype.obteniendoTexto = function (selector) {
	return selector.children[1].innerHTML;
};

//		Elementos de la tabla de transiciones
MostrandoDatos.prototype.cuerpoTabla = function (selector, obj) {
	selector.children[1].innerHTML = "";
	for (var i in obj) {
		selector.children[1].innerHTML += 
		"<label>" + 
		"<span class='label'>Estado saliente {"+ obj[i]["from"] +"}</span>" + 
		"<span class='success label'>Carácter "+ obj[i]["transicion"] +"</span>" + 
		"<span class='label'>Estado entrante {"+ obj[i]["to"] +"}</span>" + 
		"</label>";
		//selector.children[1].innerHTML += "<td>"+ obj[i]["transicion"] +"</td>";
		//selector.children[1].innerHTML += "<td>"+ obj[i]["to"] +"</td>";
	}
};
