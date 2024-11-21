import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Rating,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Opinion {
  puntuacion: number;
  comentario: string;
  Nombre: string;
}

export default function Opinions() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [visibleCount, setVisibleCount] = useState<number>(6); // Controla cuántas opiniones se muestran
  const navigate = useNavigate();

  const fetchOpinions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://vocational-insight-562114386469.southamerica-west1.run.app/opiniones_usuarios?page=1&per_page=50",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpinions(response.data.opiniones);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Error al cargar las opiniones.");
      } else {
        setError("Error al cargar las opiniones.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpinions();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // Incrementa en 6 el límite visible
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase(); // Extrae la inicial del nombre y la convierte en mayúscula
  };

  const handleSurveyRedirect = () => {
    navigate("/survey"); // Redirige a la vista de la encuesta (survey.tsx)
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "#f4f4f9",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h3"
        color="primary"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold" }}
      >
        Opiniones de Nuestros Usuarios
      </Typography>
      <Typography variant="body1" color="textSecondary" align="center" paragraph>
        Descubre lo que nuestros usuarios tienen que decir sobre Vocational
        Insight.
      </Typography>

      <Grid container spacing={4}>
        {opinions.slice(0, visibleCount).map((opinion, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
                borderRadius: "12px",
              }}
            >
              <CardContent>
                <Stack direction="row" spacing={2} alignItems="center">
                  {/* Avatar con la inicial del nombre */}
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      backgroundColor: "#A3D6C4",
                    }}
                  >
                    {getInitial(opinion.Nombre)}
                  </Avatar>
                  <Typography
                    variant="h6"
                    color="primary"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {opinion.Nombre}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginTop: 2 }}
                >
                  {opinion.comentario}
                </Typography>
                <Rating
                  name="user-rating"
                  value={opinion.puntuacion}
                  readOnly
                  precision={0.5}
                  sx={{ marginTop: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {visibleCount < opinions.length && ( // Muestra el botón solo si hay más opiniones
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleShowMore}
          >
            Ver más
          </Button>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
        <Typography variant="body2" color="text.secondary">
          ¡Gracias por confiar en nosotros! Si deseas compartir tu experiencia,
          no dudes en realizar la encuesta y dejarnos tu opinión.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSurveyRedirect}
        >
          Realizar encuesta
        </Button>
      </Box>
    </Container>
  );
}
