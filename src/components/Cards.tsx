import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  Avatar,
  Stack,
  Rating,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import opinion from "../assets/img/opinion.png"; // Esta imagen se utiliza como default en caso de que no haya avatar

interface Opinion {
  puntuacion: number;
  comentario: string;
  Nombre: string;
}

function MediaCard({
  name,
  opinionText,
  rating,
}: {
  name: string;
  opinionText: string;
  rating: number;
}) {
  // Extraemos la inicial del nombre
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Usamos el Avatar con la inicial del nombre */}
          <Avatar sx={{ width: 56, height: 56, backgroundColor: "#A3D6C4" }}>
            {getInitial(name)}
          </Avatar>
          <Typography gutterBottom variant="h5" color="primary" component="div">
            {name}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {opinionText}
        </Typography>
        <Rating
          name="user-rating"
          value={rating}
          readOnly
          precision={0.5}
          sx={{ marginTop: 1 }}
        />
      </CardContent>
    </Card>
  );
}

export default function ResponsiveCards() {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const fetchOpinions = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://vocational-insight-562114386469.southamerica-west1.run.app/opiniones_usuarios?page=1&per_page=20",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpinions(response.data.opiniones);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Error al cargar las opiniones.");
      } else {
        setError("Error al cargar las opiniones.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpinions();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#2c3e50ff",
        padding: 4,
        borderRadius: 1,
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography variant="h4" color="secondary" align="center" gutterBottom>
        Opiniones de Nuestros Usuarios
      </Typography>
      <Grid container spacing={4}>
        {opinions.slice(0, 4).map((opinion, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box sx={{ height: "100%" }}>
              <MediaCard
                name={opinion.Nombre}
                opinionText={opinion.comentario}
                rating={opinion.puntuacion}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/opinions")}
        >
          Ver más opiniones
        </Button>
      </Box>
    </Container>
  );
}
