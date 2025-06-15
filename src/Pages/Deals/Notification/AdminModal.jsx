import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import NotificationPaymentProcess from "./NotificationPaymentProcess";
import { useState } from "react";
import APILINK from "../../../../Constants";

function AdminModal({ notification, onClose }) {
  const [showPayment, setShowPayment] = useState(false);

  if (!notification) return null;

  // Extract contract URL from the message if available
  const contractUrlMatch = notification.MessageText.match(
    /Contract URL: (\/[^\s]+)/
  );
  const contractUrl = contractUrlMatch ? contractUrlMatch[1] : null;

  // Remove the Contract URL part from the message text
  const messageText = contractUrl
    ? notification.MessageText.replace(
        `Contract URL: ${contractUrl}`,
        ""
      ).trim()
    : notification.MessageText;

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

  const handleContractClick = () => {
    window.open(APILINK + contractUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-w-90vw overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gray-50 border-b flex justify-between items-center">
          <div className="font-semibold text-gray-700 text-lg">
            From: {notification.SenderName}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{notification.CreatedAt}</span>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-1.5 rounded-full transition-all"
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <div className="font-semibold text-xl mb-4">Welcome!</div>
              <div className="text-gray-700 whitespace-pre-line text-base leading-relaxed">
                {messageText.split("\n").map((line, idx) => (
                  <div key={idx} className="mb-2">
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 mt-8">
              {contractUrl && (
                <button
                  onClick={handleContractClick}
                  className="bg-[#1769a3] text-white px-8 py-2.5 rounded-md font-medium hover:bg-[#155a8a] transition-colors duration-200 shadow-md w-fit"
                >
                  View Contract
                </button>
              )}
              {isDealApproval && (
                <button
                  onClick={() => setShowPayment(true)}
                  className="bg-[#1769a3] text-white px-8 py-2.5 rounded-md font-medium hover:bg-[#155a8a] transition-colors duration-200 shadow-md w-fit"
                >
                  Complete Process
                </button>
              )}
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="font-semibold mb-3 text-gray-800">
                Contract terms:
              </div>
              <div className="text-gray-700 text-sm space-y-2">
                <p>All further details will be included in the contract.</p>
                <p>Thank you for placing your trust in us.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            Innova Hub Team
          </span>
          <span className="text-sm text-gray-500">2025</span>
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
