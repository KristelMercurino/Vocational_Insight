import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import logo from "../assets/img/logo-sf.png"; // Asegúrate de que el logo esté bien vinculado
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para manejar la navegación

const pages = ["Inicio", "Pricing", "Blog"];

function ResponsiveAppBar() {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleNavigation = (page: string) => {
    if (page === "Inicio") {
      navigate("/"); // Redirige a la página de inicio
    }
    if (page === "Pricing") {
      navigate("/pricing");
    }
    if (page === "Blog") {
      navigate("/blog");
    }
  };

  // Función que maneja la navegación al login
  const handleLogin = () => {
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  // Función que maneja la navegación al registro
  const handleRegister = () => {
    navigate("/register"); // Redirige a la página de registro
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo con tamaño ajustado, fondo claro y borde */}
          <Box
            component="img"
            sx={{
              height: 60, // Aumenta el tamaño del logo
              mr: 2,
              p: 0, // Espaciado interno para darle más "aire"
              backgroundColor: "#f4e4c1", // Fondo claro, similar al amarillo pálido
              border: "2px solid #ECB444", // Borde amarillo para darle visibilidad
              borderRadius: "8px", // Bordes redondeados
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Sombra más marcada
            }}
            alt="Logo"
            src={logo}
          />

          {/* Botones del menú al lado del logo */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)} // Maneja la navegación al hacer clic
                sx={{
                  color: "#ECB444", // Cambié el color del texto a amarillo
                  fontSize: "1rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#A3D6C4", // Cambié el color de fondo al hacer hover
                    color: "#2c3e50", // Cambié el color del texto al hacer hover
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Espacio flexible para alinear los botones a la derecha */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Botón de Iniciar Sesión */}
          <Button
            variant="outlined"
            onClick={handleLogin} // Redirige al login
            sx={{
              color: "#ECB444", // Texto amarillo
              borderColor: "#ECB444", // Borde amarillo
              "&:hover": {
                backgroundColor: "#ECB444",
                color: "#2c3e50",
              },
              mr: 2, // Añade margen entre los botones
            }}
          >
            Iniciar Sesión
          </Button>

          {/* Botón de Registrarse */}
          <Button
            variant="contained"
            onClick={handleRegister} // Redirige al registro
            sx={{
              backgroundColor: "#ECB444", // Fondo amarillo
              color: "#2c3e50", // Texto azul oscuro
              "&:hover": {
                backgroundColor: "#A3D6C4",
                color: "#2c3e50",
              },
            }}
          >
            Registrarse
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
