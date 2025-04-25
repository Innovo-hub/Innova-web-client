import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    padding: "24px",
    border: "1px solid rgba(229, 231, 235, 1)",
  },
}));

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  borderRadius: "12px",
  padding: "16px",
  fontSize: "16px",
  border: "1px solid rgba(203, 213, 225, 1)",
  fontFamily: "inherit",
  transition: "all 0.2s ease-in-out",
  resize: "none",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05) inset",
  "&:focus": {
    outline: "none",
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.25)",
  },
  "&::placeholder": {
    color: "#94a3b8",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#1e40af",
  color: "white",
  borderRadius: "10px",
  padding: "12px 24px",
  fontWeight: "600",
  textTransform: "none",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s ease-in-out",
  fontSize: "16px",
  "&:hover": {
    backgroundColor: "#1e3a8a",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(1px)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: "#ef4444",
  position: "absolute",
  right: "16px",
  top: "16px",
  "&:hover": {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
  },
}));

const DiscussDeal = ({ open, handleClose, dealId, onSubmit }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(dealId, message);
      setMessage("");
      handleClose();
    } catch (error) {
      console.error("Error submitting discussion:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="discuss-deal-dialog-title"
    >
      <DialogTitle
        id="discuss-deal-dialog-title"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          fontSize: "1.75rem",
          fontFamily: "'Inter', sans-serif",
          color: "#111827",
          pb: 0,
        }}
      >
        Discuss Offer
      </DialogTitle>

      <CloseButton onClick={handleClose} aria-label="close" size="large">
        <CloseIcon fontSize="medium" />
      </CloseButton>

      <DialogContent sx={{ pt: 3 }}>
        <p className="text-gray-600 mb-6 text-center text-base">
          Enter what you want to discuss and wait for the Owner to reply in the
          notification center.
        </p>

        <div className="mb-8">
          <StyledTextarea
            placeholder="Write here......"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            minRows={7}
            maxRows={12}
          />
        </div>

        <div className="flex justify-center">
          <SubmitButton
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting || !message.trim()}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <SendIcon />
              )
            }
            fullWidth
          >
            {isSubmitting ? "Sending..." : "Discuss"}
          </SubmitButton>
        </div>
      </DialogContent>
    </StyledDialog>
  );
};

export default DiscussDeal;
