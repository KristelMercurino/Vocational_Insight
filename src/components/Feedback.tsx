import React, { useState } from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";
import { Rating } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function FeedbackForm() {
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    // Aquí puedes manejar el envío de la valoración, como guardarla en una base de datos o enviarla a un servidor.
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#2c3e50", // Fondo oscuro para respetar el tema
        padding: 4,
        borderRadius: 3,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        mt: 5,
        color: "#ffffff", // Texto blanco para contraste con el fondo oscuro
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ color: "#ECB444" }}
      >
        ¿Qué tan útil te resultaron las recomendaciones para tu elección de
        carrera?
      </Typography>

      <Box sx={{ mt: 3, mb: 3 }}>
        <TextField
          label="Deja tu comentario"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          InputLabelProps={{
            style: { color: "#ffffff" }, // Color blanco para el label
          }}
          sx={{
            backgroundColor: "#34495e", // Fondo más claro para el input
            color: "#ffffff", // Color blanco para el texto
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ECB444", // Borde en el color principal
              },
              "&:hover fieldset": {
                borderColor: "#f1c40f", // Borde al pasar el mouse
              },
              "&.Mui-focused fieldset": {
                borderColor: "#f39c12", // Borde al estar enfocado
              },
            },
          }}
          InputProps={{
            style: { color: "#ffffff" }, // Color blanco para el texto del input
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Rating
          name="rating"
          value={rating}
          precision={0.5}
          size="large"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          sx={{
            color: "#f1c40f", // Color amarillo para las estrellas
          }}
        />
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="success"
          size="large"
          startIcon={<SendIcon />}
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#ECB444", // Botón en color amarillo
            color: "#2c3e50", // Texto del botón en azul oscuro
            "&:hover": {
              backgroundColor: "#f1c40f", // Cambia el color al hacer hover
            },
          }}
        >
          Enviar Valoración
        </Button>
      </Box>
    </Container>
  );
}
