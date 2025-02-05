const WebSocket = require('ws');

// Inicjalizacja serwera WebSocket
const serwer = new WebSocket.Server({ port: 8080 });

serwer.on('connection', (gniazdo) => {
    console.log('Nowe połączenie z klientem');
    gniazdo.on('message', (wiadomość) => {
        const dane = JSON.parse(wiadomość);
        if (dane.typ === 'oferta') {
            const zaktualizowanaAukcja = zaktualizujAukcję(dane.idAukcji, dane.oferta);
            serwer.clients.forEach(klient => {
                if (klient.readyState === WebSocket.OPEN) {
                    klient.send(JSON.stringify({ typ: 'aktualizacja', aukcja: zaktualizowanaAukcja }));
                }
            });
        }
    });
});
