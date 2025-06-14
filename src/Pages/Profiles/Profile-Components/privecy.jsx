import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/Navbar";
import axios from "axios";
import APILINK from "../../../../Constants";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  uploadIdCard,
  getUserProfile,
  uploadSignature,
  fetchSignature,
  connectStripeAccount,
} from "../../../redux/Slices/User-Slice/UserProfile";

const Privacy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, signature, stripeConnectionStatus } = useSelector(
    (state) => state.profile
  );
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [imageError, setImageError] = useState("");
  const [selectedStripeOption, setSelectedStripeOption] = useState("");

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(fetchSignature());
  }, [dispatch]);

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

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setImageError("Signature image size should be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        setImageError("Please upload a valid image file");
        return;
      }
      setImageError("");
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignatureImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitImages = async () => {
    if (!frontImage || !backImage) {
      setImageError("Please upload both front and back ID images");
      return;
    }
    setImageError("");

    try {
      // Convert base64 to File objects
      const frontFile = await fetch(frontImage)
        .then((r) => r.blob())
        .then((blob) => new File([blob], "front.jpg", { type: "image/jpeg" }));
      const backFile = await fetch(backImage)
        .then((r) => r.blob())
        .then((blob) => new File([blob], "back.jpg", { type: "image/jpeg" }));

      const result = await dispatch(
        uploadIdCard({ frontImage: frontFile, backImage: backFile })
      ).unwrap();

      if (result) {
        setSuccessMessage("ID verification submitted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
        // Clear the images after successful upload
        setFrontImage(null);
        setBackImage(null);
      }
    } catch (err) {
      setImageError(err.message || "Failed to upload ID card images");
    }
  };

  const handleSubmitSignature = async () => {
    if (!signatureImage) {
      setImageError("Please upload your signature image");
      return;
    }
    setImageError("");

    try {
      // Convert base64 to File object
      const signatureFile = await fetch(signatureImage)
        .then((r) => r.blob())
        .then(
          (blob) => new File([blob], "signature.jpg", { type: "image/jpeg" })
        );

      const result = await dispatch(uploadSignature(signatureFile)).unwrap();

      if (result) {
        setSuccessMessage("Signature uploaded successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
        setSignatureImage(null);
        dispatch(fetchSignature()); // Refresh signature data
      }
    } catch (err) {
      setImageError(err.message || "Failed to upload signature");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `${APILINK}/api/Profile/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Password changed successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
        setcurrentPassword("");
        setnewPassword("");
      } else {
        setEmailError("Failed to change password. Please try again.");
      }
    } catch (err) {
      setEmailError("Failed to change password. Please try again.");
      console.error("Error changing password:", err);
    }
  };

  const handleAccountDeletion = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeletion = () => {
    // Add your account deletion API call here
    setShowDeleteConfirm(false);
    navigate("/");
  };

  const handleStripeConnect = async () => {
    if (!selectedStripeOption) {
      setImageError("Please select a platform");
      return;
    }
    setImageError("");
    try {
      const response = await dispatch(
        connectStripeAccount(selectedStripeOption)
      ).unwrap();
      if (response && response.OnboardingUrl) {
        await Swal.fire({
          title: "Redirecting to Stripe",
          text: "You will be redirected to Stripe onboarding page",
          icon: "info",
          confirmButtonText: "Continue",
          confirmButtonColor: "#3085d6",
        });
        window.location.href = response.OnboardingUrl;
      } else {
        setImageError("Failed to get onboarding URL");
      }
    } catch (err) {
      setImageError(err.message || "Failed to connect Stripe account");
    }
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
            {/* Identity Verification Section - Show for BusinessOwner and Investor */}
            {(profile?.RoleName === "BusinessOwner" ||
              profile?.RoleName === "Investor") && (
              <section
                className={`bg-white p-6 rounded-lg shadow-md ${profile?.IsVerified ? "opacity-50 pointer-events-none" : ""}`}
              >
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
                  <h2 className="text-xl font-semibold">
                    Identity Verification
                  </h2>
                  {profile?.IsVerified && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                {!profile?.IsVerified && (
                  <>
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
                        <label
                          htmlFor="frontImage"
                          className="cursor-pointer block"
                        >
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
                        <label
                          htmlFor="backImage"
                          className="cursor-pointer block"
                        >
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
                  </>
                )}
              </section>
            )}

            {/* Signature Section - Show for BusinessOwner and Investor */}
            {(profile?.RoleName === "BusinessOwner" ||
              profile?.RoleName === "Investor") && (
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
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold">Signature</h2>
                  {signature?.HasSignature && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Uploaded
                    </span>
                  )}
                </div>

                <div className="mb-4 text-gray-600">
                  <p>Please upload a photo of your handwritten signature.</p>
                  <p>The signature must be written by hand (not typed).</p>
                  <p>Make sure it is clearly visible and well-lit.</p>
                  <p>This step is required to investment process.</p>
                </div>

                {signature?.HasSignature ? (
                  <div className="border-2 border-gray-300 rounded-lg p-4 text-center mb-4">
                    <img
                      src={`${APILINK}${signature.SignatureUrl}`}
                      alt="Signature"
                      className="max-h-40 mx-auto"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Uploaded on:{" "}
                      {new Date(signature.UploadDate).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="signatureImage"
                      onChange={handleSignatureUpload}
                    />
                    <label
                      htmlFor="signatureImage"
                      className="cursor-pointer block"
                    >
                      {signatureImage ? (
                        <img
                          src={signatureImage}
                          alt="Signature"
                          className="max-h-40 mx-auto"
                        />
                      ) : (
                        <>
                          <svg
                            className="w-12 h-12 mx-auto mb-4 text-gray-400"
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
                          <span className="text-gray-500">Select Image</span>
                        </>
                      )}
                    </label>
                  </div>
                )}

                {!signature?.HasSignature && (
                  <button
                    onClick={handleSubmitSignature}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Upload
                  </button>
                )}
              </section>
            )}

            {/* Stripe Account Section - Show only for BusinessOwner */}
            {profile?.RoleName === "BusinessOwner" && (
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
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <h2 className="text-xl font-semibold">Stripe Account</h2>
                  {stripeConnectionStatus === "success" && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      Connected
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-gray-600 mb-4">
                    Connect your stripe account
                  </p>

                  <div className="relative">
                    <select
                      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedStripeOption}
                      onChange={(e) => setSelectedStripeOption(e.target.value)}
                    >
                      <option value="">Select Platform</option>
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleStripeConnect}
                  disabled={stripeConnectionStatus === "loading"}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                    stripeConnectionStatus === "loading"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {stripeConnectionStatus === "loading"
                    ? "Connecting..."
                    : "Connect Stripe Account"}
                </button>
              </section>
            )}

            {/* Change Password Section - Show for all roles */}
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
                    type="text"
                    value={currentPassword}
                    onChange={(e) => setcurrentPassword(e.target.value)}
                    placeholder="Enter your current password..."
                    className={`w-full px-4 my-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      emailError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {emailError && (
                    <p className="mt-1 text-sm text-red-600">{emailError}</p>
                  )}
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                    placeholder="Enter your new password..."
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      emailError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Email
                </button>
              </form>
            </section>

            {/* Account Deletion Section - Show for all roles */}
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
