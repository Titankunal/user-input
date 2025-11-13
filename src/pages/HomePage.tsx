import { Typography, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3" gutterBottom>Welcome to the User Management App</Typography>
      <Typography variant="subtitle1" gutterBottom>
        This app lets you create, view, edit, and delete users.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        component={Link}
        to="/users"
      >
        Go to Users
      </Button>
    </Box>
  )
}
