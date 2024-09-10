import Carousel from "react-material-ui-carousel";
import { Paper, Box, Typography } from "@mui/material";
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
    name: "Item 1",
    description: "This is the description of the first item.",
    image: student1,
  },
  {
    name: "Item 2",
    description: "This is the description of the second item.",
    image: student2,
  },
  {
    name: "Item 3",
    description: "This is the description of the second item.",
    image: student3,
  },
];

function MyCarousel() {
  return (
    <Carousel
      navButtonsAlwaysVisible
      autoPlay={true}
      animation="slide"
      duration={500}
      indicators={true}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

// Definimos el tipo de las props para el componente Item
type ItemProps = {
  item: CarouselItem;
};

function Item({ item }: ItemProps) {
  return (
    <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2 }}>
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          maxHeight: "500px", // Limita la altura máxima para pantallas grandes
        }}
      />
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.description}
        </Typography>
      </Box>
    </Paper>
  );
}

export default MyCarousel;
