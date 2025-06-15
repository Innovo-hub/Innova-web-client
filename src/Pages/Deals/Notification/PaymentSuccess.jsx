import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import APILINK from "../../../../Constants";
import Swal from "sweetalert2";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [status, setStatus] = useState("Processing payment...");
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    const isCancel = location.pathname.includes("payment-cancel");

    const handlePayment = async () => {
      if (!sessionId) {
        setStatus("Missing session ID.");
        return;
      }

      try {
        const token = localStorage.getItem("accessToken");
        const endpoint = isCancel
          ? `${APILINK}/api/Payment/payment-cancel`
          : `${APILINK}/api/Payment/payment-success`;

        const response = await axios.post(
          endpoint,
          { SessionId: sessionId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data) {
          if (isCancel) {
            setStatus("❌ Payment cancelled");
            await Swal.fire({
              title: "Cancelled!",
              text: "Your payment has been cancelled.",
              icon: "info",
              confirmButtonColor: "#1769a3",
            });
          } else {
            setStatus("🎉 Payment confirmed successfully!");
            await Swal.fire({
              title: "Success!",
              text: "Your payment has been processed successfully.",
              icon: "success",
              confirmButtonColor: "#1769a3",
            });
          }
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        setStatus("❌ Payment processing failed.");
        await Swal.fire({
          title: "Error!",
          text: error.response?.data?.Message || "Failed to process payment.",
          icon: "error",
          confirmButtonColor: "#1769a3",
        });
      }
    };

    handlePayment();
  }, [searchParams, location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/deals");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {status}
            </h2>
            <p className="text-gray-600">
              Redirecting to deals page in{" "}
              <span className="text-[#1769a3] font-semibold">{countdown}</span>{" "}
              seconds...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
