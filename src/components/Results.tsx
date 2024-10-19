import React, { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

// Datos de ejemplo para las carreras recomendadas
const careersData = [
  {
    title: "Ingeniería civil en computación",
    duration: "11 Semestres",
    employability: "85%",
    salary: 1400000,
    universities: "UCH, PUC",
    enrolled: "180.000",
    offers: "1200",
    precision: 90,
    city: "Santiago",
    region: "Metropolitana",
    image: "https://example.com/computacion.jpg",
  },
  {
    title: "Ingeniería en estadística",
    duration: "8 Semestres",
    employability: "85%",
    salary: 1200000,
    universities: "USACH, UCN, UDEC",
    enrolled: "150.000",
    offers: "900",
    precision: 85,
    city: "Concepción",
    region: "Biobío",
    image: "https://example.com/estadistica.jpg",
  },
  {
    title: "Ingeniería en matemática",
    duration: "11 Semestres",
    employability: "85%",
    salary: 1450000,
    universities: "UCH, PUC",
    enrolled: "180.000",
    offers: "1200",
    precision: 80,
    city: "Valparaíso",
    region: "Valparaíso",
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
          Salario Promedio: ${career.salary.toLocaleString()}
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

  const [careers, setCareers] = useState(careersData);
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // Para ordenación

  // Función para manejar el filtro de región
  const handleRegionChange = (event: any) => {
    setRegion(event.target.value);
  };

  // Función para manejar el filtro de ciudad
  const handleCityChange = (event: any) => {
    setCity(event.target.value);
  };

  // Función para manejar el criterio de ordenación
  const handleSortChange = (event: any) => {
    setSortCriteria(event.target.value);
  };

  // Filtrar y ordenar carreras según los filtros seleccionados
  useEffect(() => {
    let filteredCareers = careersData;

    if (city) {
      filteredCareers = filteredCareers.filter(
        (career) => career.city === city
      );
    }

    if (region) {
      filteredCareers = filteredCareers.filter(
        (career) => career.region === region
      );
    }

    if (sortCriteria === "salary") {
      filteredCareers = [...filteredCareers].sort(
        (a, b) => b.salary - a.salary
      );
    } else if (sortCriteria === "employability") {
      filteredCareers = [...filteredCareers].sort(
        (a, b) => parseFloat(b.employability) - parseFloat(a.employability)
      );
    }

    setCareers(filteredCareers);
  }, [city, region, sortCriteria]);

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

      {/* Filtros */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "white" }}>Filtrar por región</InputLabel>
            <Select
              value={region}
              onChange={handleRegionChange}
              sx={{
                color: "white",
                backgroundColor: "#34495e",
                borderColor: "white",
                "& .MuiSvgIcon-root": { color: "white" }, // Icono blanco
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ecf0f1", // Borde al pasar el mouse
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="Metropolitana">Metropolitana</MenuItem>
              <MenuItem value="Biobío">Biobío</MenuItem>
              <MenuItem value="Valparaíso">Valparaíso</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "white" }}>Filtrar por ciudad</InputLabel>
            <Select
              value={city}
              onChange={handleCityChange}
              sx={{
                color: "white",
                backgroundColor: "#34495e",
                borderColor: "white",
                "& .MuiSvgIcon-root": { color: "white" }, // Icono blanco
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ecf0f1", // Borde al pasar el mouse
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="Santiago">Santiago</MenuItem>
              <MenuItem value="Concepción">Concepción</MenuItem>
              <MenuItem value="Valparaíso">Valparaíso</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "white" }}>Ordenar por</InputLabel>
            <Select
              value={sortCriteria}
              onChange={handleSortChange}
              sx={{
                color: "white",
                backgroundColor: "#34495e",
                borderColor: "white",
                "& .MuiSvgIcon-root": { color: "white" }, // Icono blanco
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#ecf0f1", // Borde al pasar el mouse
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value="">Sin orden</MenuItem>
              <MenuItem value="salary">Salario</MenuItem>
              <MenuItem value="employability">Empleabilidad</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Tarjetas de carreras */}
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
