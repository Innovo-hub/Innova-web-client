import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("Processing...");
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const rawSessionId = searchParams.get("session_id");
        const sessionId = rawSessionId?.replace(/[{}]/g, "");

        const confirmPayment = async () => {
            if (!sessionId) {
                setStatus("Missing session ID.");
                return;
            }

            try {
                const token = localStorage.getItem("accessToken");
                const res = await axios.post(
                    "https://innova-hub.premiumasp.net/api/order/Confirm-payment",
                    { SessionId: sessionId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setStatus("🎉 Payment confirmed successfully!");
                console.log("Payment confirmation response:", res.data);
            } catch (err) {
                console.error("Error confirming payment:", err);
                setStatus("❌ Payment confirmation failed.");
            }
        };

        confirmPayment();
    }, [searchParams]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate("/");
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-xl font-semibold">
            <p>{status}</p>
            <p className="text-gray-600 text-base mt-2">
                Redirecting to home in <span className="text-blue-600">{countdown}</span> seconds...
            </p>
        </div>
    );
}

export default PaymentSuccess;
