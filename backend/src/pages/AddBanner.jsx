import { useState } from 'react';
import { Typography, Container, Paper, Button, Box, TextField, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddBanner = ({ onAddBanner }) => {
  const navigate = useNavigate();
  const [newBanner, setNewBanner] = useState({ title: '', imageUrl: '', link: '' });
  const [formError, setFormError] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newBanner.title || !newBanner.imageUrl) {
      setFormError('El título y la URL de la imagen son requeridos.');
      return;
    }
    setFormError('');
    onAddBanner(newBanner);
    navigate('/banners');
  };

  return (
    <Container>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Añadir Nuevo Banner
        </Typography>
        {formError && <Alert severity="error" sx={{ mb: 2 }}>{formError}</Alert>}
        <Box component="form" onSubmit={handleAddSubmit}>
          <TextField
            fullWidth
            label="Título"
            value={newBanner.title}
            onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="URL de la Imagen"
            value={newBanner.imageUrl}
            onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Enlace (opcional)"
            value={newBanner.link}
            onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained">
            Guardar Banner
          </Button>
          <Button variant="outlined" onClick={() => navigate('/banners')} sx={{ ml: 2 }}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddBanner;
