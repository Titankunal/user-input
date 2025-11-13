import { useEffect, useState } from "react"
import { getUsers, deleteUser, createUser } from "../services/userService"
import type { User } from "../types/User"
import UserForm from "../components/UserForm"
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Box
} from "@mui/material"

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers().then(data => setUsers(data))
  }, [])

  const handleDelete = async (id: number) => {
    await deleteUser(id)
    setUsers(users.filter(u => u.id !== id))
  }

  const handleCreate = async (data: Omit<User, "id">) => {
    const newUser = await createUser(data)
    setUsers([...users, newUser])
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6">Add New User</Typography>
        <UserForm onSubmit={handleCreate} />
      </Paper>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(u => (
              <TableRow key={u.id}>
                <TableCell>{u.id}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.age}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}
