import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  // Manejo del envío del formulario de inicio de sesión
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validación simple
    if (!email || !password) {
      setErrors({
        email: !email ? "El correo electrónico es requerido" : "",
        password: !password ? "La contraseña es requerida" : "",
      });
      return;
    }
    // Aquí iría la lógica para autenticar al usuario
    console.log("Iniciando sesión con:", { email, password });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        backgroundColor: "#f4f4f4",
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" textAlign="center" mb={4}>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email style={{ color: "#ECB444" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          type="password"
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock style={{ color: "#ECB444" }} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#ECB444",
            color: "#2c3e50",
            "&:hover": {
              backgroundColor: "#A3D6C4",
            },
          }}
        >
          Iniciar Sesión
        </Button>
      </form>

      {/* Enlaces adicionales para restablecer la contraseña y registrarse */}
      <Box textAlign="center" mt={2}>
        {/* Enlace para la página de recuperar contraseña */}
        <Link
          to="/forgot-password"
          style={{ color: "#ECB444", textDecoration: "none" }}
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </Box>
    </Box>
  );
};

export default LoginPage;
