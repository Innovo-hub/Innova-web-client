import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import APILINK from "../../../../Constants";
import Swal from "sweetalert2";

function AcceptanceModal({
  notification,
  onClose,
  onAccept,
  hideAcceptButton,
}) {
  if (!notification) return null;

  const handleAccept = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to accept this offer?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#0b66a2",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, accept it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          await Swal.fire({
            title: "Error!",
            text: "You need to be logged in to accept offers.",
            icon: "error",
            confirmButtonColor: "#0b66a2",
          });
          return;
        }

        const requestData = {
          dealId: parseInt(notification.DealId),
          investorId: notification.SenderId,
          isAccepted: true,
          message: "",
        };

        console.log("Sending request with data:", requestData);

        const response = await axios.post(
          `${APILINK}/api/Deals/respond-to-offer`,
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          await Swal.fire({
            title: "Accepted!",
            text: "The offer has been accepted successfully.",
            icon: "success",
            confirmButtonColor: "#0b66a2",
          });
          onAccept();
        }
      }
    } catch (error) {
      console.error("Error accepting offer:", error);
      console.error("Server response:", error.response?.data);

      let errorMessage = "Failed to accept offer. Please try again.";

      if (error.response?.data) {
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.errors) {
          errorMessage = Object.values(error.response.data.errors)
            .flat()
            .join("\n");
        }
      }

      await Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonColor: "#0b66a2",
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
                {notification.createdAt}
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
        <div className="p-5 space-y-4">
          <p className="text-gray-700">Hello There,</p>

          <p className="text-gray-700">{notification.MessageText}</p>

          <p className="text-gray-400 italic">
            &quot; The request will now be forwarded to the platform for further
            review and Admin response. &quot;
          </p>

          {!hideAcceptButton && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleAccept}
                className="bg-[#0b66a2] text-white py-2 px-6 rounded-md font-medium hover:bg-[#0a5b91] transition-colors duration-200 shadow-md"
              >
                Accept & send
              </button>
            </div>
          )}

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
    DealId: PropTypes.number.isRequired,
    SenderId: PropTypes.string.isRequired,
    SenderName: PropTypes.string.isRequired,
    MessageText: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  hideAcceptButton: PropTypes.bool,
};

export default AcceptanceModal;
