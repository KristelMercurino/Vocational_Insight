import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 4,
        backgroundColor: "#1f2f46",
        color: "#f0f0f0",
        paddingTop: 6,
        paddingBottom: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Sección 1: Sobre nosotros */}
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

          {/* Sección 2: Contacto */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#4caf50" }}>
              Contáctanos
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              774 NE 84th St Miami, FL 33879
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              Llámanos GRATIS +1 (800) 990 8877
            </Typography>
            <Typography variant="body2" sx={{ mb: 1.5 }}>
              email@email.com
            </Typography>
          </Grid>

          {/* Sección 3: Suscripción a Newsletter */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: "#4caf50" }}>
              Suscríbete a nuestro boletín
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Recibe actualizaciones y consejos directamente en tu correo.
            </Typography>
            <Box component="form" noValidate sx={{ display: "flex" }}>
              <TextField
                variant="outlined"
                placeholder="Ingresa tu correo"
                fullWidth
                sx={{
                  input: { color: "#f0f0f0" },
                  borderColor: "#f0f0f0",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#4caf50",
                    },
                    "&:hover fieldset": {
                      borderColor: "#f0f0f0",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#4caf50",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#4caf50",
                  ml: 1,
                  "&:hover": { bgcolor: "#388e3c" },
                }}
              >
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Sección de Redes sociales */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 4,
            mb: 4,
          }}
        >
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

        {/* Derechos de autor */}
        <Box
          sx={{
            textAlign: "center",
            borderTop: "1px solid #4caf50",
            paddingTop: 2,
            marginTop: 2,
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
