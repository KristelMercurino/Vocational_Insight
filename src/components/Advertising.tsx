import { Container, Typography, Box, Grid } from "@mui/material";
import utfsmLogo from "../assets/img/logo-sm.jpg";
import usachLogo from "../assets/img/logo-uds.jpg";
import pucLogo from "../assets/img/logo-udv.jpeg";

export default function UniversityAdvertisement() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        marginTop: 2,
        marginBottom: 4,
        backgroundColor: "primary.main",
        borderRadius: 2,
        padding: 4,
        color: "#fff",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" color="secondary" align="center" gutterBottom>
        Universidades mejor evaluadas internacionalmente
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
              },
              width: "100%", // Ocupa todo el ancho del contenedor
              maxWidth: "250px", // Asegura un tamaño consistente para todas las tarjetas
            }}
          >
            <img
              src={utfsmLogo}
              alt="UTFSM Logo"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "220px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
              },
              width: "100%",
              maxWidth: "250px",
            }}
          >
            <img
              src={usachLogo}
              alt="USACH Logo"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "220px",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition:
                "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
              },
              width: "100%",
              maxWidth: "250px",
            }}
          >
            <img
              src={pucLogo}
              alt="PUC Logo"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "220px",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
