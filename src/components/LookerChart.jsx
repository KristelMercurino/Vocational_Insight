import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useRef } from "react";

export default function LookerEmbedWithActions() {
  const navigate = useNavigate();
  const chartRef = useRef(null);

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
  const lookerUrl = `https://lookerstudio.google.com/embed/reporting/ef968028-a9d5-485e-a168-c227aeea0dd7/page/p_vzlt9m6omd?params=${encodedParams}`;

  const goToFeedback = () => {
    navigate("/feedback");
  };

  const downloadPdf = async () => {
    const input = chartRef.current;

    if (input) {
      const canvas = await html2canvas(input, {
        scale: 3,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF("landscape", "mm", "a4");

      const imgWidth = 290;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("chart.pdf");
    } else {
      console.error("The chart is not available for capture.");
    }
  };

  return (
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
        ref={chartRef}
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

        <Button variant="contained" color="secondary" size="large" onClick={downloadPdf}>
          Descargar Gráfico en PDF
        </Button>
      </Box>
    </Box>
  );
}