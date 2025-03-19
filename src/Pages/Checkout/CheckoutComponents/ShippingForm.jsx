import axios from "axios";
import React, { useEffect, useState } from "react";
import APILINK from "../../../../Constants";
import Swal from "sweetalert2";


const ShippingForm = () => {
    const [isExist, setIsExist] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [address, setAddress] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        StreetAddress: "",
        Apartment: "",
        City: "",
        ZipCode: "",
        Phone: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        const fetchShippingDetails = async () => {
            try {
                const token = localStorage.getItem("accessToken");

                const existResponse = await axios.get(`${APILINK}/api/shipping-address/exists`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setIsExist(existResponse.data.HasAddress);

                if (existResponse.data.HasAddress) {
                    const addressResponse = await axios.get(`${APILINK}/api/shipping-address`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setAddress(addressResponse.data);
                }
            } catch (error) {
                setError(error.response?.data?.message || "Error fetching address");
            }
        };

        fetchShippingDetails();
    }, []);

    const handleChange = (e) => {
        setIsEditing(true);
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("accessToken");
            const headers = { Authorization: `Bearer ${token}` };

            let response;
            if (isExist) {
                // Update existing shipping address
                response = await axios.patch(`${APILINK}/api/shipping-address/update`, address, { headers });
                Swal.fire({
                    icon: "success",
                    "text": "Updated Succesfully"
                })
            } else {
                // Add new shipping address
                response = await axios.post(`${APILINK}/api/shipping-address/add`, address, { headers });
                setIsExist(true);
                Swal.fire({
                    icon: "success",
                    "text": "Added Succesfully"
                })
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to save address");
            toast.error(error.response?.data?.message || "Failed to save address");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-md p-6 flex-grow flex flex-col h-full">
            <div className="mb-8">
                <h3 className="text-[24px] font-semibold">Shipping Address</h3>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                            type="text"
                            name="FirstName"
                            value={address.FirstName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                            type="text"
                            name="LastName"
                            value={address.LastName}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full"
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="Email"
                        value={address.Email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-3"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        type="text"
                        name="Phone"
                        value={address.Phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-3"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Street Address</label>
                    <input
                        type="text"
                        name="StreetAddress"
                        value={address.StreetAddress}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-3"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Apartment, Suite, etc.</label>
                    <input
                        type="text"
                        name="Apartment"
                        value={address.Apartment}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-3"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">City</label>
                        <input
                            type="text"
                            name="City"
                            value={address.City}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Postal Code</label>
                        <input
                            type="text"
                            name="ZipCode"
                            value={address.ZipCode}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md p-3 w-full"
                        />
                    </div>
                </div>

                <div className="flex items-center mt-auto mb-6">
                    <input type="checkbox" id="billingAddress" className="w-4 h-4 text-[#126090]" />
                    <label htmlFor="billingAddress" className="ml-2 text-sm">
                        Billing address same as shipping address
                    </label>
                </div>
            </div>

            <div className="mt-auto">
                <button
                    onClick={handleSubmit}
                    className={`w-full ${isEditing ? "bg-main-color" : "bg-gray-400"} text-white py-3 rounded-md cursor-pointer ${loading ? "opacity-50" : ""}`}
                    disabled={loading || !isEditing}
                >
                    {loading ? "Saving..." : isExist ? "Update Address" : "Add Address"}
                </button>
            </div>
        </div>
    );
};

export default ShippingForm;
