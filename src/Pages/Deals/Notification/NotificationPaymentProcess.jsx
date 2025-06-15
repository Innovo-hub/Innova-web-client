import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import APILINK from "../../../../Constants";
import Swal from "sweetalert2";

function NotificationPaymentProcess({ onComplete, dealId, onClose }) {
  const [duration, setDuration] = useState(12);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const numValue = parseInt(value);
      if (numValue > 24) {
        setError("Duration cannot exceed 24 months");
        return;
      }
      setDuration(value);
      setError("");
    } else {
      setError("Duration must be a number");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!duration || isNaN(duration) || duration <= 0) {
      setError("Please enter a valid duration in months");
      return;
    }
    if (duration > 24) {
      setError("Duration cannot exceed 24 months");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.post(
        `${APILINK}/api/Payment/process-web-payment`,
        {
          DealId: dealId,
          DurationInMonths: parseInt(duration),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment Response:", response.data);

      if (response.data) {
        if (
          response.data.Message === "Payment session created successfully." &&
          response.data.PaymentUrl
        ) {
          window.location.href = response.data.PaymentUrl;
        } else if (
          response.data.Message === "Payment has not been completed."
        ) {
          await Swal.fire({
            title: "Payment Incomplete",
            text: "The payment process was not completed. Please try again.",
            icon: "warning",
            confirmButtonColor: "#1769a3",
          });
        } else {
          await Swal.fire({
            title: "Success!",
            text:
              response.data.Message || "Payment process completed successfully",
            icon: "success",
            confirmButtonColor: "#1769a3",
          });
          if (onComplete) onComplete(duration);
        }
      }
    } catch (error) {
      let errorMessage = "An error occurred while processing the payment";

      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.errors) {
          errorMessage = Object.values(error.response.data.errors)
            .flat()
            .join("\n");
        } else if (error.response.data.Message) {
          errorMessage = error.response.data.Message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      await Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#1769a3",
      });

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[500px] max-w-90vw overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gray-50 border-b flex justify-between items-center">
          <div className="font-semibold text-gray-700 text-lg">
            Payment Process
          </div>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="p-7 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-gray-700 text-base mb-4">
            In this step, you will confirm the deal and pay the business owner
            the full offer amount.
          </div>
          <div className="text-gray-700 mb-2">
            Please complete the required information below.
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Duration time"
              value={duration}
              onChange={handleChange}
              disabled={isLoading}
            />
            <div className="text-xs text-gray-500 mb-2">
              Note* the Duration should be in months (maximum 24 months), the
              default is 12
            </div>
            {error && <div className="text-red-500 text-xs mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-[#1769a3] text-white px-6 py-2 rounded-md font-medium hover:bg-[#155a8a] transition-colors duration-200 shadow-md disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Complete"}
            </button>
          </form>
        </div>
        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <span className="text-sm text-gray-700">Innova Hub App</span>
          <span className="text-xs text-gray-500">2025</span>
        </div>
      </div>
    </div>
  );
}

NotificationPaymentProcess.propTypes = {
  onComplete: PropTypes.func,
  dealId: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationPaymentProcess;
