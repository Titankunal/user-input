import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import type { User } from "../pages/UserListPage";

interface UserFormProps {
  user?: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState<User>({
    id: user?.id,
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="success" type="submit">
          {user ? "Update" : "Create"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
