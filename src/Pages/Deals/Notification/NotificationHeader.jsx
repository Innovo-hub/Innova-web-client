import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";

function NotificationHeader({ onClose }) {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-[#0b66a2] to-[#1976d2] text-white p-4 rounded-t-xl">
      <div className="flex items-center gap-2">
        <NotificationsNoneOutlinedIcon className="text-white" />
        <span className="font-semibold text-base">Deals Notifications</span>
      </div>
      <button
        onClick={onClose}
        className="hover:bg-white/20 p-1 rounded-full transition-all duration-200"
      >
        <CloseIcon className="text-white" />
      </button>
    </div>
  );
}

NotificationHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default NotificationHeader;
