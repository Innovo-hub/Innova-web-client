import React from "react";
import PropTypes from "prop-types";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import NotificationCard from "./NotificationCard";

function NotificationList({
  notifications,
  onNotificationClick,
  onRemoveNotification,
}) {
  return (
    <div className="p-3 space-y-3 max-h-[400px] overflow-y-auto">
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <NotificationsNoneOutlinedIcon className="text-gray-400 text-4xl mb-2" />
          <p className="text-sm">No notifications yet</p>
        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            onClick={onNotificationClick}
            onRemove={onRemoveNotification}
          />
        ))
      )}
    </div>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
  onNotificationClick: PropTypes.func.isRequired,
  onRemoveNotification: PropTypes.func.isRequired,
};

export default NotificationList;
