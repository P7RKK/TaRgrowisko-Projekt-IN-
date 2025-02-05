const jwt = require('jsonwebtoken');

const secretKey = 'twoj-sekret-klucz';

// Logowanie użytkownika
app.post('/login', async (req, res) => {
    const { email, haslo } = req.body;

    try {
        // Symulacja pobierania danych użytkownika z bazy
        const użytkownik = { id: 1, email: 'test@example.com', haslo: '$2b$10$abcd1234...' }; // Hasło zaszyfrowane

        // Weryfikacja hasła
        const isPasswordValid = await bcrypt.compare(haslo, użytkownik.haslo);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
        }

        // Generowanie tokena JWT
        const token = jwt.sign({ id: użytkownik.id, email: użytkownik.email }, secretKey, { expiresIn: '1h' });

        res.status(200).json({ message: 'Zalogowano', token });
    } catch (error) {
        res.status(500).json({ error: 'Błąd podczas logowania' });
    }
});
