import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  return (
    <Box
      sx={{
        marginTop: 3,
        display: "flex",
        justifyContent: "center", // Centra el gráfico horizontalmente
        alignItems: "center", // Centra el gráfico verticalmente si el contenedor tiene una altura definida
        width: "100%", // Hace que el contenedor ocupe el ancho completo
        height: "auto", // Ajusta la altura según el contenido
        padding: 2, // Añade un poco de espacio interno
        backgroundColor: "#f5f5f5", // Color de fondo para resaltar el gráfico
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)", // Añade sombra para dar un efecto de elevación
        borderRadius: "8px", // Bordes redondeados para mejorar la estética
      }}
    >
      <BarChart
        xAxis={[{ scaleType: "band", data: ["group A", "group B", "group C"] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={500}
        height={300}
      />
    </Box>
  );
}
