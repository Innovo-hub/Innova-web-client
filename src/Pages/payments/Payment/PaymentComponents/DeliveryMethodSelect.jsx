// Components/DeliveryMethodSelect.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import APILINK from "../../../../../Constants";

const DeliveryMethodSelect = ({ selectedMethod, setSelectedMethod }) => {
  const [deliveryMethods, setDeliveryMethods] = useState([]);

  useEffect(() => {
    const fetchDeliveryMethods = async () => {
      try {
        const response = await axios.get(
          `${APILINK}/api/order/GetAllDeliveryMethod`
        );
        console.log(response.data);

        setDeliveryMethods(response.data);
        if (!selectedMethod && response.data.length > 0) {
          setSelectedMethod(response.data[0]); // Default to first
        }
      } catch (error) {
        console.error("Error fetching delivery methods:", error);
      }
    };

    fetchDeliveryMethods();
  }, []);

  return (
    <div className="bg-white rounded-lg p-4 my-4">
      <h3 className="text-[23px] font-semibold mb-2">Shipping Method</h3>
      <select
        className="w-full border border-gray-300 rounded-lg p-2"
        value={selectedMethod?.Id || ""}
        onChange={(e) => {
          const selected = deliveryMethods.find(
            (method) => method.Id === parseInt(e.target.value)
          );
          setSelectedMethod(selected);
        }}
      >
        {deliveryMethods.map((method) => (
          <option key={method.Id} value={method.Id}>
            {`${method.ShortName} - ${method.Description} ($${method.Cost})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeliveryMethodSelect;
