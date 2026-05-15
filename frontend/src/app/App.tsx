import { BrowserRouter, Routes, Route } from 'react-router';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { CartPage } from './components/CartPage';
import { CategoriesPage } from './components/CategoriesPage';
import { EventDetailPage } from './components/EventDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categorias" element={<CategoriesPage />} />
        <Route path="/evento/:id" element={<EventDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}