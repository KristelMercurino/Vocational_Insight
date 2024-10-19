import Carousel from "../components/Carousel";
import Cards from "../components/Cards";
import Advertising from "../components/Advertising";
import News from "../components/News";

const Home = () => {
  return (
    <div>
      <Carousel />
      <Advertising />
      <News />
      <Cards />
    </div>
  );
};

export default Home;
