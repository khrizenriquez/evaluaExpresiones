evaluaExpresiones
=================
versión 0.1.2

Instrucciones
	Los archivos que se necesitan tienen una extensión:
	.js
	.css
	.styl
	.html
	.gif
	Para poder correr esta aplicación solo necesitas clonarlo o hacerle un fork, con eso puedes descargar todos
	los archivos, luego solo necesitas ejecutar o presionar doble clic sobre el archivo llamado "index.html" y en tu navegador web aparecerá la pantalla para que ingreses tu expresión regular

Características
	- Estoy utilizando la librería para crear máquinas de estado de http://gojs.net/latest/index.html 

Problemas
	- Cuando se presenta un estado final donde esta involucrado kleene no toma en cuenta estos estados como finales
	- No acepta expresiones regulares con paréntesis: ejemplo (ab)*b+
	- No acepta expresiones regulares con corchetes: ejemplo [0-9]*
	- No acepta expresiones regulares con pipe (|): ejemplo a|b+b
	- Presenta algunos problemas para diagramar para expresiones regulares como:
		ab*
		n1*n2*n3*...nn*


----------------
@khrizenriquez