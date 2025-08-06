//const { text } = require("express");

//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Juego del numero secreto';

//let parrafo = document.querySelector('p');

/*
parrafo.innerHTML = 'Adivina el número secreto!!';
parrafo.innerHTML += '<br>El número secreto es un número entre 1 y numeroMaximo0.';
parrafo.innerHTML += '<br>¿Cuál crees que es?';
parrafo.innerHTML += '<br>¿Listo? ¡Vamos!';
*/
////////////////////////////
// Variables globales
// Estas variables se utilizan para almacenar el valor del usuario,
// el número de intentos y el número secreto generado al inicio del juego   

let valorUsuario;
let numeroIntentos;
let numeroGenerado; // Variable para almacenar el número secreto generado
let numeroMaximo=4;
let listaNumerosSecretos = []; // Array para almacenar los números secretos generados



//let intentoDeUsuario = 0;

//console.log("Número secreto generado: " + numeroSecreto);
// Función que se ejecuta al hacer clic en el botón
// Se puede llamar directamente desde el HTML con onclick="intentoDeUsuario()"

/*
Funcion que modifica el texto de un elemento HTML
@elemento: Selector del elemento HTML
@texto: Nuevo texto a establecer
*/

function limpiarValorUsuario() {
    document.getElementById('valorUsuario').value = '';
    document.getElementById('valorUsuario').focus();
}


function modificaTextoInicio(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

/////////////////////
// # GENERAR NÚMERO SECRETO
// Esta función genera un número secreto aleatorio entre 1 y numeroMaximo
// y lo almacena en la variable numeroSecreto
// Si el número ya ha sido generado, se genera un nuevo número
// Si todos los números entre 1 y numeroMaximo han sido generados, se reinicia el juego


//////
/*
function generarNumeroSecreto()
{
    // Generar un número aleatorio entre 1 y numeroMaximo
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log("Número generado: " + numeroGenerado);
    // Verificar si el número ya ha sido generado
    // Si ya existe en el array, generar un nuevo número
    // Si no existe, agregarlo al array y devolverlo
    console.log("Lista de números secretos generados: " + listaNumerosSecretos);
    if (listaNumerosSecretos.length >= numeroMaximo) {
        console.log("Número ya generado, generar otro");
        generarNumeroSecreto();
        } else {
        listaNumerosSecretos.push(numeroGenerado); // Agregar el número generado al array
        console.log("Número secreto generado: " + numeroGenerado);
        return numeroGenerado; // Devolver el número generado
        }
}

*/
// Otra forma de generar un número secreto aleatorio entre 1 y numeroMaximo
function generarNumeroSecreto() 
{
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    console.log("Número generado: " + numeroGenerado);
    // Verificar si el número ya ha sido generado
    // Si ya existe en el array, generar un nuevo número
    // Si no existe, agregarlo al array y devolverlo
    console.log("Lista de números secretos generados: " + listaNumerosSecretos);

    if (listaNumerosSecretos.length == numeroMaximo) 
        {
        modificaTextoInicio('p', 'Todos los números entre 1 y numeroMaximo ya han sido generados. Reinicia el juego para comenzar de nuevo.');
        }
        else
        {
            if (listaNumerosSecretos.includes(numeroGenerado)) 
            {
                return generarNumeroSecreto(); // Llamada recursiva para generar un nuevo número
            } else 
                    {
                listaNumerosSecretos.push(numeroGenerado); // Agregar el número generado al array
                return numeroGenerado;  
                }   
        }
}

 ///////////////////////
// # VEZ O VECES
// Esta función devuelve 'intento' si el número de intentos es 1
// y 'intentos' si es mayor que 1
// Se utiliza para mostrar el mensaje correcto al usuario
// según el número de intentos realizados

function vecesVes(numeroIntentos) 
{
    if (numeroIntentos == 1) {
        return 'intento';   
    } else {
        return 'intentos';
    }
}


/////////////////////////////////////////
// # CONDICIONES INICIALES
// Inicializar el juego con las condiciones iniciales
// Generar un número secreto aleatorio entre 1 y numeroMaximo
// Establecer el número de intentos a 1
// Modificar el texto del título y párrafo iniciales
// Deshabilitar el botón de reinicio al inicio del juego

function condicionesIniciales() 
{
modificaTextoInicio('h1', 'Juego del número secreto');
modificaTextoInicio('p', '<br>El número secreto es un número entre 1 y numeroMaximo.');
numeroGenerado = generarNumeroSecreto();
//listaNumerosSecretos.push(numeroGenerado); // Agregar el número secreto al array
//console.log("Número secreto generado: " + numeroGenerado);
//console.log("Lista de números secretos generados: " + listaNumerosSecretos);
numeroIntentos = 1;
}     

// # REINICIAR JUEGO
// Limpiar el valor del usuario
function reiniciarJuego() 
{
    limpiarValorUsuario();
    condicionesIniciales();
    //document.getElementById('#reiniciar').disabled = true;
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    
}

condicionesIniciales();

//////////////////////
// # VERIFICAR INTENTO
// Esta función se ejecuta al hacer clic en el botón "Intentar"
// Obtiene el valor del usuario, lo compara con el número secreto
// y muestra mensajes según el resultado de la comparación
// Incrementa el número de intentos cada vez que se verifica un intento

function verificaIntento() 
{
    let valorUsuario = document.getElementById('valorUsuario').value;
    console.log("Valor del usuario: " + valorUsuario);
    console.log("Número secreto generado: " + numeroGenerado);
    console.log("Número de intentos: " + numeroIntentos);
    //console.log(numeroSecreto == valorUsuario);
    if (valorUsuario == numeroGenerado) 
        {
        modificaTextoInicio('p', '¡Felicidades! Has adivinado el número secreto.' +
            '<br>El número secreto era ' + numeroGenerado + '.' +
            '<br>Has necesitado ' + numeroIntentos + (numeroIntentos == 1 ? ' intento' : ' intentos') + ' para adivinarlo.');
        document.querySelector('#reiniciar').removeAttribute('disabled');
        
    
        }

 
        else if (valorUsuario < numeroSecreto) 
            {
        modificaTextoInicio('p', 'El número secreto es mayor que ' + valorUsuario + '.' +
            '<br>Has necesitado ' + numeroIntentos + ' ' + (numeroIntentos > 1 ? 'intentos' : 'intento') + ' para adivinarlo.');
            limpiarValorUsuario();
            } 
    else 
        {
        modificaTextoInicio('p', 'El número secreto es menor que ' + valorUsuario + '.' +
            '<br>Has realizado ' + numeroIntentos + ' ' + (numeroIntentos > 1 ? 'intentos' : 'intento') + ' para adivinarlo.');
        limpiarValorUsuario();
         }

         numeroIntentos++;
}
    

    






