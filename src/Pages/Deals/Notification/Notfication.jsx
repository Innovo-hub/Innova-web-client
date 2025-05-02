import { useState } from "react";
import PropTypes from "prop-types";
import NotificationHeader from "./NotificationHeader";
import NotificationTabs from "./NotificationTabs";
import NotificationList from "./NotificationList";
import AcceptanceModal from "./AcceptanceModal";
import DiscussionModal from "./DiscussionModal";

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
  const [notifications, setNotifications] = useState({
    received: [
      {
        id: 1,
        user: "Nader_Hani",
        message: "Have Accepted your Offer deal and waiting for respond",
        time: "2h ago",
        isVerified: true,
        projectName: "Smart City Solutions",
        investorName: "Nader Hani",
        offerAmount: "$50,000",
        equityPercentage: "15%",
        priority: "high",
      },
      {
        id: 2,
        user: "MohamedAli",
        message: "Discuss deals for new offers!",
        time: "1d ago",
        priority: "medium",
        isVerified: true,
        investorName: "Mohamed Ali",
        discussionTopic:
          "What about changing the percentage to 20% for 10000K offer money?",
      },
      {
        id: 3,
        user: "Ahmed Amr",
        message: "Discuss deals for new offers!",
        time: "2d ago",
        priority: "low",
      },
    ],
    replied: [],
  });

  if (setNotificationCount) {
    setNotificationCount(notifications.received.length);
  }

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);

    if (notification.message.toLowerCase().includes("accepted")) {
      setShowAcceptModal(true);
      setShowDiscussModal(false);
    } else if (notification.message.toLowerCase().includes("discuss")) {
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

  const handleRemoveNotification = (notificationId) => {
    setNotifications((prev) => ({
      ...prev,
      received: prev.received.filter((notif) => notif.id !== notificationId),
    }));
  };

  if (!open) return null;

  return (
    <>
      <div className="absolute right-0 top-12 w-[450px] bg-white shadow-2xl border rounded-xl z-50 overflow-hidden">
        <NotificationHeader onClose={onClose} />

        <NotificationTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          count={notifications[activeTab].length}
        />

        <NotificationList
          notifications={notifications[activeTab]}
          onNotificationClick={handleNotificationClick}
          onRemoveNotification={handleRemoveNotification}
        />

        {notifications[activeTab].length > 0 && (
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
