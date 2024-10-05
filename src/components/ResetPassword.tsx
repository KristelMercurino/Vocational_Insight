import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Lock } from "@mui/icons-material";

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ password?: string }>({});

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrors({ password: "Las contraseñas no coinciden" });
      return;
    }
    // Aquí iría la lógica para restablecer la contraseña
    console.log("Contraseña restablecida con éxito");
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
        Restablecer Contraseña
      </Typography>
      <form onSubmit={handleResetPassword}>
        <TextField
          label="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
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
        <TextField
          label="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          Restablecer Contraseña
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordPage;
