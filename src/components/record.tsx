import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  Box,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import carreraVImage from "../assets/img/CarreraV.jpg";
import logo from "../assets/img/version_con_fondo.png"; // Ruta del logo

interface Recommendation {
  recomendacion_uno: {
    carrera: string;
    descripcion: string;
    perfil: string;
    match_percentage: number;
    salario_promedio: number;
    vacantes_promedio: number;
  };
  recomendacion_dos: {
    carrera: string;
    descripcion: string;
    perfil: string;
    match_percentage: number;
    salario_promedio: number;
    vacantes_promedio: number;
  };
  recomendacion_tres: {
    carrera: string;
    descripcion: string;
    perfil: string;
    match_percentage: number;
    salario_promedio: number;
    vacantes_promedio: number;
  };
  requested_at: string;
}

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
  const token = localStorage.getItem("authToken");

  const fetchRecommendations = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://vocational-insight-562114386469.southamerica-west1.run.app/historial_recomendaciones?page=1&per_page=3`,
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
    } catch (error) {
      setError("No se pudo cargar el historial de recomendaciones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Agregar logo
    doc.addImage(logo, "PNG", 10, 10, 50, 15);

    // Título del documento
    doc.setFontSize(16);
    doc.text("Historial de Recomendaciones", 105, 20, { align: "center" });

    // Fecha de generación
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Generado el: ${currentDate}`, 190, 10, { align: "right" });

    // Preparar datos para la tabla
    const tableData = recommendations.flatMap((rec) => [
      [
        {
          content: `Recomendaciones del ${new Date(rec.requested_at).toLocaleDateString()}`,
          colSpan: 7, // Cambiado para incluir la nueva columna
          styles: { halign: "center", fillColor: "#ECB444" },
        },
      ],
      ...[
        rec.recomendacion_uno,
        rec.recomendacion_dos,
        rec.recomendacion_tres,
      ].map((recomendacion, i) => [
        `Recomendación ${i + 1}`,
        recomendacion.carrera,
        recomendacion.descripcion,
        recomendacion.perfil,
        `$${recomendacion.salario_promedio.toLocaleString()}`,
        recomendacion.vacantes_promedio.toLocaleString(), // Nueva columna
        `${recomendacion.match_percentage}%`,
      ]),
    ]);

    autoTable(doc, {
      head: [
        [
          "ID",
          "Carrera",
          "Descripción",
          "Perfil",
          "Salario Promedio",
          "Vacantes Promedio", // Encabezado de la nueva columna
          "Match %",
        ],
      ],
      body: tableData as any,
      startY: 30,
      styles: { fontSize: 10, textColor: "#2c3e50ff" },
      headStyles: { fillColor: "#ECB444", textColor: "#2c3e50ff" },
      alternateRowStyles: { fillColor: "#A3D6C4" },
      theme: "grid",
    });

    // Pie de página
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(
        `Página ${i} de ${pageCount}`,
        doc.internal.pageSize.getWidth() - 20,
        doc.internal.pageSize.getHeight() - 10
      );
      doc.text(
        "© 2024 Vocational Insight - Todos los derechos reservados.",
        10,
        doc.internal.pageSize.getHeight() - 10
      );
    }

    // Descargar el archivo PDF
    doc.save("historial_recomendaciones.pdf");
  };

  return (
    <Container
      maxWidth="lg"
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
        <Button
          variant="contained"
          color="secondary"
          sx={{ ml: 2 }}
          onClick={downloadPDF}
        >
          DESCARGAR PDF
        </Button>
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2 }}
          onClick={() => navigate("/survey")}
        >
          Ir a Cuestionario
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress color="secondary" />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Box mt={4}>
          {recommendations.map((rec, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: "#34495e",
                color: "#ffffff",
                mb: 2,
                borderRadius: "8px",
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#ECB444" }} />}>
                <Typography variant="h6" sx={{ color: "#ECB444" }}>
                  {new Date(rec.requested_at).toLocaleDateString()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {[rec.recomendacion_uno, rec.recomendacion_dos, rec.recomendacion_tres].map(
                    (recomendacion, i) => (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <Card
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#2c3e50",
                            color: "white",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                            overflow: "hidden",
                            height: "100%",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={carreraVImage}
                            alt={`Recomendación ${i + 1}`}
                            sx={{
                              width: "100%",
                              height: 140,
                              objectFit: "cover",
                            }}
                          />
                          <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ color: "#ECB444", mb: 1 }}
                            >
                              Recomendación {i + 1}: {recomendacion.carrera}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#FFFFFF", mb: 1 }}
                            >
                              {recomendacion.descripcion}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#FFFFFF", mb: 1 }}
                            >
                              Perfil: {recomendacion.perfil}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#FFFFFF", mb: 2 }}
                            >
                              Salario Promedio: $
                              {recomendacion.salario_promedio.toLocaleString()}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#FFFFFF", mb: 2 }}
                            >
                              Vacantes Promedio: {recomendacion.vacantes_promedio}
                            </Typography>
                            <Box sx={{ width: "100%" }}>
                              <LinearProgress
                                variant="determinate"
                                value={recomendacion.match_percentage}
                                sx={{ height: 8, borderRadius: 5 }}
                                color="primary"
                              />
                              <Typography
                                variant="body2"
                                align="center"
                                sx={{ mt: 1, color: "#ECB444" }}
                              >
                                {recomendacion.match_percentage}% Match
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    )
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}
    </Container>
  );
}
