import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, CircularProgress, Alert } from '@mui/material';
import Topbar from './components/BarraSuperior';
import Sidebar from './components/BarraLateral';
import Dashboard from './pages/Dashboard';
import Users from './pages/Usuarios';
import Products from './pages/Productos';
import BannersList from './pages/BannersList';
import AddBanner from './pages/AddBanner';
import http from './lib/http';

export default function App() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchBanners() {
    try {
      const { data } = await http.get('/api/banners');
      setBanners(data);
      setLoading(false);
    } catch (err) {
      console.error('Error al obtener los banners:', err);
      setError('Error al cargar los banners.');
      setLoading(false);
    }
  }

  useEffect(() => { fetchBanners(); }, []);

  async function handleAddBanner(newBanner) {
    try {
      await http.post('/api/banners', newBanner);
      fetchBanners();
    } catch (err) {
      console.error('Error al añadir banner:', err);
      setError('Error al añadir el banner.');
    }
  }

  async function handleDeleteBanner(id) {
    try {
      await http.delete(`/api/banners/${id}`);
      fetchBanners();
    } catch (err) {
      console.error('Error al eliminar banner:', err);
      setError('Error al eliminar el banner.');
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
        {error && <Alert severity="error">{error}</Alert>}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/banners" element={<BannersList banners={banners} onDeleteBanner={handleDeleteBanner} />} />
          <Route path="/banners/add" element={<AddBanner onAddBanner={handleAddBanner} />} />
        </Routes>
      </Box>
    </Box>
  );
}
