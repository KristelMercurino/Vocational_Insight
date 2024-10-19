import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import opinion from "../assets/img/opinion.png"; // Imagen circular pequeña

function MediaCard({
  name,
  opinionText,
}: {
  name: string;
  opinionText: string;
}) {
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
        borderRadius: "12px", // Bordes redondeados
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            alt={name}
            src={opinion} // La imagen pequeña circular
            sx={{ width: 56, height: 56 }} // Tamaño del Avatar
          />
          <Typography gutterBottom variant="h5" color="primary" component="div">
            {name}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {opinionText}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function ResponsiveCards() {
  const opinions = [
    {
      name: "Juan Pérez",
      opinionText: "Esta página me ayudó mucho a elegir mi carrera.",
    },
    {
      name: "Ana López",
      opinionText: "La información sobre las carreras es muy completa.",
    },
    {
      name: "Carlos Sánchez",
      opinionText:
        "Muy recomendable para estudiantes que no tienen claro qué estudiar.",
    },
    {
      name: "Marta Fernández",
      opinionText: "Excelente plataforma, muy intuitiva.",
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#2c3e50ff", // Fondo azul oscuro
        padding: 4,
        borderRadius: 1, // Bordes redondeados del container
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", // Sombra suave para el container
      }}
    >
      <Typography variant="h4" color="secondary" align="center" gutterBottom>
        Opiniones de Nuestros Usuarios
      </Typography>
      <Grid container spacing={4}>
        {opinions.map((opinion, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box sx={{ height: "100%" }}>
              <MediaCard
                name={opinion.name}
                opinionText={opinion.opinionText}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
