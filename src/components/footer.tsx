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
        mt: 4,
        background: "linear-gradient(135deg, #1f2f46, #3b4e68)", // Gradiente moderno
        color: "#f0f0f0", // Texto claro
        paddingTop: 3,
        paddingBottom: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="space-between">
          {/* Sección 1: Información */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#4caf50" }}>
              Sobre nosotros
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Vocational Insight es una plataforma dedicada a ayudar a los
              estudiantes a descubrir su verdadera vocación. Brindamos recursos
              y guías para que los estudiantes tomen decisiones informadas sobre
              su futuro.
            </Typography>
          </Grid>

          {/* Sección 2: Enlaces */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#4caf50" }}>
              Enlaces útiles
            </Typography>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mb: 1.5, fontSize: "1.1rem", transition: "color 0.3s" }}
              onMouseOver={(e) => (e.target.style.color = "#4caf50")}
              onMouseOut={(e) => (e.target.style.color = "#f0f0f0")}
            >
              Inicio
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mb: 1.5, fontSize: "1.1rem", transition: "color 0.3s" }}
              onMouseOver={(e) => (e.target.style.color = "#4caf50")}
              onMouseOut={(e) => (e.target.style.color = "#f0f0f0")}
            >
              Carreras
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mb: 1.5, fontSize: "1.1rem", transition: "color 0.3s" }}
              onMouseOver={(e) => (e.target.style.color = "#4caf50")}
              onMouseOut={(e) => (e.target.style.color = "#f0f0f0")}
            >
              Contacto
            </Link>
            <Link
              href="#"
              color="inherit"
              underline="hover"
              display="block"
              sx={{ mb: 1.5, fontSize: "1.1rem", transition: "color 0.3s" }}
              onMouseOver={(e) => (e.target.style.color = "#4caf50")}
              onMouseOut={(e) => (e.target.style.color = "#f0f0f0")}
            >
              FAQ
            </Link>
          </Grid>

          {/* Sección 3: Redes sociales */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#4caf50" }}>
              Síguenos
            </Typography>
            <Box>
              <IconButton
                href="https://facebook.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: "#f0f0f0",
                  transition: "color 0.3s",
                  "&:hover": { color: "#4caf50" },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: "#f0f0f0",
                  transition: "color 0.3s",
                  "&:hover": { color: "#4caf50" },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                href="https://instagram.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: "#f0f0f0",
                  transition: "color 0.3s",
                  "&:hover": { color: "#4caf50" },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                rel="noopener"
                sx={{
                  color: "#f0f0f0",
                  transition: "color 0.3s",
                  "&:hover": { color: "#4caf50" },
                }}
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
            borderTop: "1px solid #4caf50",
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
