import { Container, Typography, Box } from "@mui/material";

export default function AdvertisementPage() {
  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Publicidad
      </Typography>
      {/* <Typography variant="body1" align="center" gutterBottom>
        Aquí puedes ver algunas ofertas y promociones interesantes.
      </Typography> */}
      <Box
        sx={{
          marginTop: 2,
          padding: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Publicidad 1
        </Typography>
        <Box
          sx={{
            height: 150,
            backgroundColor: "#f0f0f0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Espacio para Publicidad
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
