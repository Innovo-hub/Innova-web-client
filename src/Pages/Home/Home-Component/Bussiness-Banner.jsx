import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Link } from 'react-router-dom';
import user from '../../../assets/Products/user.png'
import Dashboard from '../../../assets/Products/Dashboard.png'

function BussinessBanner() {{/*Home page Business Owner^^*/}
  return (
    <div className="relative w-full my-8 px-8">
      {/* Header Section */}
      <div className="bg-white p-4 shadow-lg rounded-lg flex justify-between items-center w-full max-w-6xl mx-auto">
        {/* User Info Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {/* User Name and Details */}
            <div className="flex space-x-2 justify-center items-center">
            <div>  <img src={user} width={60}  ></img></div> 
              <div className='flex flex-col justify-start items-start'> <h1 className="text-lg font-bold">Mohamed Ali</h1>
              <p className="text-sm text-blue-600"> <CheckCircleIcon fontSize='small'/> Verified</p></div>
            </div>
            {/* Divider */}
            <div className="w-px h-8 bg-gray-400"></div>
            {/* Business Owner details */}
            <div>
              <p className="text-sm text-gray-500">Business Owner ID</p>
              <p className="text-sm text-blue-600">2233666951</p>
            </div>
          </div>
        </div>
        {/* Profile and Settings Section */}
        <div className="flex gap-6">
          <Link className="flex items-center justify-center text-gray-600"><PersonOutlineOutlinedIcon/>  Profile</Link>
          <button className="flex items-center justify-center text-gray-600"><SettingsOutlinedIcon/>Settings</button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-6xl mx-auto mt-8 grid grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-6 shadow-lg rounded-lg flex justify-between items-start">
          <div className="flex flex-col w-3/4">
            <p className="text-black text-base mb-2 relative top-[-5px]">Estimated Balance</p>
            <h2 className="text-xl font-bold" style={{ color: "#2C1DB3" }}>152,326.33 EGP</h2>
            <p className="text-black text-sm mt-2 relative top-[5px]">≈ $3,025.20</p>
          </div>
          <div className="flex flex-col gap-4 ml-8 justify-end">
            <button
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: "#0056B3" }}
            >
              Withdraw
            </button>
            <button
              className="text-white px-6 py-2 rounded-lg"
              style={{ backgroundColor: "#0056B3" }}
            >
              Deposit
            </button>
          </div>
        </div>

        {/* Dashboard Link */}
        <div className="border p-6 rounded-lg flex flex-col items-center justify-center">
          <div className="w-12 h-20 flex items-center justify-center bg-purple-100 rounded-full">
             <img src={Dashboard} ></img>
          </div>
          <a href="#" className="mt-2 text-black">
            <span style={{ color: "#126090" }}>Go</span> To Dashboard {">"}
          </a>
        </div>

        {/* Publish New Product */}
        <div className="border p-6 rounded-lg flex items-center justify-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full border-2 border-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#126090"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <button className="text-gray-700 text-lg font-bold">Publish New Product</button>
        </div>

        {/* Total Views */}
        <div className="border p-6 rounded-lg flex items-center justify-between">
          <h3 className="text-gray-700 text-lg font-bold">Total Views</h3>
          <p className="text-lg font-bold" style={{ color: "#0056B3" }}>23</p>
        </div>
      </div>

       {/* Latest Product Overview(table) */}
<div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-6xl mx-auto mt-8">
  <h3 className="text-lg font-bold mb-4">Latest Product Overview</h3>
  <table className="w-full border-collapse">
    <thead className="border-b border-gray-300">
      <tr>
        <th className="p-2 text-left text-[#126090] text-base">Product Name</th>
        <th className="p-2 text-left text-[#126090] text-base">Product ID</th>
        <th className="p-2 text-left text-[#126090] text-base">Total Earnings</th>
        <th className="p-2 text-center text-[#126090] text-base">%</th>
        <th className="p-2 text-center text-[#126090] text-base">Total Views</th>
        <th className="p-2 text-center text-[#126090] text-base">Number of Selling</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="p-2 text-base">Pop one Store</td>
        <td className="p-2 text-base">552986765</td>
        <td className="p-2 text-base">152,236.33 EGP</td>
        <td className="p-2 text-green-600 text-lg text-center">+16.65%</td>
        <td className="p-2 text-center text-base">23</td>
        <td className="p-2 text-center text-base">8</td>
      </tr>
    </tbody>
  </table>
</div>


      {/* Exploring Others Products */}
      <h3 className="text-lg font-bold mb-4 text-center mx-auto mt-8">Exploring Others Products</h3>
      </div>
     
  );
}

export default BussinessBanner;
