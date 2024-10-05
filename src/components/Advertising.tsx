import React from "react";
import { Box, Container, Typography } from "@mui/material";
import utfsmLogo from "../assets/img/logo-sm.jpg";
import usachLogo from "../assets/img/logo-uds.jpg";
import pucLogo from "../assets/img/logo-udv.jpeg";

// Lista de imágenes duplicada para lograr el bucle continuo
const images = [
  utfsmLogo,
  usachLogo,
  pucLogo,
  utfsmLogo,
  usachLogo,
  pucLogo,
  utfsmLogo,
  usachLogo,
  pucLogo,
  utfsmLogo,
  usachLogo,
  pucLogo,
];

export default function UniversityAdvertisement() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: 2,
        marginBottom: 4,
        backgroundColor: "primary.main",
        borderRadius: 2,
        padding: 4,
        color: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden", // Evitar que las imágenes salgan del contenedor
        position: "relative",
        height: { xs: "120px", sm: "150px", md: "200px" }, // Altura ajustada según el tamaño de pantalla
      }}
    >
      <Typography variant="h4" color="secondary" align="center" gutterBottom>
        Universidades mejor evaluadas internacionalmente
      </Typography>

      <Box
        sx={{
          display: "flex",
          whiteSpace: "nowrap", // Mantiene las imágenes en una línea
          animation: "scroll 20s linear infinite", // Animación continua
        }}
      >
        {/* Imágenes del carrusel */}
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Imagen ${index + 1}`}
            sx={{
              width: { xs: "120px", sm: "160px", md: "200px" }, // Tamaño ajustado para cada pantalla
              marginRight: { xs: "10px", sm: "15px", md: "20px" }, // Espacio entre imágenes ajustado
              height: "auto",
            }}
          />
        ))}
      </Box>

      {/* Estilos CSS para la animación */}
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-200px * ${images.length / 2}));
            }
          }
        `}
      </style>
    </Container>
  );
}
