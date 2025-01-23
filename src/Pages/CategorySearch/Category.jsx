import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HomeBanner from "../../Components/Home-Banner";
import CategorySearch from "./Category-Compnent/Category-Search";

function Category() {
  const { name } = useParams();
  return (
    <>
      <Navbar />
      <HomeBanner />
      <div className="lg:flex flex-col justify-center items-center py-10 space-y-3 px-4">
        <h2 className="text-main-color text-3xl">{name}</h2>
        <h2 className="lg:text-2xl text-lg font-semibold">
          Handcrafted {name} items featuring deep blue Lapis Lazuli stones
        </h2>
      </div>
      <CategorySearch />
    </>
  );
}

export default Category;
