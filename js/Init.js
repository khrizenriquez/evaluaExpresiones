(function () {
	document.addEventListener("DOMContentLoaded", function () {
		document.getElementById("barraDiagrama").addEventListener("click", tabla);
		document.getElementById("barraTablaDatos").addEventListener("click", diagrama);
		subiendoImagen("fileCadena", "btnSubirArchivo");
	});

	//		Elementos que seran mostrados
	function tabla () {
		var tContenido = document.getElementById("tablaDatos");
		tContenido.style.left = "0%";
	}
	function diagrama () {
		var tContenido = document.getElementById("tablaDatos");
		tContenido.style.left = "100%";
	}

	function subiendoImagen (idFile, idBoton) {
	    var wrapper = $("<div style='height: 0; width: 0; overflow: hidden;'><div>");
	    var fileImagen = $("#" + idFile).wrap(wrapper);

	    //todos los evento que tenga se los quito
	    $("#" + idBoton).off("click");

	    //agrego el evento click para que lo escuche el elemento
	    $("#" + idBoton).on("click", function(event, objetct) {
            fileImagen.click();
	    }).show();

	    //		Válido que el navegador pueda utilizar la Api de File reader, de lo contrario des habilito la opción para subir imagenes
	    if (typeof window.FileReader === "undefined") {
			// No es soportado el File API
			document.getElementById("btnSubirArchivo").disabled = true;
			document.getElementById("msjER").textContent = "Lo siento, tengo que deshabilitar tu opción para subir archivos ya que tu navegador no soporta esta opción";
		}
	}
})();