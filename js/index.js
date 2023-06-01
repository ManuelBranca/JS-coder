// Primer entrega
// Calcular costo total de productos y/o servicios seleccionados por el usuario
// Calcular valor final de un producto seleccionado en funcion de impuestos y descuentos
// Calcular tiempo de espera promedio en relacion con la cantidad de turnos registrados
// Calcular edad promedio de personas registradas 
// Calcular pagos en cuotas sobre un monto determinado


function promedio(a,b,c){
  let resultado;
  resultado = (a+b)/c
  return resultado;
  } 


let eleccion = 0;
eleccion = prompt("ingrese 1 para calcular la nota final y 2 para calcular el promedio de edad")
if (eleccion == 1){
  alert("Se selecciono la opcion 1 'Calcular la nota final' ")
// Calcular nota final de alumnos ingresados
let alumno = " ";
let notaUno;
let notaDos;
let notaFinal;
let primeraVez = true;
let alumnosAprobados = 0;
let contador = 0;
while (alumno !== "Esc" && alumno !== "ESC" && alumno !== "esc") {
  if (primeraVez) {
    alumno = prompt("Ingrese el nombre y el apellido del alumno o Esc para finalizar");
    contador ++;
  } else {
    alumno = prompt("Ingrese el nombre y el apellido del siguiente alumno o Esc para finalizar");
    contador ++;
  }
  if (alumno !== "Esc" && alumno !== "ESC" && alumno !== "esc") {
    alert("A continuacion ingrese las notas de los dos parciales")
    notaUno = parseInt( prompt("Ingrese la nota del primer parcial"))
    notaDos = parseInt( prompt("Ingrese la nota del segundo parcial"))
    notaFinal = promedio (notaUno, notaDos, 2);
    if (notaFinal >= 6){
      alumnosAprobados ++;
    }
    alert ("La nota final de " + alumno + " es de " + notaFinal)
    primeraVez = false;
  } else if (contador == 0 ){
    alert("no se ingreso ningun alumno")
  } else {
    alert ("Finalizo la lista de alumnos.")
  }
}
alert("Si desea ver la cantidad de alumnos aprobados lo puede hacer presionando 'F12' luego de apretar el boton de 'aceptar'");
console.log("la cantidad de alumnos aprobados es de " + alumnosAprobados);
} else if (eleccion == 2){
// Calcular edad promedio de personas registrada
alert("elegiste la opcion 2 'Calcular la edad promedio de personas registradas'")
let persona = " " ;
let edad = 0;
let sumatoriaDeEdades = 0;
let cantidadDePersonas = 0;
let edadNegativa = false;
let sinPersonas = false;
while (persona !== "Esc" && persona !== "ESC" && persona !== "esc" ){
  persona = prompt("Ingrese el nombre de la persona, 'Esc' para terminar");
  if(persona !== "Esc" && persona !== "ESC" && persona !== "esc" ){
  cantidadDePersonas ++;
  edad = parseInt(prompt("Ingrese la edad aqui"));
  if (edad >= 0){
  sumatoriaDeEdades += edad;
  } else {
    alert("se ingreso una edad negativa");
    edadNegativa = true;
  } 
} else {
  alert ("No se ingreso ninguna edad")
  sinPersonas = true;
}
}
if (edadNegativa == false && sinPersonas == false){
  alert("El promedio de edades es de " + sumatoriaDeEdades/cantidadDePersonas)
}
}
