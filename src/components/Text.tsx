import React from "react";
import { Box, Grid, Typography, Container, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MotivationalImage from "../assets/img/motivated_student.png"; // Ajusta la ruta según tu proyecto

const MotivationalSection: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #2A3A55, #1F2937)", // Fondo con gradiente
        paddingY: 6, // Espaciado vertical
        paddingX: { xs: 2, md: 10 },
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={4}
          alignItems="center"
          direction={isSmallScreen ? "column-reverse" : "row"}
        >
          {/* Imagen */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={MotivationalImage}
              alt="Motivational Image"
              sx={{
                width: "100%",
                maxWidth: "700px", // Limita el tamaño máximo
              }}
            />
          </Grid>

          {/* Texto */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              textAlign: { xs: "center", md: "justify" }, // Centrado en pantallas pequeñas
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                color: "#ECB444", // Amarillo para el título
                mb: 2,
                textAlign: "center", // Título centrado en todas las pantallas
              }}
            >
              ¿Por qué es importante llenar este formulario?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#F4F4F4", // Color claro para contraste
                lineHeight: 1.8, // Espaciado entre líneas
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
