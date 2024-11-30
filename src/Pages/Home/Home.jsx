import Navbar from "../../Components/Navbar";
import lunching from "../../assets/AuthAssets/lunching.png";
function Home() {
  return (
    <>
      <Navbar currentTab={"Home"} />'
      <div className="flex justify-center items-center">
        <img src={lunching} alt="" />
      </div>
    </>
  );
}

export default Home;
