import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";

const Privacy = () => {
  const navigate = useNavigate();
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [imageError, setImageError] = useState("");

  const handleImageUpload = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setImageError("Image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setImageError("Please upload a valid image file");
        return;
      }
      setImageError("");
      const reader = new FileReader();
      reader.onload = (e) => {
        if (side === "front") {
          setFrontImage(e.target.result);
        } else {
          setBackImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitImages = () => {
    if (!frontImage || !backImage) {
      setImageError("Please upload both front and back ID images");
      return;
    }
    setImageError("");
    // Add your API call here
    setSuccessMessage("ID verification submitted successfully");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setEmailError("");
    setSuccessMessage("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Add your password reset API call here
    setSuccessMessage("Password reset email sent successfully");
    setEmail("");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleAccountDeletion = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeletion = () => {
    // Add your account deletion API call here
    setShowDeleteConfirm(false);
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="container min-h-screen mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center mb-6 text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          <div className="space-y-6">
            {/* Identity Verification Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>
                <h2 className="text-xl font-semibold">Identity Verification</h2>
              </div>

              <div className="mb-4 text-gray-600">
                <p>You must provide a valid and clear ID images.</p>
                <p>Reviewing ID may take some time.</p>
                <p>Send ID Front and Back image.</p>
              </div>

              {imageError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {imageError}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "front")}
                    className="hidden"
                    id="frontImage"
                  />
                  <label htmlFor="frontImage" className="cursor-pointer block">
                    {frontImage ? (
                      <img
                        src={frontImage}
                        alt="Front ID"
                        className="max-h-40 mx-auto"
                      />
                    ) : (
                      <div className="text-gray-500">
                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p>Front ID Image</p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "back")}
                    className="hidden"
                    id="backImage"
                  />
                  <label htmlFor="backImage" className="cursor-pointer block">
                    {backImage ? (
                      <img
                        src={backImage}
                        alt="Back ID"
                        className="max-h-40 mx-auto"
                      />
                    ) : (
                      <div className="text-gray-500">
                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p>Back ID Image</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmitImages}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Send images
              </button>
            </section>

            {/* Change Password Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
                <h2 className="text-xl font-semibold">Change password</h2>
              </div>

              <p className="text-gray-600 mb-4">
                For changing password please write your email...
              </p>

              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email..."
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      emailError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Email
                </button>
              </form>
            </section>

            {/* Account Deletion Section */}
            <section className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <h2 className="text-xl font-semibold text-red-600">
                  Account Deletion
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  You will lose all your data and information
                </p>
                <p className="text-gray-600">Thanks for your time with us..</p>
                {!showDeleteConfirm ? (
                  <button
                    onClick={handleAccountDeletion}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete Account
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-red-600 font-medium">
                      Are you sure you want to delete your account?
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={confirmDeletion}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
                      >
                        Yes, Delete
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
