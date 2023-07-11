//* Control + Espacio dentro de las llaves para buscar todos los métodos de la libreria
// import { shuffle } from 'underscore';
//* Para tomar todo el paquete colocamos ' _ ' en este caso para la lib. 'underscore'
//* o cualquier otro caracter. 
import _ from 'underscore';

//* Teniendo un archivo index.js en la carpeta 'usercases' podemos
//* traer todas las importanciones con uan sola línea de código.
import { crearDeck, pedirCarta, valorCarta, crearCarta } from './usercases';
// import { crearDeck } from "./usercases/crear-deck.js";
// import { pedirCarta } from './usercases/pedir-carta.js';
// import { valorCarta } from './usercases/valor-carta.js';

//* Importaciones individuales, utilizaremos { }.
// import crearDeck, { miNombre } from './usercases/crear-deck';

//* 'as' sirve para dar un alias
// import { crearDeck as crearNuevoDEck } from "./usercases/crear-deck.js";

//* Para importar una función por defecto de otro archivo js. Traera el valor por defecto.
// import cualquierNombreParaCrearNuevoDeck from "./usercases/crear-deck.js";


let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'],
      especiales = ['A', 'J', 'Q', 'K'];

let puntosJugadores = [];

//* Referencias del HTML
const btnPedir   = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugadores = document.querySelectorAll('.divCartas'),
      puntosHTML         = document.querySelectorAll('small');

//* Esta función inicializa el juego
//? Desde ES6 es posible usar parámetros por defecto .
const inicializarJuego = ( numJugadores = 2) => { 
    deck = crearDeck( tipos, especiales ); 
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0);
    }

    puntosHTML.forEach( e => e.innerText = 0);
    divCartasJugadores.forEach( e => e.innerHTML = '');

    btnPedir.disabled   = false;
    btnDetener.disabled = false;
};

//* Determina el ganador
const turnoComputadora = ( puntosMinimos ) => {    
    let puntosComputadora = 0;

    do {
        const carta = pedirCarta( deck );
        puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
        crearCarta( carta, puntosJugadores.length - 1, divCartasJugadores );

        if ( puntosMinimos >= 21 ) {
            break;                               
        }

    } while ( (puntosComputadora <= puntosMinimos) && (puntosMinimos <= 21) );
    
    determinarGanador();
}

//* Determina el ganador
const determinarGanador = () => {
    //? Desestructuración de arreglos
    const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

    setTimeout(() => {
        if ( puntosComputadora === puntosMinimos) {
            alert('Nadie ganó :(');
        } else if ( puntosMinimos > 21 ) {
            alert('Ganó la computadora');
        } else if ( puntosComputadora > 21) {
            alert('Ganaste');
        } else if ( puntosMinimos === 21 && puntosComputadora < 21) {
            alert('Ganaste');
        } else {
            alert('Ganó la computadora');
        }
    }, 100 );
}

//* Turno: 0 = primer jugador y el útlimo será la computadora
const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
    puntosHTML[turno].innerText =puntosJugadores[turno];
    return puntosJugadores[turno];
}


btnPedir.addEventListener('click', () => {
    const carta = pedirCarta( deck );
    const puntosJugador = acumularPuntos( carta, 0 );

    crearCarta( carta, 0, divCartasJugadores );

    if ( puntosJugador > 21 ) {
        console.warn( 'Lo siento mucho, perdiste' );
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ) {
        console.warn( '21, genial!' );
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugadores[0] );
});

btnNuevo.addEventListener('click', () => {
    inicializarJuego();
});