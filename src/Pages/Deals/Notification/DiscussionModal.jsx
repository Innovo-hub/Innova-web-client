import PropTypes from "prop-types";
import VerifiedIcon from "@mui/icons-material/Verified";
import CloseIcon from "@mui/icons-material/Close";

function DiscussionModal({
  notification,
  replyMessage,
  onReplyChange,
  onClose,
  onReply,
}) {
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
        <div className="p-5">
          <p className="text-gray-700 mb-5">
            [{notification.investorName}] has requested a discussion regarding
            the following.
          </p>

          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-1">message comment:</p>
            <div className="p-3 bg-gray-100 rounded-md text-sm text-gray-700">
              {notification.discussionTopic}
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
            <div className="flex justify-center">
              <button
                onClick={onReply}
                className="bg-[#0b66a2] text-white py-2 px-8 rounded font-medium hover:bg-[#0a5b91] transition-colors duration-200"
              >
                Reply
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">
            Innova Hub Team
          </span>
          <span className="text-xs text-gray-500">2023</span>
        </div>
      </div>
    </div>
  );
}

DiscussionModal.propTypes = {
  notification: PropTypes.shape({
    user: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isVerified: PropTypes.bool,
    investorName: PropTypes.string.isRequired,
    discussionTopic: PropTypes.string.isRequired,
  }),
  replyMessage: PropTypes.string.isRequired,
  onReplyChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
};

export default DiscussionModal;
