import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegistroUsuario = () => {
  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    apellido: "",
    contrasena: "",
    genero: "",
    fecha_nac: "",
    id_ciudad: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validar que la contraseña tenga al menos 8 caracteres, incluyendo letras y números
  const isPasswordValid = (password) => {
    const hasMinLength = password.length >= 8;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);

    return hasMinLength && hasLetters && hasNumbers;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validar que todos los campos estén completos
    if (
      !formData.email ||
      !formData.nombre ||
      !formData.apellido ||
      !formData.contrasena ||
      !formData.genero ||
      !formData.fecha_nac ||
      !formData.id_ciudad
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Validar la contraseña
    if (!isPasswordValid(formData.contrasena)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números."
      );
      return;
    }

    // Asegurarse de que la fecha esté en el formato YYYY/MM/DD
    const dateParts = formData.fecha_nac.split("-");
    const formattedDate = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;

    const updatedFormData = {
      email: formData.email,
      nombre: formData.nombre,
      apellido: formData.apellido,
      contrasena: formData.contrasena,
      genero: formData.genero,
      fecha_nac: formattedDate,
      id_ciudad: formData.id_ciudad,
    };

    try {
      const response = await fetch(
        "https://vocational-insight-562114386469.southamerica-west1.run.app/usuarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFormData),
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        throw new Error("Error en el registro. Revisa los campos.");
      }
    } catch (error) {
      setError("Ocurrió un error al registrar el usuario. Inténtalo de nuevo.");
    }
  };

  // Función para alternar entre mostrar u ocultar la contraseña
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "#2c3e50", padding: "2rem" }}
    >
      <Box
        sx={{
          backgroundColor: "#f4f4f4",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", marginBottom: "1rem", color: "#ECB444" }}
        >
          Registro de Usuario
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="nombre"
            name="nombre"
            label="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="apellido"
            name="apellido"
            label="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />

          {/* Campo de contraseña con ícono para mostrar/ocultar */}
          <TextField
            id="contrasena"
            name="contrasena"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={formData.contrasena}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="genero"
            name="genero"
            label="Género"
            select
            value={formData.genero}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          >
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </TextField>

          <TextField
            id="fecha_nac"
            name="fecha_nac"
            label="Fecha de Nacimiento"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.fecha_nac}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            id="id_ciudad"
            name="id_ciudad"
            label="ID de Ciudad"
            type="number"
            value={formData.id_ciudad}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          {error && (
            <Typography color="error" align="center" sx={{ marginTop: "1rem" }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#ECB444",
              color: "#2c3e50",
              fontWeight: "bold",
              marginTop: "1rem",
              padding: "12px",
              "&:hover": {
                backgroundColor: "#A3D6C4",
                color: "#2c3e50",
              },
            }}
            fullWidth
          >
            Registrar
          </Button>
        </form>
      </Box>
    </Grid>
  );
};

export default RegistroUsuario;
