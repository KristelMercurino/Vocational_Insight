import React from "react";
import { Box, Grid, Typography, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MotivationalImage from "../assets/img/motivated_student.png"; // Asegúrate de que la ruta sea correcta

const MotivationalSection: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        backgroundColor: "#2A3A55", // Fondo respetando la paleta original
        paddingY: 6, // Ajusta este valor si es necesario reducir espacios verticales
        paddingX: { xs: 2, md: 10 },
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction={isSmallScreen ? "column" : "row"}
        >
          {/* Imagen ajustada */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center", // Centra horizontalmente
              alignItems: "flex-start", // Ajusta para iniciar desde arriba
              height: "100%", // Deja que el contenedor ajuste su altura automáticamente
              overflow: "hidden", // Recorta el contenido que sobresale
            }}
          >
            <Box
              component="img"
              src={MotivationalImage}
              alt="Motivational Image"
              sx={{
                width: "100%",
                maxWidth: "800px", // Asegura un tamaño máximo razonable
                height: "auto",
                position: "relative",
                marginBottom: "-5px",  // Permite mover la imagen
                // Baja la imagen según el límite amarillo
              }}
            />
          </Grid>

          {/* Texto motivacional */}
          <Grid item xs={12} md={6} sx={{ padding: 0 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#ECB444", // Color amarillo
                marginBottom: 2,
              }}
            >
              ¿Por qué es importante llenar este formulario?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#F4F4F4", // Color claro para contraste
                lineHeight: 1.7,
                textAlign: "justify",
              }}
            >
              El formulario te ayudará a descubrir tus verdaderos intereses y
              habilidades. Te proporciona una guía personalizada para elegir una
              carrera que realmente te apasione y en la cual puedas destacar. Al
              dedicar unos minutos a responder las preguntas, obtendrás una
              mejor comprensión de tus opciones y podrás tomar decisiones
              informadas sobre tu futuro profesional. ¡Atrévete a dar el primer
              paso hacia el éxito!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MotivationalSection;
