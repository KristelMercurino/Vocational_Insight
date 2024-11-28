import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  LinearProgress,
  Alert,
  Button,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// Define the type for each career
type CareerType = {
  carrera: string;
  descripcion: string;
  match_percentage: number;
  perfil: string;
  salario_promedio: string;
  vacantes_promedio: string;
  imagen_carrera: string; // Add the field for the image URL
};

// Component for each career card
function CareerCard({ career }: { career: CareerType }) {
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
        image={career.imagen_carrera} // Use the dynamic image from recommendations
        alt={career.carrera}
        sx={{ height: 243, width: "100%", objectFit: "cover" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {career.carrera}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {career.descripcion}
          <br />
          Perfil: {career.perfil}
          <br />
          Salario Promedio: $
          {parseInt(career.salario_promedio).toLocaleString()}
          <br />
          Vacantes Promedio: {career.vacantes_promedio}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <LinearProgress
            variant="determinate"
            value={career.match_percentage}
            sx={{ height: 10, borderRadius: 5 }}
            color="primary"
          />
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            {career.match_percentage}% Precisión
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Results() {
  const [careers, setCareers] = useState<CareerType[]>([]);
  const [error, setError] = useState<string>("");
  const [sortCriteria, setSortCriteria] = useState<string>(""); // State for sorting criteria
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get the result data from localStorage
    const resultData = JSON.parse(
      localStorage.getItem("resultadoEncuesta") || "{}"
    );

    console.log(resultData);

    // Extract recommendations
    if (resultData && resultData.recomendaciones) {
      const recomendaciones = resultData.recomendaciones.map((rec: any) => ({
        carrera: rec.carrera,
        descripcion: rec.descripcion,
        match_percentage: parseFloat(rec.match_percentage),
        perfil: rec.perfil,
        salario_promedio: rec.salario_promedio,
        vacantes_promedio: rec.vacantes_promedio,
        imagen_carrera: rec.imagen_carrera, // Include the image URL
      }));
      setCareers(recomendaciones);
    } else {
      setError("No se encontraron recomendaciones.");
    }
  }, [location.state]);

  // Handle sorting criteria change
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortCriteria(event.target.value as string);
  };

  // Filter careers based on sorting criteria
  useEffect(() => {
    if (sortCriteria === "salary") {
      setCareers((prevCareers) =>
        [...prevCareers].sort(
          (a, b) => parseInt(b.salario_promedio) - parseInt(a.salario_promedio)
        )
      );
    } else if (sortCriteria === "employability") {
      setCareers((prevCareers) =>
        [...prevCareers].sort((a, b) => b.match_percentage - a.match_percentage)
      );
    }
  }, [sortCriteria]);

  // Navigate to comparison charts
  const handleNavigateToCharts = () => {
    navigate("/charts");
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

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Sorting Filter */}
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <FormControl
          sx={{ minWidth: 200, animation: "fadeIn 0.5s ease-in-out" }}
        >
          <InputLabel sx={{ color: "#ECB444" }}>Ordenar por</InputLabel>
          <Select
            value={sortCriteria}
            onChange={handleSortChange}
            label="Ordenar por"
            sx={{
              color: "#ECB444",
              backgroundColor: "#34495e",
              "& .MuiSelect-icon": { color: "#ECB444" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ECB444" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#A3D6C4",
              },
              "& .MuiMenuItem-root": {
                color: "#FFFFFF", // Color of options in the menu
              },
            }}
          >
            <MenuItem value="">Sin orden</MenuItem>
            <MenuItem value="salary">Salario</MenuItem>
            <MenuItem value="employability">Empleabilidad</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={4}>
        {careers.map((career, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CareerCard career={career} />
          </Grid>
        ))}
      </Grid>

      {/* Button to navigate to comparison */}
      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleNavigateToCharts}
        >
          Ver Comparativa
        </Button>
      </Box>
    </Container>
  );
}
