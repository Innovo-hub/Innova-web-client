import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import APILINK from "../../../../Constants";
import Swal from "sweetalert2";

function DiscussionModal({
  notification,
  replyMessage,
  onReplyChange,
  onClose,
}) {
  if (!notification) return null;

  const handleResponse = async (isAccepted) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${APILINK}/api/Deals/respond-to-offer`,
        {
          DealId: notification.DealId,
          InvestorId: notification.SenderId,
          IsAccepted: isAccepted,
          Message: replyMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: isAccepted ? "Offer Accepted" : "Offer Rejected",
          text: isAccepted
            ? "You have successfully accepted the offer."
            : "You have rejected the offer.",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error responding to offer:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error processing your response. Please try again later.",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-w-90vw overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">From:</span>
              <span className="font-semibold">{notification.SenderName}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {notification.CreatedAt}
              </span>
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
        <div className="p-5">
          <p className="text-gray-700 mb-5">
            {notification.SenderName} has requested a discussion regarding the
            following.
          </p>

          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-1">message comment:</p>
            <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-700">
              {notification.MessageText.split(":")[1]?.trim() ||
                notification.MessageText}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-2">Reply</h3>
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">message Reply:</p>
              <textarea
                className="w-full border border-gray-300 rounded-md p-3 text-sm min-h-[100px]"
                placeholder="....."
                value={replyMessage}
                onChange={(e) => onReplyChange(e.target.value)}
              />
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleResponse(true)}
                className="bg-green-600 text-white py-2 px-8 rounded font-medium hover:bg-green-700 transition-colors duration-200"
              >
                Accept
              </button>
              <button
                onClick={() => handleResponse(false)}
                className="bg-red-600 text-white py-2 px-8 rounded font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Reject
              </button>
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

DiscussionModal.propTypes = {
  notification: PropTypes.shape({
    SenderName: PropTypes.string.isRequired,
    CreatedAt: PropTypes.string.isRequired,
    MessageText: PropTypes.string.isRequired,
    DealId: PropTypes.number.isRequired,
    SenderId: PropTypes.string.isRequired,
  }),
  replyMessage: PropTypes.string.isRequired,
  onReplyChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DiscussionModal;
