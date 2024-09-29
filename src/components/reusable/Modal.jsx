import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { IoCloseOutline } from "react-icons/io5";
import ReusableButton from "./Button";
import { Box } from "@mui/material";

const ReusableModal = ({
  open,
  onClose,
  heading,
  children,
  onSubmit,
  onCancel,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth="md"
      {...props}
      PaperProps={{ style: { borderRadius: "20px" } }}
      className="rounded-xl"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle style={{ fontWeight: "500", fontSize: "20px" }}>
          {heading}
        </DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <IoCloseOutline />
        </IconButton>
      </Box>

      <DialogContent dividers>{children}</DialogContent>

      <DialogActions>
        <ReusableButton outlined={true} onClick={onCancel}>
          cancel
        </ReusableButton>
        <ReusableButton outlined={false} onClick={onSubmit}>
          save changes
        </ReusableButton>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableModal;
