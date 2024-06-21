let numeroSecreto = 0;
let intentos = 1;
let listaNúmerosSorteados = [];
let numeroMáximo = 10;
let limiteIntentos = 3;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (intentos < limiteIntentos) {
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p', `Acertaste el numero en ${intentos} ${intentos == 1 ? 'intento' : 'intentos'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p', 'El numero secreto es menor');
            } else {
                asignarTextoElemento('p', 'El numero secreto es mayor');
            }
            intentos++;
            limpiarCaja();
        }
    } else {
        asignarTextoElemento('p', `Se acabaron los ${limiteIntentos} intentos posibles. El numero secreto era ${numeroSecreto}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
    return;
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMáximo)+1;
    // si ya sorteamos todos los números
    if (listaNúmerosSorteados.length == numeroMáximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los números posibles');
    } else {
        // Si el numero generado esta incluido en la lista
        if (listaNúmerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNúmerosSorteados.push(numeroGenerado);
            console.log(numeroGenerado);
            return numeroGenerado;
        }
    }

}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del numero secreto');
    asignarTextoElemento('p', `Indica un numero del 1 al ${numeroMáximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    // Limpiar caja
    limpiarCaja();
    // Indicar mensaje de intervalo de intentos
    // Generar nuevo numero secreto
    // Inicializar el numero de intentos
    condicionesIniciales();
    // Deshabilitar botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    
}

condicionesIniciales();