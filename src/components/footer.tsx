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
        maxWidth="xl"
        sx={{
          px: { xs: 4, md: 8 },
          marginLeft: { xs: "auto", md: "auto" },
          marginRight: { xs: "auto", md: "auto" },
        }}
      >
        <Grid container spacing={4}>
          {/* Sección 1: Sobre nosotros */}
          <Grid item xs={12} sm={6} md={6}>
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

          {/* Sección 2: Suscripción a Newsletter */}
          <Grid item xs={12} sm={6} md={6}>
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
                  input: {
                    color: "#F0E68C", // Color más claro para mejorar la visibilidad
                    fontWeight: "bold", // Agregar peso para hacer el texto más visible
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#fff", // Bordes blancos
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff", // Bordes blancos en hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff", // Bordes blancos cuando está enfocado
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
