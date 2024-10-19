import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Card,
  Snackbar,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";

interface Region {
  id_region: number;
  nombre_region: string;
}

interface Ciudad {
  id_ciudad: number;
  nombre_ciudad: string;
}

const ModificarPerfil = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    genero: "",
    fecha_nac: "",
    region: "",
    ciudad: "",
    email: "",
    contrasena: "",
    id_ciudad: "",
    id_region: "",
    fotoPerfil: "",
  });

  const [regiones, setRegiones] = useState<Region[]>([]);
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState("");
  const [tempValue, setTempValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Estado para el Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje del Snackbar

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://vocational-insight-562114386469.southamerica-west1.run.app/usuarios/datos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          genero: data.genero || "",
          fecha_nac: data.fecha_nac || "",
          region: data.region || "",
          ciudad: data.ciudad || "",
          email: data.email || "",
          contrasena: data.contrasena || "",
          id_ciudad: data.id_ciudad || "",
          id_region: data.id_region || "",
          fotoPerfil: data.fotoPerfil || "/default-avatar.png",
        });
      })
      .catch((error) => console.error("Error al cargar los datos:", error));

    fetch(
      "https://vocational-insight-562114386469.southamerica-west1.run.app/regiones"
    )
      .then((response) => response.json())
      .then((data) => setRegiones(data))
      .catch((error) => console.error("Error al cargar las regiones:", error));
  }, []);

  const handleSaveChanges = async () => {
    setOpenConfirmDialog(true);
  };

  const confirmSaveChanges = async () => {
    try {
      const response = await fetch(
        "https://vocational-insight-562114386469.southamerica-west1.run.app/usuarios/actualizar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Error al actualizar el perfil.");
      setOpenConfirmDialog(false);
      setSnackbarMessage("Perfil actualizado correctamente.");
      setSnackbarOpen(true); // Abrir Snackbar
    } catch (error) {
      setError("Error al actualizar el perfil.");
    }
  };

  const handleDeactivateAccount = async () => {
    try {
      const response = await fetch(
        "https://vocational-insight-562114386469.southamerica-west1.run.app/usuarios/desactivar",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al desactivar la cuenta.");
      alert("Cuenta desactivada correctamente.");
      navigate("/login");
    } catch (error) {
      setError("Error al desactivar la cuenta.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(e.target.value);
  };

  const handleFieldClick = (fieldName: string, value: string) => {
    setFieldToEdit(fieldName);
    setTempValue(value);
    setOpenEditDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
          maxWidth: "800px",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", marginBottom: "1rem", color: "#ECB444" }}
        >
          Modificar Perfil
        </Typography>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Avatar
            alt="Foto de Perfil"
            src={formData.fotoPerfil || "/default-avatar.png"}
            sx={{
              width: 120,
              height: 120,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.05)" },
            }}
          />
          <IconButton
            onClick={() => console.log("Cambiar foto de perfil")}
            color="primary"
            sx={{ ml: 2 }}
          >
            <CameraAltIcon />
          </IconButton>
        </Grid>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Información de perfil
        </Typography>

        {[
          { label: "Nombre", value: formData.nombre, field: "nombre" },
          { label: "Apellido", value: formData.apellido, field: "apellido" },
          { label: "Género", value: formData.genero, field: "genero" },
          {
            label: "Fecha de Nacimiento",
            value: formData.fecha_nac,
            field: "fecha_nac",
          },
          { label: "Región", value: formData.region, field: "region" },
          { label: "Ciudad", value: formData.ciudad, field: "ciudad" },
          { label: "Correo", value: formData.email, field: "email" },
          { label: "Contraseña", value: "********", field: "contrasena" },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              marginTop: "1rem",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography sx={{ textAlign: "center" }}>{item.label}</Typography>
            <Typography sx={{ textAlign: "center" }}>{item.value}</Typography>
            <IconButton
              onClick={() => handleFieldClick(item.field, item.value)}
            >
              <ChevronRightIcon />
            </IconButton>
          </Card>
        ))}

        <Grid container justifyContent="center" spacing={2} sx={{ mt: 4 }}>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ECB444",
                color: "#2c3e50",
                fontWeight: "bold",
                marginTop: "2rem",
                padding: "12px 24px",
                width: "200px",
                "&:hover": {
                  backgroundColor: "#A3D6C4",
                },
              }}
              onClick={handleSaveChanges}
            >
              GUARDAR CAMBIOS
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="outlined"
              color="error"
              sx={{
                marginTop: "2rem",
                padding: "12px 24px",
                width: "200px",
                borderColor: "#f44336",
                color: "#f44336",
                "&:hover": {
                  backgroundColor: "#ffebee",
                  borderColor: "#d32f2f",
                },
              }}
              onClick={() => setOpenDeactivateDialog(true)}
            >
              DESACTIVAR CUENTA
            </Button>
          </Grid>
        </Grid>

        {/* Diálogo para editar */}
        <Dialog open={openEditDialog} onClose={handleDialogClose}>
          <DialogTitle>{"Editar " + fieldToEdit}</DialogTitle>
          <DialogContent>
            {fieldToEdit === "fecha_nac" ? (
              <TextField
                id="fecha_nac"
                name="fecha_nac"
                label="Fecha de Nacimiento"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={tempValue}
                onChange={handleChange}
                fullWidth
              />
            ) : (
              <TextField
                fullWidth
                label={"Nuevo valor para " + fieldToEdit}
                value={tempValue}
                onChange={handleChange}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancelar</Button>
            <Button
              onClick={() => {
                setFormData({ ...formData, [fieldToEdit]: tempValue });
                setOpenEditDialog(false);
              }}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo de confirmación para guardar cambios */}
        <Dialog
          open={openConfirmDialog}
          onClose={() => setOpenConfirmDialog(false)}
        >
          <DialogTitle>Confirmar Guardar Cambios</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas guardar los cambios?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmSaveChanges} color="primary">
              Sí, Guardar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Diálogo para desactivar cuenta */}
        <Dialog
          open={openDeactivateDialog}
          onClose={() => setOpenDeactivateDialog(false)}
        >
          <DialogTitle>Advertencia</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas desactivar tu cuenta?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeactivateDialog(false)}>No</Button>
            <Button onClick={handleDeactivateAccount} color="error">
              Sí, Desactivar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar para mensajes de éxito */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </Grid>
  );
};

export default ModificarPerfil;
