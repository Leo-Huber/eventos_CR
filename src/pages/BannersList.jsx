import {
  Typography,
  Container,
  Paper,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BannersList = ({ banners, onDeleteBanner }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Paper sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Gestión de Banners
          </Typography>
          <Button variant="contained" onClick={() => navigate('/banners/add')}>
            Añadir Banner
          </Button>
        </Box>

        <Grid container spacing={3}>
          {banners.map((banner) => (
            <Grid item xs={12} sm={6} md={4} key={banner.id}>
              <Card>
                <CardMedia component="img" height="140" image={banner.imageUrl} alt={banner.title} />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {banner.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Enlace: {banner.link || 'N/A'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="error" onClick={() => onDeleteBanner(banner.id)}>
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default BannersList;
