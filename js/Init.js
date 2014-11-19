(function () {
	'use strict';
	document.addEventListener("DOMContentLoaded", function () {
		document.getElementById("barraDiagrama").addEventListener("click", tabla);
		document.getElementById("barraTablaDatos").addEventListener("click", diagrama);
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
})();