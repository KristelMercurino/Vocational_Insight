import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography"; // Asegúrate de agregar esta línea
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-sf.png";

const pages = ["Inicio", "Pricing", "Blog"];

function ResponsiveAppBar() {
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera el nombre del usuario desde el localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleNavigation = (page: string) => {
    if (page === "Inicio") {
      navigate("/");
    }
    if (page === "Pricing") {
      navigate("/pricing");
    }
    if (page === "Blog") {
      navigate("/blog");
    }
  };

  const handleLogout = () => {
    // Limpiar el localStorage al cerrar sesión
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setUserName(null);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 60,
              mr: 2,
              p: 0,
              backgroundColor: "#f4e4c1",
              border: "2px solid #ECB444",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
            alt="Logo"
            src={logo}
          />

          <Box sx={{ display: "flex", gap: 3 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{
                  color: "#ECB444",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#A3D6C4",
                    color: "#2c3e50",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {userName ? (
            <>
              <Typography sx={{ color: "#ECB444", mr: 2 }}>
                Hola, {userName}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  color: "#ECB444",
                  borderColor: "#ECB444",
                  "&:hover": {
                    backgroundColor: "#ECB444",
                    color: "#2c3e50",
                  },
                }}
              >
                Cerrar Sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate("/login")}
                sx={{
                  color: "#ECB444",
                  borderColor: "#ECB444",
                  "&:hover": {
                    backgroundColor: "#ECB444",
                    color: "#2c3e50",
                  },
                  mr: 2,
                }}
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/register")}
                sx={{
                  backgroundColor: "#ECB444",
                  color: "#2c3e50",
                  "&:hover": {
                    backgroundColor: "#A3D6C4",
                    color: "#2c3e50",
                  },
                }}
              >
                Registrarse
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
