import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import CreateMoviePage from './pages/CreateMoviePage';
import EditMoviePage from './pages/EditMoviePage';
import DashboardPage from './pages/DashboardPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/create" element={<CreateMoviePage />} />
          <Route path="/edit/:id" element={<EditMoviePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
