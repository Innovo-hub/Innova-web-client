import React from "react";
import PropTypes from "prop-types";

function NotificationTabs({ activeTab, setActiveTab, count }) {
  return (
    <div className="flex items-center justify-between p-3 border-b bg-gray-50">
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 text-sm rounded-md font-medium transition-all duration-200 ${
            activeTab === "received"
              ? "bg-[#0b66a2] text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("received")}
        >
          Received
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-md font-medium transition-all duration-200 ${
            activeTab === "replied"
              ? "bg-[#0b66a2] text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("replied")}
        >
          Replied
        </button>
      </div>
      {count > 0 && (
        <span className="bg-[#0b66a2] text-white text-xs font-bold px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}

NotificationTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default NotificationTabs;
