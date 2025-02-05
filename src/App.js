import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HomePageGuest from './pages/HomePageGuest';
import HomePageUser from './pages/HomePageUser';
import MyAuctions from './pages/MyAuctions';
import WatchedAuctions from './pages/WatchedAuctions';
import CartPage from './pages/CartPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageAuctions from './pages/Admin/ManageAuctions';
import Reports from './pages/Admin/Reports';
import MessagesPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import AllAuctions from './components/AllAuctions';
import AllAuctionsPage from './pages/AllAuctionsPage';
import FloatingChat from './components/FloatingChat'; // Import Floating Chat

const App = () => {
  const user = useSelector((state) => state.user.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Wymuszenie zalogowanego użytkownika

  const handleLogin = () => {
    // Sztuczne logowanie - zmiana stanu
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Wylogowanie - zmiana stanu
    setIsLoggedIn(false);
  };

  // Lista gier do dynamicznego wyszukiwania
  const products = [
    { id: 1, name: 'Cyberpunk 2077', platform: 'PC' },
    { id: 2, name: 'Cyberpunk 2077', platform: 'Xbox' },
    { id: 3, name: 'Cyberpunk 2077', platform: 'PlayStation' },
    { id: 4, name: 'Cyberpunk 2077', platform: 'Stadia' },
    { id: 5, name: 'Cyberpunk 2077', platform: 'Nintendo Switch' },
    { id: 6, name: 'The Witcher 3: Wild Hunt', platform: 'PC' },
    { id: 7, name: 'Elden Ring', platform: 'PlayStation' },
    { id: 8, name: 'Red Dead Redemption 2', platform: 'Xbox' },
    { id: 9, name: 'God of War', platform: 'PlayStation' },
    { id: 10, name: 'Horizon Zero Dawn', platform: 'PC' },
    { id: 11, name: 'Minecraft', platform: 'PC' },
    { id: 12, name: 'Grand Theft Auto V', platform: 'PlayStation' },
    { id: 13, name: 'Dark Souls: Remastered', platform: 'PC' },
    { id: 14, name: 'Dark Souls: Remastered', platform: 'PlayStation 4' },
    { id: 15, name: 'Dark Souls: Remastered', platform: 'Xbox One' },
    { id: 16, name: 'Dark Souls II: Scholar of the First Sin', platform: 'PC' },
    { id: 17, name: 'Dark Souls II: Scholar of the First Sin', platform: 'PlayStation 4' },
    { id: 18, name: 'Dark Souls II: Scholar of the First Sin', platform: 'Xbox One' },
    { id: 19, name: 'Dark Souls III', platform: 'PC' },
    { id: 20, name: 'Dark Souls III', platform: 'PlayStation 4' },
    { id: 21, name: 'Dark Souls III', platform: 'Xbox One' },
    { id: 22, name: 'Dark Souls III: The Fire Fades Edition', platform: 'PC' },
    { id: 23, name: 'Dark Souls III: The Fire Fades Edition', platform: 'PlayStation 4' },
    { id: 24, name: 'Dark Souls III: The Fire Fades Edition', platform: 'Xbox One' }
  ];

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} products={products} />
      <div className="container mx-auto px-4">
        <Routes>
          {/* Domyślnie pokazuj HomePageUser */}
          <Route path="/" element={<HomePageUser />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/all-auctions" element={<AllAuctionsPage />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-auctions"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MyAuctions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watched-auctions"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <WatchedAuctions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MessagesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute isLoggedIn={isLoggedIn} userInfo={user}>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute isLoggedIn={isLoggedIn} userInfo={user}>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/auctions"
            element={
              <AdminRoute isLoggedIn={isLoggedIn} userInfo={user}>
                <ManageAuctions />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <AdminRoute isLoggedIn={isLoggedIn} userInfo={user}>
                <Reports />
              </AdminRoute>
            }
          />
          <Route path="/search-results" element={<SearchResultsPage />} />
        </Routes>
        <FloatingChat /> {/* Dodanie komponentu Floating Chat */}
        <button onClick={handleLogout} className="logout-button">
          Wyloguj
        </button>
      </div>
    </Router>
  );
};

export default App;
