import { Box, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import DownloadIcon from "@mui/icons-material/Download";

export default function LookerEmbedWithActions() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Retrieve the results from localStorage
  const vocationalResults = JSON.parse(localStorage.getItem("resultadoEncuesta") || "[]");

  // Extract the careers array if it exists
  const carreras = Array.isArray(vocationalResults?.recomendaciones)
    ? vocationalResults.recomendaciones.map((value) => value.carrera)
    : [];

  // Properly encode each carrera and join them with the Looker Studio separator
  const encodedCarreras = carreras
    .map((career) => encodeURIComponent(career))
    .join("%EE%80%80"); // Use Looker Studio's separator encoding

  // Construct the filter string
  const filter = `include%EE%80%800%EE%80%80IN%EE%80%80${encodedCarreras}`;

  // Create the params object
  const params = {
    df11: filter,
  };

  // Encode the entire params JSON string
  const encodedParams = encodeURIComponent(JSON.stringify(params));
  // Construct the full Looker Studio URL with encoded params
  const lookerUrl = `https://lookerstudio.google.com/embed/reporting/3c2e44a1-b155-4e8d-84fa-194675dad9a6/page/p_vzlt9m6omd?params=${encodedParams}`;
  const goToFeedback = () => {
    navigate("/feedback");
  };

  const openReportInNewTab = () => {
    window.open(lookerUrl, "_blank");
    setOpenSnackbar(true); // Show confirmation message
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "#2c3e50ff",
        }}
      >
        <Box
          component="iframe"
          src={lookerUrl}
          frameBorder="0"
          allowFullScreen
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          sx={{
            width: "100%",
            height: "70%",
            border: 0,
            flex: 1,
          }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            padding: 2,
            backgroundColor: "#2c3e50ff",
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Button variant="contained" color="primary" size="large" onClick={goToFeedback}>
            Evaluar Recomendaciones
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={openReportInNewTab}
            startIcon={<DownloadIcon />}
          >
            Descargar Gráfico en PDF
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
          Se ha abierto el gráfico en una nueva pestaña. Puedes descargar el PDF desde allí.
        </Alert>
      </Snackbar>
    </>
  );
}