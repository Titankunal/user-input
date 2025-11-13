import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import UserForm from "../components/UserForm";

export interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

const UserListPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user (simulated)
  const handleDelete = async (id?: number) => {
    if (!id) return;
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  // Open create form
  const handleCreate = () => {
    setEditingUser(null);
    setOpenForm(true);
  };

  // Open edit form
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setOpenForm(true);
  };

  // Save new user
  const handleSaveUser = async (newUser: User) => {
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
      setUsers([...users, response.data]);
      alert("User created successfully!");
      setOpenForm(false);
    } catch {
      alert("Failed to create user.");
    }
  };

  // Update existing user
  const handleUpdateUser = async (updatedUser: User) => {
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        updatedUser
      );
      setUsers(users.map((u) => (u.id === updatedUser.id ? response.data : u)));
      alert("User updated successfully!");
      setOpenForm(false);
      setEditingUser(null);
    } catch {
      alert("Failed to update user.");
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mb: 2 }}>
        Add User
      </Button>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(user)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Form Dialog for Create/Edit */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>{editingUser ? "Edit User" : "Create User"}</DialogTitle>
        <DialogContent>
          <UserForm
            user={editingUser || undefined}
            onSave={editingUser ? handleUpdateUser : handleSaveUser}
            onCancel={() => setOpenForm(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UserListPage;
