import React from "react";
import PropTypes from "prop-types";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";

function AcceptanceModal({ notification, onClose, onAccept }) {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-w-90vw overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">From:</span>
              <span className="font-semibold">{notification.user}</span>
              {notification.isVerified && (
                <span className="flex items-center text-xs text-blue-600">
                  <VerifiedIcon fontSize="small" className="mr-1" /> Verified
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{notification.time}</span>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-1 rounded-full transition-all"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-4">
          <p className="text-gray-700">Hello There,</p>

          <p className="text-gray-700">
            [{notification.investorName}] has accepted your offer for the
            project &quot;{notification.projectName}&quot; with an investment
            amount of &quot;{notification.offerAmount}&quot; and a &quot;
            {notification.equityPercentage}&quot; equity share.
          </p>

          <p className="text-gray-700">
            The request will now be forwarded to the platform for further review
            and Admin response.
          </p>

          <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Original notification:</p>
            <p className="text-sm text-gray-700 italic">
              &quot;{notification.message}&quot;
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={onAccept}
              className="bg-[#0b66a2] text-white py-2 px-6 rounded-md font-medium hover:bg-[#0a5b91] transition-colors duration-200 shadow-md"
            >
              Accept & send
            </button>
          </div>

          <div className="text-xs text-gray-500 space-y-2 mt-4 border-t pt-4">
            <p className="font-semibold">*Note</p>
            <p>
              -A 1% platform fee applies for every 10% profit generated from the
              product revenue.
            </p>
            <p>
              -If the platform approves the request, a contract will be sent to
              both parties.
            </p>
            <p>
              -The contract will include a defined time frame and will be void
              if any discrepancies are found.
            </p>
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

AcceptanceModal.propTypes = {
  notification: PropTypes.shape({
    user: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isVerified: PropTypes.bool,
    investorName: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    offerAmount: PropTypes.string.isRequired,
    equityPercentage: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default AcceptanceModal;
