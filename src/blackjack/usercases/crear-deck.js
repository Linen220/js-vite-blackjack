import _ from "underscore";

//* MEJORANDO LA DOCUMENTACIÓN - JSDoc Comments
/**
 * Esta función crea un nuevo deck
 * @param {Array<String>} tiposDeCarta  Ejemplo: ['C', 'D', 'H', 'S']
 * @param {Array<String>} tiposEspeciales Ejemplo: ['A', 'J', 'Q', 'K']
 * @returns {Array<String>} retorna un nuevo deck de cartas
 */

//* Utilizamos 'export' para exportar una función o variable.
// export const miNombre = 'Fernando';

export const crearDeck = ( tiposDeCarta, tiposEspeciales ) => {

    //! Con typescript no seria necesario estas condiciones.
    //* Si tipoDeCarta es null o undefined, entonces...
    if ( !tiposDeCarta || tiposDeCarta.length === 0 ) 
        throw new Error('TiposDeCarta es obligatorio como un arreglo de string');

    //* Si tipoEspeciañes es null o undefined, entonces...
    if ( !tiposEspeciales || tiposEspeciales.length === 0 ) 
        throw new Error('TiposEspeciales es obligatorio como un arreglo de string');


    let deck = [];
    for ( let i = 2; i <= 10; i++ ) {
        for (const tipo of tiposDeCarta) {
            deck.push( i + tipo );
        }
    }
    for (const tipo of tiposDeCarta) {
        for (const especial of tiposEspeciales) {
            deck.push( especial + tipo );
        }   
    }
    return _.shuffle( deck );
}

//* Por defecto se va exportar 'crearDeck' en este caso si colocamos la sgte línea.
// export default crearDeck;