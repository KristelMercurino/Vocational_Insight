import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo-sf.png";

const pages = ["Inicio"];

function ResponsiveAppBar() {
  const [userName, setUserName] = useState<string | null>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (page: string) => {
    handleCloseNavMenu();
    if (page === "Inicio") {
      navigate("/");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setUserName(null);
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2c3e50" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          {/* Logo en pantallas grandes */}
          <Box
            component="img"
            sx={{
              height: 60,
              mr: 2,
              display: { xs: "none", md: "flex" },
              p: 1,
              backgroundColor: "#f4e4c1",
              border: "2px solid #ECB444",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)", // Animación al pasar el ratón por encima
              },
            }}
            alt="Logo"
            src={logo}
          />

          {/* Menú hamburguesa en pantallas pequeñas */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigation(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo en pantallas pequeñas */}
          <Box
            component="img"
            sx={{
              height: 60,
              display: { xs: "flex", md: "none" },
              mr: 2,
              backgroundColor: "#f4e4c1",
              border: "2px solid #ECB444",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
            alt="Logo"
            src={logo}
          />

          {/* Links en pantallas grandes */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 3 }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{
                  color: "#ECB444",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#A3D6C4",
                    color: "#2c3e50",
                    transform: "scale(1.05)", // Animación en hover
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Usuario, perfil y botón de cerrar sesión */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Ajuste de columna para pantallas pequeñas
              alignItems: "center",
              gap: 1, // Ajuste del espaciado
            }}
          >
            {userName ? (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/modificarperfil")}
                  sx={{
                    color: "#ECB444",
                    borderColor: "#ECB444",
                    "&:hover": {
                      backgroundColor: "#ECB444",
                      color: "#2c3e50",
                    },
                  }}
                >
                  Mi Perfil
                </Button>
                <Typography sx={{ color: "#ECB444", mr: 2 }}>
                  Hola, {userName || "Usuario"}{" "}
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
                    mt: { xs: 1, sm: 0 },
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
                    mr: { sm: 2 },
                    mb: { xs: 1, sm: 0 },
                  }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/registro")}
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
