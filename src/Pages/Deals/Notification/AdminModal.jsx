import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import NotificationPaymentProcess from "./NotificationPaymentProcess";
import { useState } from "react";
import APILINK from "../../../../Constants";

function AdminModal({ notification, onClose }) {
  const [showPayment, setShowPayment] = useState(false);

  if (!notification) return null;

  // Extract contract URL from the message if available
  const urlMatch = notification.MessageText.match(/https?:\/\/\S+/);
  const contractUrl = urlMatch ? urlMatch[0] : null;

  // Check if this is a deal approval message
  const isDealApproval =
    notification.MessageText.includes("Your deal in") &&
    notification.MessageText.includes("has been approved by admin");

  if (showPayment) {
    return (
      <NotificationPaymentProcess
        onComplete={onClose}
        dealId={notification.DealId}
        onClose={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-w-90vw overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 bg-gray-50 border-b flex justify-between items-center">
          <div className="font-semibold text-gray-700">
            From: Innova Admin Support
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">1h ago</span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-1 rounded-full transition-all"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-7 space-y-6">
          <div>
            <div className="font-semibold text-lg mb-2">Welcome!</div>
            <div className="text-gray-700 whitespace-pre-line mb-2">
              {notification.MessageText.split("\n").map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
            <div className="mb-4">
              <span className="font-semibold">Contract URL:</span>
              <div className="text-xs text-blue-700 break-all mt-1">
                {APILINK+contractUrl}
              </div>
            </div>
            {isDealApproval && (
              <div className="flex justify-center my-4">
                <button
                  onClick={() => setShowPayment(true)}
                  className="bg-[#1769a3] text-white px-6 py-2 rounded-md font-medium hover:bg-[#155a8a] transition-colors duration-200 shadow-md"
                >
                  complete process
                </button>
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold mb-1">Contract terms:</div>
            <div className="text-gray-700 text-sm mb-2">
              All further details will be included in the contract.
            </div>
            <div className="text-gray-700 text-sm">
              Thank you for placing your trust in us.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            Innova Hub Team
          </span>
          <span className="text-xs text-gray-500">2025</span>
        </div>
      </div>
    </div>
  );
}

AdminModal.propTypes = {
  notification: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AdminModal;
