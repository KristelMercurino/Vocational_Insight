import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";

// Definir la estructura del tipo de noticia
interface News {
  id_noticia: number;
  titulo: string;
  contenido: string;
  fecha_publicacion: string;
  link_noticia: string;
  imagen_noticia: string;
}

const NewsSection = () => {
  const [newsDataMain, setNewsDataMain] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Llamada a la API para obtener las noticias
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Recupera el token desde localStorage
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("No se encontró el token de autenticación.");
        }

        // Realiza la solicitud al endpoint de noticias, incluyendo el token en los headers
        const response = await fetch(
          "https://vocational-insight-562114386469.southamerica-west1.run.app/noticias",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Pasa el token en los headers
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener las noticias.");
        }

        const data: News[] = await response.json();
        setNewsDataMain(data); // Guardar las noticias en el estado
        setLoading(false); // Ocultar el indicador de carga
      } catch (err) {
        if (err instanceof Error) {
          console.error(err.message);
          setError(err.message);
        } else {
          console.error("Error desconocido", err);
          setError("Ocurrió un error desconocido");
        }
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      {/* Título principal de la sección de noticias */}
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#ECB444",
          mb: 4,
        }}
      >
        Últimas Noticias
      </Typography>

      <Typography
        variant="h5"
        align="left"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#2c3e50",
        }}
      >
        Lo Último
      </Typography>

      <Grid container spacing={4}>
        {/* Columna izquierda: Noticias principales */}
        {newsDataMain.slice(0, 10).map((news) => (
          <Grid item xs={12} sm={6} key={news.id_noticia}>
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
                image={news.imagen_noticia || "https://via.placeholder.com/300"}
                alt={news.titulo}
                sx={{
                  width: { xs: "100%", sm: "150px" }, // Ajustar ancho
                  height: "150px", // Altura fija para todas las imágenes
                  objectFit: "cover", // Asegura que las imágenes no se deformen
                  borderRadius: { sm: "8px 0 0 8px" },
                }}
              />

              {/* Contenido */}
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#fff",
                  paddingLeft: { sm: 3 },
                  paddingTop: { xs: 2, sm: 0 },
                  height: "150px", // Mantener altura uniforme con la imagen
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "#e74c3c", fontWeight: "bold" }}
                >
                  Educación
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    marginTop: 1,
                    color: "#2c3e50",
                  }}
                >
                  {news.titulo}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 1,
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="body2">
                    {news.fecha_publicacion}
                  </Typography>
                  <Typography variant="body2">
                    <a
                      href={news.link_noticia}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#ECB444", fontWeight: "bold" }}
                    >
                      Leer más
                    </a>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NewsSection;
