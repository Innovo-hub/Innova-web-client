import React from "react";
import PropTypes from "prop-types";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

function NotificationCard({ notification, onClick, onRemove }) {
  // Function to determine priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-500";
      case "medium":
        return "border-orange-400";
      case "low":
        return "border-gray-300";
      default:
        return "border-gray-300";
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent triggering the card click event
    onRemove(notification.id);
  };

  return (
    <div
      className={`flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${getPriorityColor(notification.priority)} hover:shadow-md bg-white shadow-sm relative group`}
      onClick={() => onClick(notification)}
    >
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <div className="flex items-center gap-1">
            <p className="font-semibold text-sm text-gray-800">
              {notification.user}
            </p>
            {notification.isVerified && (
              <VerifiedIcon className="text-blue-500 text-xs" />
            )}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <AccessTimeIcon fontSize="small" className="mr-1 text-xs" />
            {notification.time}
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-1 line-clamp-2">
          {notification.message}
        </p>

        {notification.message.toLowerCase().includes("accepted") && (
          <div className="mt-1 flex justify-end">
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
              Deal Acceptance
            </span>
          </div>
        )}

        {notification.message.toLowerCase().includes("discuss") && (
          <div className="mt-1 flex justify-end">
            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full flex items-center">
              <ChatIcon fontSize="small" className="mr-1 text-xs" />
              Discussion Request
            </span>
          </div>
        )}
      </div>
      <div className="ml-2 flex items-center h-full text-gray-400 self-center">
        <ArrowForwardIosIcon fontSize="small" />
      </div>

      {/* Close (X) Button */}
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full"
        onClick={handleRemove}
      >
        <CloseIcon fontSize="small" />
      </button>
    </div>
  );
}

NotificationCard.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    user: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isVerified: PropTypes.bool,
    priority: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default NotificationCard;
