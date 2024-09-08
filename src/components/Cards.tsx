import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import opinion from "../assets/img/opinion.png";

function MediaCard() {
  return (
    <Card
      sx={{
        mt: 3,
        maxWidth: 345,
        transition: "transform 0.3s, box-shadow 0.3s", // Transiciones suaves
        "&:hover": {
          transform: "scale(1.05)", // Escala la tarjeta al pasar el mouse
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Agrega sombra al pasar el mouse
        },
      }}
    >
      <CardMedia sx={{ height: 140 }} image={opinion} title="opinion" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default function ResponsiveCards() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MediaCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MediaCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MediaCard />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <MediaCard />
      </Grid>
    </Grid>
  );
}
