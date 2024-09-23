import Carousel from "react-material-ui-carousel";
import { Paper, Box, Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import student1 from "../assets/img/student1.jpg";
import student2 from "../assets/img/student2.jpg";
import student3 from "../assets/img/student3.jpg";

// Definimos la estructura de los objetos del carrusel
type CarouselItem = {
  name: string;
  description: string;
  image: string;
};

const items: CarouselItem[] = [
  {
    name: "Estudiante 1",
    description: "Descripción del primer estudiante.",
    image: student1,
  },
  {
    name: "Estudiante 2",
    description: "Descripción del segundo estudiante.",
    image: student2,
  },
  {
    name: "Estudiante 3",
    description: "Descripción del tercer estudiante.",
    image: student3,
  },
];

function MyCarousel() {
  const navigate = useNavigate();

  // Función para redirigir a la página del formulario
  const goToForm = () => {
    navigate("/survey"); // Redirige a la página del formulario
  };

  return (
    <>
      {/* Carrusel */}
      <Box
        sx={{
          mt: 2,
          mb: 2,
          backgroundColor: "#2c3e50ff",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
          width: "100%",
        }}
      >
        <Carousel
          navButtonsAlwaysVisible
          autoPlay={true}
          animation="slide"
          duration={600}
          indicators={true}
          sx={{ mb: 4 }}
        >
          {items.map((item, i) => (
            <Item key={i} item={item} goToForm={goToForm} />
          ))}
        </Carousel>
      </Box>

      {/* Sección "¿Quiénes somos?" con Container */}
      <Container
        maxWidth="xl" // Limitamos el ancho de esta sección
        sx={{
          textAlign: "center",
          padding: 3,
          backgroundColor: "#2c3e50ff",
          color: "#fff",
          borderRadius: 3,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ¿Quiénes somos?
        </Typography>
        <Typography variant="body1">
          Somos un equipo comprometido con tu futuro. Creemos que cada
          estudiante merece encontrar una carrera que realmente le apasione y le
          permita alcanzar su máximo potencial. Con herramientas avanzadas y
          datos precisos, te ayudamos a tomar decisiones informadas para que
          construyas un camino profesional lleno de éxito y satisfacción.
          Estamos aquí para guiarte en cada paso hacia un futuro brillante.
        </Typography>
      </Container>
    </>
  );
}

// Definimos el tipo de las props para el componente Item
type ItemProps = {
  item: CarouselItem;
  goToForm: () => void;
};

function Item({ item, goToForm }: ItemProps) {
  return (
    <Paper
      elevation={6}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        backgroundColor: "#f5f5f5",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
            maxHeight: "500px",
            transition: "transform 0.5s ease",
          }}
        />
      </Box>

      {/* Botón dentro de la imagen */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={goToForm}
        >
          Haz el formulario
        </Button>
      </Box>
    </Paper>
  );
}

export default MyCarousel;
