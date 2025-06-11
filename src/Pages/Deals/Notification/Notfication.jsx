import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NotificationHeader from "./NotificationHeader";
import NotificationTabs from "./NotificationTabs";
import NotificationList from "./NotificationList";
import AcceptanceModal from "./AcceptanceModal";
import DiscussionModal from "./DiscussionModal";
import axios from "axios";
import APILINK from "../../../../Constants";

export default function NotificationPanel({
  open,
  onClose,
  setNotificationCount,
}) {
  const [activeTab, setActiveTab] = useState("received");
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showDiscussModal, setShowDiscussModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  useEffect(()=>{
    const fetchNotifications = async () => {
        try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${APILINK}/api/Notification/history?isRead=false`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setNotifications(response.data.Data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
    }
    fetchNotifications();
  }, [setNotificationCount]);

  if (setNotificationCount) {
    setNotificationCount(notifications.length);
  }

  const handleNotificationClick = (notification) => {
  setSelectedNotification(notification);
  const MessageType = notification.MessageType
  if (MessageType === "OfferAccepted") {
    setShowAcceptModal(true);
    setShowDiscussModal(false);
  } else if (MessageType === "OfferDiscussion") {
    setShowDiscussModal(true);
    setShowAcceptModal(false);
  }
};


  const handleCloseModal = () => {
    setShowAcceptModal(false);
    setShowDiscussModal(false);
  };

  const handleAcceptAndSend = () => {
    // Handle the accept action
    setShowAcceptModal(false);
    // Additional logic can be added here
  };

  const handleReply = () => {
    // Handle the reply action
    if (replyMessage.trim() !== "") {
      console.log("Sending reply:", replyMessage);
      setReplyMessage("");
      setShowDiscussModal(false);
      // Additional logic for handling reply can be added here
    }
  };

  const handleRemoveNotification = async (notificationId) => {
    try{
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(`${APILINK}/api/Notification/mark-multiple-read`,{
        NotificationIds: [notificationId],
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      if (response.status === 200) {
        setNotifications((prev) =>
          prev.filter((notification) => notification.Id !== notificationId)
        );
        if (setNotificationCount) {
          setNotificationCount(notifications.length - 1);
        }
      }
    }catch (error) {
      console.error("Error removing notification:", error);
      // Optionally, you can show an error message to the user
    }

  };

  if (!open) return null;

  return (
    <>
      <div className="absolute right-0 top-12 w-[450px] bg-white shadow-2xl border rounded-xl z-50 overflow-hidden">
        <NotificationHeader onClose={onClose} />

        <NotificationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          count={notifications.length}
        />

        <NotificationList
          notifications={notifications}
          onNotificationClick={handleNotificationClick}
          onRemoveNotification={handleRemoveNotification}
        />

        {notifications.length > 0 && (
          <div className="p-3 border-t bg-gray-50">
            <button className="w-full py-2 text-sm text-[#0b66a2] font-medium hover:bg-gray-100 rounded-md transition-all duration-200">
              View All Notifications
            </button>
          </div>
        )}
      </div>

      {showAcceptModal && selectedNotification && (
        <AcceptanceModal
          notification={selectedNotification}
          onClose={handleCloseModal}
          onAccept={handleAcceptAndSend}
        />
      )}

      {showDiscussModal && selectedNotification && (
        <DiscussionModal
          notification={selectedNotification}
          replyMessage={replyMessage}
          onReplyChange={setReplyMessage}
          onClose={handleCloseModal}
          onReply={handleReply}
        />
      )}
    </>
  );
}

NotificationPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setNotificationCount: PropTypes.func,
};
