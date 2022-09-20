import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function EditUserDetails(props) {
  const { userId, username, emailAddress, role, handleUpdate } = props;

  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: userId,
    name: username,
    email: emailAddress,
    role: role,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    setOpen(false);
    handleUpdate(userDetails);
  };

  const handleEdit = (e) => {
    const [key, value] = [e.target.name, e.target.value];
    setUserDetails((nextUserDetails) => ({ ...nextUserDetails, id: userId }));
    setUserDetails((nextUserDetails) => ({ ...nextUserDetails, [key]: value }));
  };

  return (
    <div>
      <EditOutlinedIcon sx={{ color: "gray" }} onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit user details</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mt: 1 }}
            required
            id="outlined-required"
            label="Username"
            name="name"
            value={userDetails.name}
            onChange={handleEdit}
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            required
            id="outlined-required"
            label="Email Address"
            name="email"
            value={userDetails.email}
            onChange={handleEdit}
            fullWidth
          />
          <TextField
            sx={{ mt: 2 }}
            required
            id="outlined-required"
            label="Role"
            name="role"
            value={userDetails.role}
            onChange={handleEdit}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={(e) => {
              return handleSubmit(e);
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
