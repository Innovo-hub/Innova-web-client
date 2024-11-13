import { useState } from "react";
import Navbar from "../../Components/Navbar";
import RegisterImage from "../../assets/AuthAssets/registerImage.png";
import Input from "../../Components/Input";
import SplitButton from "../../Components/SplitButton";

function Register() {
  const [image, setImage] = useState(null);

  // Handle file input change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <>
      <Navbar currentTab={"Register"} />
      <section className="home-section py-0 px-4">
        <div className="mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="image-section mt-6 flex-1">
            <img
              src={RegisterImage}
              alt="Landing Image"
              className="rounded-lg"
              width={500}
            />
          </div>
          <div className="text-section flex-1 relative flex flex-col items-center lg:text-left mb-8 lg:mb-0">
            {/* Position the circular upload input at the top center */}
            <form className=" relative flex flex-col  space-y-2">
              <div className="image-input flex justify-center items-center">
                <label htmlFor="fileInput" className="mt-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300">
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-center">
                        Upload Image
                      </span>
                    )}
                  </div>
                </label>
                {/* Hidden file input */}
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="name-email space-x-2">
                <Input sx={{ width: "45%" }} LabelText={"Name"} />
                <Input sx={{ width: "45%" }} LabelText={"Email"} />
              </div>
              <div className="city-district space-x-2">
                <Input sx={{ width: "45%" }} LabelText={"City"} />
                <Input sx={{ width: "45%" }} LabelText={"District"} />
              </div>
              <Input
                sx={{ width: "92%" }}
                LabelText={"Password"}
                type="password"
              />
              <SplitButton />
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
