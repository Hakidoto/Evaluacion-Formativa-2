let TotalPtsJugador = 0;
let TotalPtsComputadora = 0;
let cartas = [];
let carta;
const naipes = ['K', 'Q', 'J', 'A'];

CrearBaraja();

$('#btn-nuevo').click(function () {
    IniciarJuego();
});

$('#btn-carta').click(function () {
    turnoJugador();
});

$('#btn-detener').click(function () {
    $('#btn-carta').attr('disabled', 'true')
    $('#btn-detener').attr('disabled', 'true')
    turnoComputadora();

});


function IniciarJuego() {
    $('#cartasJugador').html('');
    $('#cartasComputadora').html('');
    console.clear();
    CrearBaraja();
    TotalPtsJugador = 0;
    TotalPtsComputadora = 0;
    $('#puntosJugador').text(TotalPtsJugador);
    $('#puntosComputadora').text(TotalPtsComputadora);
    $('#btn-carta').removeAttr('disabled');
    $('#btn-detener').removeAttr('disabled');
    $('#mensajeGanador').addClass('hidden');

}

function CrearBaraja() {
    cartas = [];
    const numeros = [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const figuras = ['J', 'Q', 'K', 'A'];
    const palos = ['C', 'D', 'H', 'S'];

    for (const n of numeros) {
        for (const p of palos) {
            cartas.push(n + p);
        }
    }
    figuras.forEach((l) => {
        palos.forEach((p) => {
            cartas.push(l + p);
        })
    })

    cartas = _.shuffle(cartas)
    console.log(cartas);
}

function valor(carta) {
    let valorCarta = carta.substring(0, carta.length - 1);

    if (naipes.includes(valorCarta) && valorCarta === 'A') {
        return (valorCarta === 'A' && (TotalPtsComputadora > 21 || TotalPtsJugador > 21)) ? 1 : 11;
    }
    else if (naipes.includes(valorCarta) && valorCarta != 'A') {
        return valorCarta = 10
    }
    else {
        return parseInt(valorCarta);
    }

}
function turnoJugador() {
    carta = cartas.shift();
    $('#cartasJugador').html($('#cartasJugador').html() + `<img src='./imagenes/cartas/${carta}.png'>`);

    TotalPtsJugador += valor(carta);
    $('#puntosJugador').text(TotalPtsJugador);

    if (TotalPtsJugador > 21) {
        $('#btn-carta').attr('disabled', 'true');
        $('#btn-detener').attr('disabled', 'true');
        turnoComputadora();
    }
}
function turnoComputadora() {
    let ganaJugador = true;
    do {
        carta = cartas.shift();
        $('#cartasComputadora').html($('#cartasComputadora').html() + `<img src='./imagenes/cartas/${carta}.png'>`);

        TotalPtsComputadora += valor(carta);
        $('#puntosComputadora').text(TotalPtsComputadora);
        if (TotalPtsJugador > 21) {
            ganaJugador = false;
            mensajeJugador(ganaJugador ? 'El jugador gana' : 'La computadora gana');
            break;
        }
    } while (TotalPtsComputadora <= 21 && TotalPtsComputadora < TotalPtsJugador);

    if (TotalPtsComputadora <= 21 && TotalPtsComputadora >= TotalPtsComputadora) {
        ganaJugador = false;
        mensajeJugador(ganaJugador ? 'El jugador gana' : 'La computadora gana');
    }
    mensajeJugador(ganaJugador ? 'El jugador gana' : 'La computadora gana');

    function mensajeJugador(mensajeJugador) {
        $('#mensajeGanador').text(mensajeJugador)
        $('#mensajeGanador').removeClass('hidden');

    }
}
