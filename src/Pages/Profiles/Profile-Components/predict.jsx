
const Predict = () => {
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
              Get all recommendation for best products capable for selling in
              the season
            </p>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Ad Budget */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Ad-Budget
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="8000.00"
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
                step="0.01"
                placeholder="88.00"
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
                placeholder="30"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm"
              />
            </div>

            {/* Product Type Code */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Type Code
              </label>
              <input
                type="number"
                step="0.000001"
                placeholder="11305.338169"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm"
              />
            </div>

            {/* Season Code */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Season Code
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm">
                <option value="">Select Season</option>
                <option value="0">Fall </option>
                <option value="1">Spring </option>
                <option value="2">Summer </option>
                <option value="3">Winter </option>
              </select>
            </div>

            {/* Marketing Channel */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Product Marketing Channel
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white shadow-sm">
                <option value="">Select Channel</option>
                <option value="Affiliate">Affiliate</option>
                <option value="Direct">Direct</option>
                <option value="Email">Email</option>
                <option value="Search Engine">Search Engine</option>
                <option value="Social Media">Social Media</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Apply Prediction
            </button>
          </div>

          {/* Results Section (Initially Hidden) */}
          <div
            className="mt-6 bg-white rounded-lg p-4 border border-gray-200 shadow-sm hidden"
            id="prediction-results"
          >
            <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <span className="text-green-500 mr-2">📊</span>
              Prediction Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600">Predicted Sales Volume</p>
                <p className="text-xl font-bold text-green-600">--</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600">Confidence Score</p>
                <p className="text-xl font-bold text-blue-600">--%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Predict;
