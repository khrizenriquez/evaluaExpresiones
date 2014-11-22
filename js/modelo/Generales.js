var Generales = (function () {
	var self = {
		//		Colores generales a utilizar
		Colores: {
			msjRojo: "#e74c3c",
			msjVerde: "#27ae60",
			msjAzul: "#2980b9",
			msjGris: "#7f8c8d"
		},
		diagrama: new go.Diagram("diagramaEstados"),
		instanciaMD: new MostrandoDatos(),
		Loaders:{
			packmanNegro: "<img src='img/loaders/packmanNegro.GIF' alt='Cargando...' />"
		}
	};

	return self;
})();