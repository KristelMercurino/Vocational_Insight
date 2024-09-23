import { Box, Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useNavigate } from "react-router-dom"; // Para manejar la navegación

export default function BasicBars() {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const goToFeedback = () => {
    navigate("/feedback"); // Redirige a la página de feedback
  };

  return (
    <Box
      sx={{
        marginTop: 6, // Añade un margen superior para separar del Navbar
        display: "flex",
        flexDirection: "column", // Apila los elementos en una columna
        justifyContent: "center", // Centra el gráfico horizontalmente
        alignItems: "center", // Centra el gráfico verticalmente
        minHeight: "calc(100vh - 150px)", // Asegura que ocupe toda la pantalla menos el tamaño del navbar
        padding: 2, // Añade espacio interno
        backgroundColor: "#2c3e50ff", // Fondo oscuro
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff", // Fondo blanco para resaltar el gráfico
          padding: 3, // Padding interno para dar espacio alrededor del gráfico
          borderRadius: 2, // Bordes redondeados
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)", // Sombra suave
          mb: 4, // Añade margen inferior para separar del botón
        }}
      >
        <BarChart
          xAxis={[
            { scaleType: "band", data: ["group A", "group B", "group C"] },
          ]}
          series={[
            { data: [4, 3, 5] },
            { data: [1, 6, 3] },
            { data: [2, 5, 6] },
          ]}
          width={600} // Ajusta el ancho del gráfico
          height={400} // Ajusta la altura del gráfico
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={goToFeedback} // Redirige a la página de feedback
      >
        Evaluar Recomendaciones
      </Button>
    </Box>
  );
}
