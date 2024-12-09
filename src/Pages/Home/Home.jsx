import Navbar from "../../Components/Navbar";
import Categorieslist from "./Home-Component/Categories-list";
import HomeBanner from "./Home-Component/Home-Banner";
import Slide1 from '../../assets/Products/slide11.png';
import Slide2 from '../../assets/Products/slide2.png';
import Slide3 from '../../assets/Products/slide3.png';
import Art from '../../assets/Products/cat1.png';
import Jewelry from '../../assets/Products/cat2.png';
import bags from '../../assets/Products/cat3.png';
import decor from '../../assets/Products/cat4.png';
import Carpts from '../../assets/Products/cat5.png';
import CategoryCard from './Home-Component/Category-Card';
function Home() {
  const Categorycard = [
    {
      ImageSrc: Art,
      CategoryName: "Art"
    },
    {
      ImageSrc: Jewelry,
      CategoryName: "Jewelry"
    },
    {
      ImageSrc: bags,
      CategoryName: "Bags"
    },
    {
      ImageSrc: decor,
      CategoryName: "Home Decor"
    },
    {
      ImageSrc: Carpts,
      CategoryName: "Carpts"
    }
  ];
  return (
    <>
      <Navbar currentTab={"Home"} />
      <HomeBanner />
      {/* First Section  */}
        <div className="grid lg:grid-cols-4 grid-cols-1 px-8 mt-8 gap-8">
        <div className="col-span-1 w-full">
        <Categorieslist />
        </div>
        <div className="lg:col-span-2 col-span-1 space-y-6">
            <img src={Slide1} className="w-full rounded-lg h-56"/>
            <div className="relative w-full group ">
            <img src={Slide2} className="lg:flex w-full hidden rounded-lg h-56" />
  
  {/* Absolute div with blur effect */}
          <div className="px-3 absolute inset-0 w-1/2 backdrop-blur-sm shadow-md bg-white/30 left-10 top-8 bottom-8 rounded-lg lg:flex hidden flex-col items-start justify-center transition-opacity">
  
       <h2 className="font-bold text-2xl">Explore Hand crafted Products</h2>
       <h2 className="font-bold text-lg">Feel Free Shopping</h2>
            </div>
          </div>

        </div>
        <div className="col-span-1">
          <img src={Slide3} className="lg:flex w-full hidden h-[80%]"/>
        </div>
        </div>
        <div className="grid lg:grid-cols-5 grid-cols-2 gap-8 lg:px-24 px-8">
          {Categorycard.map((cat,index)=>{
            return(
              <CategoryCard ImageSrc={cat.ImageSrc} key={index} CategoryName={cat.CategoryName}/>
            )
          })}
        </div>
        
    </>
  );
}

export default Home;
