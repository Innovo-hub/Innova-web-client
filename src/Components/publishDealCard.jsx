
import { useState } from "react";
import profile1 from "../assets/Deals/profile1.png";
import { FaTimes, FaUpload, FaCheckCircle } from "react-icons/fa";

const DealPublishCard = ({ isOpen, onClose }) => {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [description, setDescription] = useState("");
  const [offerMoney, setOfferMoney] = useState("");
  const [offerDeal, setOfferDeal] = useState("");
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...uploadedImages];
      newImages[index] = URL.createObjectURL(file);
      setUploadedImages(newImages);
    }
  };

  const handleSubmit = () => {
    const dealData = {
      businessName,
      businessType,
      description,
      offerMoney,
      offerDeal,
      uploadedImages,
    };
    console.log("Publishing Deal:", dealData);
    // Here you can send `dealData` to an API
    setBusinessName("");
    setBusinessType("");
    setDescription("");
    setOfferMoney("");
    setOfferDeal("");
    setUploadedImages([null, null, null]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-10 z-50">
      <div className="bg-white w-[70%] p-6 rounded-lg relative">
        {/* User Info */}
        <div>
          <div className="flex items-center gap-4">
            <img
              src={profile1}
              alt="User Avatar"
              className="w-16 h-16 rounded-xl"
            />
            <div>
              <h3 className="text-xl font-medium">Mohamed Ali</h3>
              <p className="text-gray-600 text-sm">ID: 2333669591</p>
              <p className="text-[#126090] text-sm font-medium flex items-center gap-1">
                <FaCheckCircle className="text-blue-700" /> Verified
              </p>
            </div>
          </div>
          <div>
            <button
              className="absolute top-6 right-6 text-red-500"
              onClick={onClose}
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 mt-5">
          {/* First grid for publishing data inputs */}
          <div className="space-y-3">
            {/* ... (rest of the form inputs remain the same) ... */}
            <div>
              <label>Business Name:</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="border mt-1 bg-gray-100 rounded-md p-1 w-full"
              />
            </div>
            <div>
              <label>Business Type:</label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="border mt-1 bg-gray-100 rounded-md p-1 w-full"
              />
            </div>
            <div>
              <label className="block">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md mt-1 bg-gray-100 h-20"
              ></textarea>
            </div>
            <div className="flex justify-between gap-3">
              <div>
                <label>Offer Money:</label>
                <input
                  type="text"
                  value={offerMoney}
                  onChange={(e) => setOfferMoney(e.target.value)}
                  className="border mt-1 bg-gray-100 rounded-md p-1 w-full"
                />
              </div>
              <div>
                <label>Offer Percentage:</label>
                <input
                  type="text"
                  value={offerDeal}
                  onChange={(e) => setOfferDeal(e.target.value)}
                  className="border mt-1 bg-gray-100 rounded-md p-1 w-full"
                />
              </div>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white p-3 rounded-lg w-full mt-4 font-semibold"
              >
                Publish Deal
              </button>
            </div>
          </div>

          {/* Second grid for uploading images */}
          <div className="flex flex-col items-center pl-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              {[0, 1, 2].map((index) => (
                <label
                  key={index}
                  className="border border-gray-300 w-[88%] flex flex-col items-center justify-center cursor-pointer rounded-lg overflow-hidden"
                >
                  {uploadedImages[index] ? (
                    <img
                      src={uploadedImages[index]}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-500 w-20 h-44">
                      <FaUpload className="text-2xl mb-2" />
                      <span className="text-sm">Photo {index + 1}</span>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealPublishCard;
