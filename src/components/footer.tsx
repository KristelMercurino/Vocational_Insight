import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 2,
        backgroundColor: "#2c3e50ff", // Fondo azul oscuro
        color: "#fff", // Texto en blanco
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Sección 1: Información */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Sobre nosotros
            </Typography>
            <Typography variant="body2">
              Vocational Insight es una plataforma dedicada a ayudar a los
              estudiantes a descubrir su verdadera vocación. Brindamos recursos
              y guías para que los estudiantes tomen decisiones informadas sobre
              su futuro.
            </Typography>
          </Grid>

          {/* Sección 2: Enlaces */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Enlaces útiles
            </Typography>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mb: 1 }}
            >
              Inicio
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mb: 1 }}
            >
              Carreras
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mb: 1 }}
            >
              Contacto
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mb: 1 }}
            >
              FAQ
            </Link>
          </Grid>

          {/* Sección 3: Redes sociales */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Síguenos
            </Typography>
            <Box>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "#fff" }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "#fff" }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "#fff" }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                sx={{ color: "#fff" }}
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Derechos de autor */}
        <Box
          sx={{
            textAlign: "center",
            marginTop: 4,
            borderTop: "1px solid #fff",
            paddingTop: 2,
          }}
        >
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Vocational Insight. Todos los
            derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
