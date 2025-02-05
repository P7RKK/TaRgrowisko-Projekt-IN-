// Importowanie modułów
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const path = require('path');
const { Server } = require('socket.io');
const http = require('http');

// Importowanie tras i modeli
const connectDB = require('./config/db');
const Auction = require('./models/Auction');
const authRoutes = require('./routes/authRoutes');
const auctionRoutes = require('./api/auctions');
const paymentRoutes = require('./api/payments');

// Inicjalizacja aplikacji
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Połączenie z MongoDB
connectDB();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Połączono z MongoDB'))
  .catch((err) => console.error('Błąd połączenia z MongoDB:', err));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Zbyt wiele żądań. Spróbuj ponownie później.',
});
app.use('/api/', apiLimiter);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.',
});
app.use('/api/users/login', loginLimiter);

// Trasy API
app.use('/api/auth', authRoutes); // Trasy autoryzacji i użytkowników
app.use('/api/auctions', auctionRoutes); // Trasa aukcji
app.use('/api/payments', paymentRoutes); // Trasa płatności
app.use('/api/users', authRoutes); //  Trasa

// Obsługa błędów - 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Nie znaleziono żądanej trasy' });
});

// Globalna obsługa błędów
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.status || 500;
  const errorMessage = statusCode === 500 ? 'Błąd serwera' : err.message;

  res.status(statusCode).json({
    message: errorMessage,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

// Inicjowanie prostego endpointu
app.get('/', (req, res) => {
  res.send('Backend działa poprawnie!');
});

// Uruchomienie serwera
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));

// Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Nowe połączenie WebSocket');

  socket.on('joinAuction', (auctionId) => {
    socket.join(auctionId);
  });

  socket.on('disconnect', () => {
    console.log('Rozłączono WebSocket');
  });
});

app.set('io', io); // Umożliwia dostęp do io w kontrolerach

// Sprawdzanie zakończonych aukcji (Cron)
cron.schedule('*/5 * * * *', async () => {
  console.log('Sprawdzanie zakończonych aukcji...');
  const auctions = await Auction.find({ isActive: true, endTime: { $lt: Date.now() } });

  for (const auction of auctions) {
    await endAuction(auction);
    console.log(`Aukcja "${auction.title}" została zakończona`);
  }
});
