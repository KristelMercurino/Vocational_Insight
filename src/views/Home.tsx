import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Charts from "../components/Charts";
import Survey from "../components/Survey";
import Advertising from "../components/Advertising";

const Home = () => {
  return (
    <div>
      <Carousel />
      <Advertising />
      <Cards />
      <Survey />
      <Charts />
    </div>
  );
};

export default Home;
