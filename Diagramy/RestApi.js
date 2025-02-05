const axios = require('axios');

// Funkcja weryfikująca użytkownika
async function zweryfikujUżytkownika(idUżytkownika) {
    try {
        const odpowiedź = await axios.get(`http://serwis-użytkownika:5000/użytkownicy/${idUżytkownika}`);
        return odpowiedź.data; // Zwraca dane użytkownika
    } catch (błąd) {
        console.error('Błąd podczas weryfikacji użytkownika:', błąd);
        throw new Error('Nie udało się zweryfikować użytkownika');
    }
}

// Funkcja tworząca aukcję
async function utwórzAukcję(daneAukcji) {
    const użytkownik = await zweryfikujUżytkownika(daneAukcji.idUżytkownika);
    if (użytkownik && użytkownik.czyZweryfikowany) {
        console.log('Użytkownik zweryfikowany, tworzenie aukcji:', daneAukcji);
        // Logika tworzenia aukcji
    } else {
        throw new Error('Weryfikacja użytkownika nie powiodła się');
    }
}

// Przykład tworzenia aukcji
utwórzAukcję({ idUżytkownika: '12345', tytuł: 'Laptop', cenaPoczątkowa: 500 });
