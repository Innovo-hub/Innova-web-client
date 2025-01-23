import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import CheckIcon from "@mui/icons-material/Check";

function BussinessBanner() {
  return (
    <div className="relative   w-full   my-8 px-8">
      {/*containure for all item this part*/}
      <div className="flex flex-col items-start mt-4  ">
        {/*top text of page*/}
        <h1 className="text-3xl  text-gray-700">
          Hello, <span style={{ color: "#126090" }}>Amany</span>
        </h1>

        {/* description text after name  */}
        <p className="text-gray-600 text-lg">
          Here&apos;s a quick look at your product journey!{/* "&apos;== 's*/}
        </p>
      </div>
      {/* Backgroud colored  for 4cards^^ */}
      {/* Backgroud colored  for 4cards^^ */}
      <div className="relative bg-gradient-to-r from-blue-100 via-white to-green-100 rounded-lg shadow-lg p-6 w-full   my-8">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-16 px-10 ">
          {/* Card 1 */}
          <div
            style={{ backgroundColor: "#126090" }}
            className="text-white p-4 rounded-md flex flex-col items-center shadow-md w-26 h-30"
          >
            {/*circle part */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-3 border-2 border-white">
              <div className="text-4xl text-white">
                <CurrencyPoundIcon fontSize="large" />
              </div>{" "}
              {/*icone $ */}
            </div>
            <h2 className="text-lg mb-2">Total Currency</h2>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-lg font-semibold shadow">
              $65,103
            </button>
          </div>

          {/* Card 2 */}
          <div
            style={{ backgroundColor: "#126090" }}
            className="text-white p-4 rounded-md flex flex-col items-center shadow-md w-26 h-30"
          >
            {/*circle part */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-3 border-2 border-white">
              <div className="text-4xl">
                <PeopleAltIcon fontSize="large" />
              </div>{" "}
              {/*pepele propfile icon */}
            </div>
            <h2 className="text-lg mb-2">Total Users</h2>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-lg font-semibold shadow">
              1200
            </button>
          </div>

          {/* Card 3 */}
          <div
            style={{ backgroundColor: "#126090" }}
            className="text-white p-4 rounded-md flex flex-col items-center shadow-md w-26 h-30"
          >
            {/*circle part */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-3 border-2 border-white">
              <div className="text-4xl text-white">
                <ElectricBoltIcon fontSize="large" />
              </div>{" "}
              {/*lighting icon */}
            </div>
            <h2 className="text-lg mb-2">Total Views</h2>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-lg font-semibold shadow">
              10,326
            </button>
          </div>

          {/* Card 4 */}
          <div
            style={{ backgroundColor: "#126090" }}
            className="text-white p-4 rounded-md flex flex-col items-center shadow-md w-26 h-30"
          >
            {/*circle part */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full mb-3 border-2 border-white">
              <div className="text-4xl text-white">
                <CheckIcon fontSize="large" />
              </div>{" "}
              {/*true icon */}
            </div>
            <h2 className="text-lg mb-2">Total Products</h2>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-full text-lg font-semibold shadow">
              23
            </button>
          </div>
        </div>

        {/* Button Go To Dashboard */}
        <div className="flex justify-center mt-6">
          <button
            style={{ backgroundColor: "#126090" }}
            className="text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg"
          >
            Go To Dashboard
          </button>
        </div>
      </div>

      {/* end my part   */}
      {/* End my part */}
      <div className="mt-8 flex justify-center">
        <div className="text-center w-full max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-700">
            Handmade products, crafted by skilled artisans
          </h2>
        </div>
      </div>
    </div>
  );
}

export default BussinessBanner;
