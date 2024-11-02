import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  LinearProgress,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  Tooltip,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Define la interfaz para las recomendaciones
interface Recommendation {
  perfil_encuesta: string;
  recomendacion_uno: { carrera: string; match_percentage: number; salario_promedio: number };
  recomendacion_dos: { carrera: string; match_percentage: number; salario_promedio: number };
  recomendacion_tres: { carrera: string; match_percentage: number; salario_promedio: number };
  requested_at: string;
}

// Define la interfaz para la respuesta de la API
interface ApiResponse {
  historial_recomendaciones: Recommendation[];
  pagination: {
    current_page: number;
    per_page: number;
    total_results: number;
    total_pages: number;
  };
}

export default function Record() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedRecommendation, setSelectedRecommendation] = useState<number>(0);
  const token = localStorage.getItem("authToken"); // Obtén el token desde localStorage

  // Función para cargar las recomendaciones desde la API
  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://vocational-insight-562114386469.southamerica-west1.run.app/historial_recomendaciones?page=1&per_page=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setRecommendations(data.historial_recomendaciones);
      setPage(data.pagination.current_page);
      setTotalPages(data.pagination.total_pages);
    } catch (error) {
      setError("No se pudo cargar el historial de recomendaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Obtener la última recomendación
  const lastRecommendation = recommendations[0];

  // Función para cambiar la recomendación seleccionada
  const handleRecommendationChange = (event: SelectChangeEvent<number>) => {
    setSelectedRecommendation(Number(event.target.value));
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
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color="secondary" gutterBottom>
          Historial de Recomendaciones
        </Typography>

        {/* Dropdown para recomendaciones pasadas y fecha del último envío */}
        <Box display="flex" alignItems="center">
          {lastRecommendation && (
            <Tooltip title="Fecha del último envío de encuesta" arrow>
              <Typography variant="body2" color="secondary" sx={{ mr: 2 }}>
                Último envío: {new Date(lastRecommendation.requested_at).toLocaleString()}
              </Typography>
            </Tooltip>
          )}
          <Tooltip title="Selecciona una recomendación pasada" arrow>
            <Select
              value={selectedRecommendation}
              onChange={handleRecommendationChange}
              displayEmpty
              sx={{ color: "white", backgroundColor: "#34495e", minWidth: 120 }}
            >
              <MenuItem value={0}>Recomendaciones Pasadas</MenuItem>
              {recommendations.slice(0, 5).map((rec, index) => (
                <MenuItem key={index} value={index}>
                  {new Date(rec.requested_at).toLocaleDateString()}
                </MenuItem>
              ))}
            </Select>
          </Tooltip>
          <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
            DESCARGAR PDF
          </Button>
        </Box>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress color="secondary" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {recommendations.slice(selectedRecommendation * 3, selectedRecommendation * 3 + 3).map((rec, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    borderRadius: "12px",
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {rec.perfil_encuesta}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Recomendación 1:</strong> {rec.recomendacion_uno.carrera} ({rec.recomendacion_uno.match_percentage}%)
                      <br />
                      Salario Promedio: ${rec.recomendacion_uno.salario_promedio.toLocaleString()}
                      <br />
                      <strong>Recomendación 2:</strong> {rec.recomendacion_dos.carrera} ({rec.recomendacion_dos.match_percentage}%)
                      <br />
                      Salario Promedio: ${rec.recomendacion_dos.salario_promedio.toLocaleString()}
                      <br />
                      <strong>Recomendación 3:</strong> {rec.recomendacion_tres.carrera} ({rec.recomendacion_tres.match_percentage}%)
                      <br />
                      Salario Promedio: ${rec.recomendacion_tres.salario_promedio.toLocaleString()}
                      <br />
                      <em>Fecha de Recomendación:</em> {new Date(rec.requested_at).toLocaleString()}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <LinearProgress
                        variant="determinate"
                        value={rec.recomendacion_uno.match_percentage}
                        sx={{ height: 10, borderRadius: 5 }}
                        color="primary"
                      />
                      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                        {rec.recomendacion_uno.match_percentage}% Match
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Paginación */}
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Pagination
              count={Math.ceil(recommendations.length / 3)}
              page={page}
              onChange={handlePageChange}
              color="secondary"
            />
          </Box>
        </>
      )}
    </Container>
  );
}
