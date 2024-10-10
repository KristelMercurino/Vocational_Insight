import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom"; // Importa useLocation y useNavigate

const ResetPassword = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [mensaje, setMensaje] = useState("");

  // Capturar el token de la URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  useEffect(() => {
    // Si no hay token en la URL, mostrar un mensaje de error
    if (!token) {
      setMensaje("Token inválido o faltante. No puedes restablecer la contraseña.");
    }
  }, [token]);

  // Función para medir la fortaleza de la contraseña
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[@$!%*?&]/.test(password)) strength += 25;
    return strength;
  };

  // Validaciones en tiempo real
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const validatePasswords = () => {
    let validationErrors = {};
    if (newPassword.length < 8) {
      validationErrors.newPassword = "La contraseña debe tener al menos 8 caracteres.";
    } else if (newPassword !== confirmPassword) {
      validationErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validatePasswords()) {
      setErrors({});
      try {
        const response = await fetch(
          "https://vocational-insight-562114386469.southamerica-west1.run.app/restablecer_contrasenna_confirmar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Enviar el token en los headers
            },
            body: JSON.stringify({ new_password: newPassword }), // Enviar la nueva contraseña
          }
        );

        const responseData = await response.json();

        if (response.ok) {
          setMensaje("Tu contraseña ha sido restablecida exitosamente.");
          // Redirigir al usuario a la página de inicio de sesión después de 2 segundos
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          setMensaje(
            responseData.message || "Ocurrió un error. Intenta de nuevo más tarde."
          );
        }
      } catch (error) {
        setMensaje(error.message);
      }
    }
  };

  // Alternar la visibilidad de la contraseña
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid
      container
      style={{
        minHeight: "100vh",
        backgroundColor: "#2c3e50ff",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Sección izquierda con logo y texto */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        style={{
          backgroundColor: "#2c3e50ff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "#fff",
          padding: isSmallScreen ? "1rem" : "2rem",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
            fontSize: isSmallScreen ? "20px" : "24px",
          }}
        >
          Vocational Insight
        </Typography>
        <Typography
          variant="body1"
          align="center"
          style={{
            maxWidth: isSmallScreen ? "250px" : "300px",
            lineHeight: "1.4",
            fontSize: isSmallScreen ? "14px" : "16px",
          }}
        >
          Establece una nueva contraseña para tu cuenta.
        </Typography>
      </Grid>

      {/* Sección derecha con el formulario */}
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          padding: "2rem",
        }}
      >
        <Grid item xs={12} sm={10} md={8}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            style={{
              fontWeight: "bold",
              marginBottom: "20px",
              fontSize: isSmallScreen ? "20px" : "24px",
            }}
          >
            Restablecer contraseña
          </Typography>

          <Typography
            variant="body1"
            align="center"
            style={{ marginBottom: "1rem" }}
          >
            Ingresa tu nueva contraseña.
          </Typography>

          {mensaje && (
            <Typography
              variant="body2"
              color={mensaje.includes("exitosamente") ? "primary" : "error"}
              style={{ marginBottom: "1rem" }}
            >
              {mensaje}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            {/* Campo de nueva contraseña */}
            <TextField
              label="Nueva contraseña"
              name="newPassword"
              value={newPassword}
              onChange={handlePasswordChange} // Validación en tiempo real
              placeholder="Ingresa tu nueva contraseña"
              type={showPassword ? "text" : "password"}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "#ECB444", marginRight: "10px" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              style={{ marginBottom: "1rem" }}
            />

            {/* Barra de fortaleza de la contraseña */}
            {newPassword && (
              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                style={{ marginBottom: "1rem" }}
              />
            )}

            {/* Campo de confirmar contraseña */}
            <TextField
              label="Confirmar contraseña"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu nueva contraseña"
              type={showPassword ? "text" : "password"}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock style={{ color: "#ECB444", marginRight: "10px" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              style={{ marginBottom: "1rem" }}
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{
                backgroundColor: "#A3D6C4",
                padding: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "5px",
                transition: "background-color 0.3s ease",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
              type="submit"
            >
              CAMBIAR CONTRASEÑA
            </Button>
          </form>
        </Grid>
      </Grid>
    </
