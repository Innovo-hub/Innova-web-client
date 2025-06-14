import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { predictSales } from "../../../redux/Slices/User-Slice/UserProfile";
import Loading from "../../../Components/Shared/Loading/Loading";

const Predict = () => {
  const dispatch = useDispatch();
  const { prediction } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    adBudget: "",
    unitPrice: "",
    unitsSold: "",
    productType: "",
    season: "",
    marketingChannel: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const predictionData = {
      adBudget: parseFloat(formData.adBudget),
      unitPrice: parseFloat(formData.unitPrice),
      unitsSold: parseInt(formData.unitsSold),
      productType: formData.productType,
      season: formData.season,
      marketingChannel: formData.marketingChannel,
    };
    await dispatch(predictSales(predictionData));
  };

  return (
    <div className="mt-8 w-full my-10">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 border border-blue-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-4 mb-6">
          <h2 className="text-2xl font-bold text-white">Predict With AI</h2>
        </div>

        {/* Recommendation Section */}
        <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-blue-500 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Recommendation prediction
          </h3>
          <p className="text-gray-600 text-sm">
            Get all recommendation for best products capable for selling in the
            season
          </p>
        </div>

        {/* Form Grid */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
        >
          {/* Ad Budget */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Ad-Budget
            </label>
            <input
              type="number"
              name="adBudget"
              value={formData.adBudget}
              onChange={handleInputChange}
              step="0.01"
              placeholder="8000.00"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm"
            />
          </div>

          {/* Unit Price */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Unit Price
            </label>
            <input
              type="number"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleInputChange}
              step="0.01"
              placeholder="88.00"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm"
            />
          </div>

          {/* Units Sold */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Unit Sold
            </label>
            <input
              type="number"
              name="unitsSold"
              value={formData.unitsSold}
              onChange={handleInputChange}
              placeholder="30"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm"
            />
          </div>

          {/* Product Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Type
            </label>
            <select
              name="productType"
              value={formData.productType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm"
            >
              <option value="">Select Type</option>
              <option value="HomeAndGarden">Home and Garden</option>
              <option value="HealthAndBeauty">Health and Beauty</option>
              <option value="ToysAndGames">Toys and Games</option>
              <option value="SportsAndFitness">Sports and Fitness</option>
              <option value="BooksAndEducation">Books and Education</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          {/* Season */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Season
            </label>
            <select
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm"
            >
              <option value="">Select Season</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
              <option value="Autumn">Autumn</option>
            </select>
          </div>

          {/* Marketing Channel */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Marketing Channel
            </label>
            <select
              name="marketingChannel"
              value={formData.marketingChannel}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm"
            >
              <option value="">Select Channel</option>
              <option value="Affiliate">Affiliate</option>
              <option value="Direct">Direct</option>
              <option value="Email">Email</option>
              <option value="Search Engine">Search Engine</option>
              <option value="Social Media">Social Media</option>
            </select>
          </div>
        </form>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={prediction.loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {prediction.loading ? <Loading /> : "Apply Prediction"}
          </button>
        </div>

        {/* Results Section */}
        {prediction.error && (
          <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-200">
            <p className="text-red-600">{prediction.error.message}</p>
          </div>
        )}

        {prediction.result && (
          <div className="mt-6 bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-green-500 mr-2">📊</span>
              Prediction Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Predicted Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  EGP 
                  {prediction.result.PredictedRevenue.toLocaleString(
                    undefined,
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">ROI Analysis</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(
                    (prediction.result.PredictedRevenue /
                      (formData.adBudget || 1)) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
