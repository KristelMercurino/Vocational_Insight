import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
} from "@mui/material";

const newsDataMain = [
  {
    title:
      "Utilizó Google Maps para organizar una excursión en Canadá y se topó con una esfera gigantesca de 15 kilómetros de ancho",
    category: "TECNOLOGÍA",
    time: "Hace 4 minutos",
    author: "Abelardo González",
    comments: "Sin comentarios",
    image: "https://via.placeholder.com/300", // Reemplaza con la URL real
  },
  {
    title:
      "Steam tiene una nueva reina y la serie RTX 40 de NVIDIA ya se convierte en la línea más dominante de Valve",
    category: "PC",
    time: "Hace 18 minutos",
    author: "Abelardo González",
    comments: "Sin comentarios",
    image: "https://via.placeholder.com/300", // Reemplaza con la URL real
  },
  {
    title:
      "Los creadores de ChatGPT consiguen 6.000 millones de euros para superar a Elon Musk y construir modelos de IA",
    category: "TECNOLOGÍA",
    time: "Hace 34 minutos",
    author: "Abelardo González",
    comments: "Sin comentarios",
    image: "https://via.placeholder.com/300", // Reemplaza con la URL real
  },
];

const newsDataSide = [
  {
    title:
      "Starfield es 'lo mejor que Bethesda ha hecho nunca'. Su director de diseño reconoce que es un RPG divisivo",
    image: "https://via.placeholder.com/200", // Reemplaza con la URL real
  },
  {
    title:
      "Han tenido que pasar casi 10 años para que por fin nos expliquen cómo el casco de Darth Vader termina en poder de Kylo Ren",
    image: "https://via.placeholder.com/200", // Reemplaza con la URL real
  },
];

const NewsSection = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Título principal de la sección de noticias */}
      <Typography
        variant="h4" // Tamaño más pequeño, como en la referencia
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#ECB444", // Color amarillo suave
          mb: 4, // Espaciado adicional debajo del título
        }}
      >
        Últimas Noticias
      </Typography>

      <Typography
        variant="h5" // Título para "Lo Último"
        align="left"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2c3e50", // Azul oscuro para los títulos secundarios
        }}
      >
        Lo Último
      </Typography>

      <Grid container spacing={4}>
        {/* Columna izquierda: Noticias principales */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            {newsDataMain.map((news, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    borderRadius: 2,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  {/* Imagen */}
                  <CardMedia
                    component="img"
                    image={news.image}
                    alt={news.title}
                    sx={{
                      width: { xs: "100%", sm: "350px" },
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: { sm: "8px 0 0 8px" },
                    }}
                  />

                  {/* Contenido */}
                  <CardContent
                    sx={{
                      flex: 1,
                      paddingLeft: { sm: 3 },
                      paddingTop: { xs: 2, sm: 0 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      backgroundColor: "#f4f4f4", // Fondo claro
                      borderRadius: { sm: "0 8px 8px 0" },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: "#e74c3c", fontWeight: "bold" }}
                    >
                      {news.category}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginTop: 1,
                        color: "#2c3e50",
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 1,
                        color: "text.secondary",
                      }}
                    >
                      <Typography variant="body2">{news.time}</Typography>
                      <Typography variant="body2"> - {news.author}</Typography>
                      <Typography variant="body2">{news.comments}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Columna derecha: Noticias secundarias */}
        <Grid item xs={12} md={4}>
          <Grid container spacing={4}>
            {newsDataSide.map((news, index) => (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 2,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={news.image}
                    alt={news.title}
                    sx={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                    }}
                  />
                  <CardContent
                    sx={{
                      backgroundColor: "#f4f4f4",
                      borderRadius: "0 0 8px 8px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        marginTop: 1,
                        color: "#2c3e50",
                      }}
                    >
                      {news.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewsSection;
