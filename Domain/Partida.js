const Pozo = require('../Domain/Pozo')
const TotalCartas = require('../Domain/TotalCartas')

const PenalizarLevantaOtra = (jugador, baraja) => {
    jugador.roba(baraja)
}

const MovimiendoValido = (jugador, carta, pozo, partida) => {
    jugador.descarta(carta, pozo)
    partida.siguienteJugadorLevanta(jugador, TotalCartas(2))
}

module.exports = (baraja, ...jugadores) => {

    const pozo = baraja.iniciarPozo(Pozo())

    return {
        siguienteJugadorLevanta(oponente, totalCartas) {
            const gil = jugadores.filter(jugador => jugador != oponente)[0]
            gil.roba(baraja).roba(baraja)
        },
        caraDelPozo() {
            return pozo.ultimaCarta()
        },
        totalCartasEnPozo() {
            return pozo.totalCartas()
        },
        juega(jugador, carta) {

            carta.validaSobre(pozo.ultimaCarta())//comunicacion supone que pozo tiene una ultima carta
            ? MovimiendoValido(jugador, carta, pozo, this)
            : PenalizarLevantaOtra(jugador, baraja)
        }
    }
}