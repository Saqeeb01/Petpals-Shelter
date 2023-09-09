import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const AdoptionModal = ({ isOpen, onClose, formData, onInputChange, onSubmit }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          Adoption Form
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            label="First Name"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Address"
            id="address"
            name="address"
            value={formData.address}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={onInputChange}
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit Adoption
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AdoptionModal;
