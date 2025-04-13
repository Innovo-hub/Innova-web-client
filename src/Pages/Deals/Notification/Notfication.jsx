import { useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export default function NotificationPanel({
  open,
  onClose,
  setNotificationCount,
}) {
  const [activeTab, setActiveTab] = useState("received");

  const notifications = {
    received: [
      {
        user: "Nader_Hani",
        message: "Have Accepted your Offer deal and waiting for respond",
        time: "2h ago",
      },
      {
        user: "MoahemdAli",
        message: "Discuss deals for new offers!",
        time: "1d ago",
      },
      {
        user: "Ahmed Amr",
        message: "Discuss deals for new offers!",
        time: "2d ago",
      },
    ],
    replied: [
      
    ],
  };
  if (setNotificationCount) {
    setNotificationCount(notifications.received.length);
  }

  if (!open) return null;

  return (
    <div className="absolute right-0 top-12 w-[350px] bg-white shadow-xl border rounded-xl z-50">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#0b66a2] text-white p-3 rounded-t-xl">
        <span className="text-sm">
          <span className="font-semibold text-base">Deals</span> Notify
        </span>
        <button onClick={onClose}>
          <CloseIcon className="text-white" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded ${activeTab === "received" ? "bg-[#0b66a2] text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("received")}
          >
            Received Notify
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${activeTab === "replied" ? "bg-[#0b66a2] text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("replied")}
          >
            Replied Notify
          </button>
        </div>
        <span className="text-sm font-semibold text-gray-600">
          {notifications[activeTab].length}
        </span>
      </div>

      {/* Notification Items */}
      <div className="p-3 space-y-2">
        {notifications[activeTab].length === 0 ? (
          <div className="text-sm text-gray-500 text-center py-4">
            No notifications.
          </div>
        ) : (
          notifications[activeTab].map((notif, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-100 p-2 rounded"
            >
              <div>
                <p className="font-semibold text-sm">{notif.user}</p>
                <p className="text-sm text-gray-600">{notif.message}</p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
              <ArrowForwardIosIcon className="text-gray-400 text-sm" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
