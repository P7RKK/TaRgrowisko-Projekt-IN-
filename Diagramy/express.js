const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware do obsługi danych w formacie JSON

// Pobieranie szczegółów użytkownika
app.get('/użytkownicy/:id', (req, res) => {
    const userId = req.params.id;
    const user = { id: userId, imię: 'Jan Kowalski', email: 'jan@example.com' };
    res.status(200).json(user);
});

// Tworzenie nowego użytkownika
app.post('/użytkownicy', (req, res) => {
    const nowyUżytkownik = req.body;
    res.status(201).json({ message: 'Użytkownik utworzony', data: nowyUżytkownik });
});

app.listen(port, () => {
    console.log(`Serwer działa na porcie ${port}`);
});