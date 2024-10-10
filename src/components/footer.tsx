import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { useState, useEffect } from "react";

// URL del mapa de Google embebido
const googleMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.6323362346596!2d-71.41103832467329!3d-33.03783311205515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689df59c56e7b05%3A0xe50b5f2a040f4cb2!2sFrankarlos!5e0!3m2!1ses!2scl!4v1696875251634!5m2!1ses!2scl";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar el correo electrónico del usuario autenticado desde localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail); // Cargar el correo en el estado si existe
    }
  }, []);

  const handleSubscription = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setMessage("Debe iniciar sesión para suscribirse.");
      return;
    }

    setLoading(true); // Activar estado de carga mientras se procesa la solicitud

    try {
      const response = await fetch(
        "https://vocational-insight-562114386469.southamerica-west1.run.app/suscripcion",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.estado_actualizado === 1) {
          setMessage("Suscripción realizada con éxito.");
          setIsSubscribed(true);
        } else {
          setMessage("Usuario ya está suscrito.");
        }
      } else {
        setMessage("Error al suscribirse.");
      }
    } catch (error) {
      setMessage("Error al procesar la solicitud.");
    }

    setLoading(false); // Desactivar estado de carga
  };

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
      <Container
        maxWidth="xl" // El contenedor sigue siendo amplio, pero no ocupa todo el ancho
        sx={{
          px: { xs: 4, md: 8 }, // Ajustar el margen lateral (padding horizontal)
          marginLeft: { xs: "auto", md: "auto" }, // Centra el container
          marginRight: { xs: "auto", md: "auto" }, // Centra el container
        }}
      >
        <Grid container spacing={4}>
          {/* Sección 1: Mapa de Google en la izquierda */}
          <Grid item xs={12} sm={6} md={4}>
            <iframe
              src={googleMapEmbedUrl}
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </Grid>

          {/* Sección 2: Sobre nosotros */}
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
                value={email} // Cargar el correo almacenado en el campo de correo
                disabled // Deshabilitar el campo para que no se pueda editar
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
                onClick={handleSubscription}
                disabled={loading || isSubscribed}
              >
                Enviar
              </Button>
            </Box>
            {message && (
              <Typography
                variant="body2"
                sx={{ color: isSubscribed ? "green" : "red", mt: 1 }}
              >
                {message}
              </Typography>
            )}
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
