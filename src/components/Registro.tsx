import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  Typography,
  IconButton,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SelectChangeEvent } from "@mui/material";

// *** 1. Definir los tipos para el formulario y las ciudades por región ***

interface IFormData {
  nombre: string;
  apellido: string;
  genero: string;
  fechaNacimiento: any; // Cambia 'any' si usas una librería de fechas con tipos específicos.
  email: string;
  contraseña: string;
  confirmarContraseña: string;
  region: string;
  ciudad: string;
}

interface ICiudadesPorRegion {
  [key: string]: string[]; // Cada región tendrá un array de strings (ciudades)
}

const RegisterPage: React.FC = () => {
  // *** 2. Ajustar el estado y ciudades por región dentro del componente ***

  const [formData, setFormData] = useState<IFormData>({
    nombre: "",
    apellido: "",
    genero: "",
    fechaNacimiento: null,
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    region: "",
    ciudad: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const regiones: string[] = ["Región Metropolitana", "Valparaíso", "Biobío"];

  const ciudadesPorRegion: ICiudadesPorRegion = {
    "Región Metropolitana": ["Santiago", "Maipú", "Las Condes"],
    Valparaíso: ["Viña del Mar", "Valparaíso", "Quilpué"],
    Biobío: ["Concepción", "Chillán", "Los Ángeles"],
  };

  // *** 3. Manejadores de eventos ***

  // Manejar el cambio de los selects
  const handleSelectChange = (e: SelectChangeEvent, name: string) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  // Manejar el cambio de fecha
  const handleDateChange = (newValue: any) => {
    setFormData({
      ...formData,
      fechaNacimiento: newValue,
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes añadir validaciones y enviar los datos
    console.log(formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        justifyContent="center"
        style={{ minHeight: "100vh", backgroundColor: "#f4f4f4" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ marginTop: "2rem" }}
          >
            Registrarse
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Campo de nombre */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ingrese su nombre"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle style={{ color: "#ECB444" }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </FormControl>

            {/* Campo de apellido */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={(e) =>
                  setFormData({ ...formData, apellido: e.target.value })
                }
                placeholder="Ingrese su apellido"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle style={{ color: "#ECB444" }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </FormControl>

            {/* Campo de género */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <InputLabel id="genero-label">Género</InputLabel>
              <Select
                labelId="genero-label"
                name="genero"
                value={formData.genero}
                onChange={(e) => handleSelectChange(e, "genero")} // Usar SelectChangeEvent
                label="Género"
                fullWidth
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
              </Select>
            </FormControl>

            {/* Campo de fecha de nacimiento */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <DatePicker
                label="Fecha de Nacimiento"
                value={formData.fechaNacimiento}
                onChange={handleDateChange} // El manejador toma el nuevo valor de la fecha
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </FormControl>

            {/* Campo de región */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <InputLabel id="region-label">Región</InputLabel>
              <Select
                labelId="region-label"
                name="region"
                value={formData.region}
                onChange={(e) => handleSelectChange(e, "region")} // Usar SelectChangeEvent
                label="Región"
                fullWidth
              >
                {regiones.map((region, index) => (
                  <MenuItem key={index} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Campo de ciudad */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <InputLabel id="ciudad-label">Ciudad</InputLabel>
              <Select
                labelId="ciudad-label"
                name="ciudad"
                value={formData.ciudad}
                onChange={(e) => handleSelectChange(e, "ciudad")}
                label="Ciudad"
                fullWidth
                disabled={!formData.region} // Deshabilitar si no hay región seleccionada
              >
                {ciudadesPorRegion[formData.region]?.map((ciudad, index) => (
                  <MenuItem key={index} value={ciudad}>
                    {ciudad}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Campo de correo electrónico */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                label="Correo electrónico"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Ingrese su correo electrónico"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email style={{ color: "#ECB444" }} />
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </FormControl>

            {/* Campo de contraseña */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                label="Contraseña"
                name="contraseña"
                type={showPassword ? "text" : "password"}
                value={formData.contraseña}
                onChange={(e) =>
                  setFormData({ ...formData, contraseña: e.target.value })
                }
                placeholder="Ingrese su contraseña"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock style={{ color: "#ECB444" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </FormControl>

            {/* Campo de confirmar contraseña */}
            <FormControl fullWidth style={{ marginBottom: "1rem" }}>
              <TextField
                label="Confirmar Contraseña"
                name="confirmarContraseña"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmarContraseña}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmarContraseña: e.target.value,
                  })
                }
                placeholder="Confirme su contraseña"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock style={{ color: "#ECB444" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#ECB444",
                color: "#2c3e50",
                marginTop: 2,
                padding: "12px",
                fontWeight: "bold",
              }}
            >
              Registrarse
            </Button>
          </form>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default RegisterPage;
