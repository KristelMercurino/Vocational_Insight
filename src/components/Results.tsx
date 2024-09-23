import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Container,
  Box,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

// Datos de ejemplo para las carreras recomendadas
const careers = [
  {
    title: "Ingeniería civil en computación",
    duration: "11 Semestres",
    employability: "85%",
    salary: "$1.400.000",
    universities: "UCH, PUC",
    enrolled: "180.000",
    offers: "1200",
    precision: 90,
    image: "https://example.com/computacion.jpg",
  },
  {
    title: "Ingeniería en estadística",
    duration: "8 Semestres",
    employability: "85%",
    salary: "$1.200.000",
    universities: "USACH, UCN, UDEC",
    enrolled: "150.000",
    offers: "900",
    precision: 85,
    image: "https://example.com/estadistica.jpg",
  },
  {
    title: "Ingeniería en matemática",
    duration: "11 Semestres",
    employability: "85%",
    salary: "$1.450.000",
    universities: "UCH, PUC",
    enrolled: "180.000",
    offers: "1200",
    precision: 80,
    image: "https://example.com/matematica.jpg",
  },
];

// Componente para cada tarjeta de carrera
function CareerCard({ career }: { career: any }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        },
        borderRadius: "12px",
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={career.image}
        alt={career.title}
        sx={{ borderRadius: "12px 12px 0 0" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {career.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Duración: {career.duration}
          <br />
          Empleabilidad: {career.employability}
          <br />
          Salario Promedio: {career.salary}
          <br />
          Se imparte en: {career.universities}
          <br />
          Matriculados anuales: {career.enrolled}
          <br />
          Ofertas totales: {career.offers}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={career.precision}
            sx={{ height: 10, borderRadius: 5 }}
            color="primary"
          />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            {career.precision}% Precisión
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="secondary">
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}

// Componente principal para renderizar las tarjetas de carreras
export default function CareerRecommendations() {
  const navigate = useNavigate(); // Hook de navegación

  // Función para redirigir a la página de charts
  const handleNavigate = () => {
    navigate("/charts"); // Cambia "charts" por la ruta correcta de tu proyecto
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 4,
        mb: 4,
        backgroundColor: "#2c3e50ff",
        padding: 4,
        borderRadius: 3,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography variant="h4" color="secondary" align="center" gutterBottom>
        Carreras recomendadas
      </Typography>
      <Grid container spacing={4}>
        {careers.map((career, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CareerCard career={career} />
          </Grid>
        ))}
      </Grid>
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleNavigate}
        >
          Ver comparativa
        </Button>
      </Box>
    </Container>
  );
}
