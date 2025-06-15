import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import user from "../../../assets/Products/user.png";
import Dashboard from "../../../assets/Products/Dashboard.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../../../redux/Slices/User-Slice/UserProfile";
import { fetchInvestorDeals } from "../../../redux/Slices/Deals-Slice/DealsReducer";
import Loading from "../../../Components/Shared/Loading/Loading";

function InvestorBanner() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const {
    investorDeals,
    loading: { investor: dealsLoading },
    error: { investor: dealsError },
  } = useSelector((state) => state.deals);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(fetchInvestorDeals());
  }, [dispatch]);

  if (loading || !profile) {
    return <div className="text-center py-10">Loading profile...</div>;
  }
  if (error) {
    return <div>Error loading profile</div>;
  }

  if (dealsLoading) {
    return (
      <div className="text-center py-10">
        <Loading />
      </div>
    );
  }

  if (dealsError) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="relative w-full py-8 md:py-12 px-4 md:px-8 lg:px-16">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 transition-all duration-300 hover:shadow-xl">
        {/* User Info Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 w-full">
            {/* User Name and Details */}
            <div className="flex space-x-4 items-center">
              <div className="relative">
                <img
                  src={profile.ProfileImageUrl || user}
                  width={60}
                  height={60}
                  alt="User"
                  className="rounded-full border-2 border-blue-500 p-1"
                />
                <span className="absolute bottom-0 right-0 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg md:text-xl font-bold text-gray-800">
                  {profile.FirstName} {profile.LastName}
                </h1>
                <p
                  className={
                    profile.IsVerified
                      ? "text-sm text-blue-600 flex items-center gap-1"
                      : "hidden"
                  }
                >
                  <CheckCircleIcon
                    fontSize="small"
                    className={profile.IsVerified ? "text-blue-500" : "hidden"}
                  />
                  <span className="font-medium">Verified Account</span>
                </p>
              </div>
            </div>
            {/* Divider */}
            <div className="hidden md:block h-12 w-px bg-gray-300"></div>
            {/* Investor ID details */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700">Investor ID</p>
              <p className="text-base md:text-lg font-bold text-blue-600">
                {profile.Id}
              </p>
            </div>
          </div>
          {/* Profile and Settings Section */}
          <div className="flex gap-4 mt-4 md:mt-0 justify-start md:justify-end items-center">
            <Link
              to="/UserProfile"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700"
            >
              <PersonOutlineOutlinedIcon />
              <span className="font-medium">Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6 md:mt-8">
        {/* Card 1 - Balance */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col w-full">
            <p className="text-gray-600 text-base md:text-lg mb-2 md:mb-3">
              Estimated Balance
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-2">
              {profile.TotalBalance || 0} EGP
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              ≈ ${profile.TotalBalance / 50}
            </p>
          </div>
        </div>

        {/* Dashboard Link */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col items-center justify-center">
            <img
              src={Dashboard}
              alt="Dashboard"
              className="h-16 md:h-20 w-16 md:w-20 mb-4 transform hover:scale-110 transition-transform duration-300"
            />
            <Link
              to="/UserProfile"
              className="text-base md:text-lg font-medium hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-blue-600">Go</span> To Dashboard →
            </Link>
          </div>
        </div>
      </div>

      {/* Latest Product Overview(table) */}
      <div className="mt-8 md:mt-12">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
          Current Investment Deals
        </h3>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm font-semibold text-gray-600">
                    Product Name
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-sm font-semibold text-gray-600">
                    Total Earnings
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-center text-sm font-semibold text-gray-600">
                    %
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-center text-sm font-semibold text-gray-600">
                    Deal Value
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-center text-sm font-semibold text-gray-600">
                    Owner Name
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-center text-sm font-semibold text-gray-600">
                    Deal Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {investorDeals &&
                  investorDeals.map((deal) => (
                    <tr
                      key={deal.DealId}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm text-gray-800 font-medium">
                        {deal.ProjectName}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-sm font-medium text-gray-800">
                        {deal.TotalProfit.toLocaleString()} EGP
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs md:text-sm font-medium bg-green-100 text-green-800">
                          +{deal.OfferDeal.toFixed(2)}%
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-center text-sm text-gray-600">
                        {deal.OfferMoney.toLocaleString()} EGP
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-center text-sm text-gray-600">
                        {deal.OwnerName}
                      </td>
                      <td className="px-4 md:px-6 py-3 md:py-4 text-center text-sm text-blue-600 cursor-pointer hover:text-blue-800">
                        {deal.Status}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ends */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 text-center mt-8 md:mt-12 mb-6 md:mb-8">
        Feel Free To Discover our Platform Products and Deals Projects!
      </h3>
    </div>
  );
}

export default InvestorBanner;
