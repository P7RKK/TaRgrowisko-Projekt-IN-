// Middleware do weryfikacji tokena JWT
function autoryzacja(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Brak tokena' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Dodanie danych użytkownika do obiektu żądania
        next();
    } catch (error) {
        res.status(401).json({ error: 'Nieprawidłowy token' });
    }
}

// Chroniony endpoint
app.get('/użytkownicy/me', autoryzacja, (req, res) => {
    res.status(200).json({ message: 'Dostęp autoryzowany', dane: req.user });
});
