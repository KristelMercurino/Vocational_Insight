import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Email } from "@mui/icons-material";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handlePasswordReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el email de restablecimiento de contraseña
    console.log("Enviando email de recuperación a:", email);
    setMessage(
      "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña."
    );
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
        Recuperar Contraseña
      </Typography>
      <form onSubmit={handlePasswordReset}>
        <TextField
          label="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email style={{ color: "#ECB444" }} />
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
          Recuperar Contraseña
        </Button>
      </form>
      {message && (
        <Typography color="primary" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default ForgotPasswordPage;
