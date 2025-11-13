import { useState, useEffect } from "react"
import type { User } from "../types/User"
import { TextField, Button, Stack } from "@mui/material"

interface Props {
  initialData?: Partial<User>
  onSubmit: (data: Omit<User, "id">) => void
}

export default function UserForm({ initialData, onSubmit }: Props) {
  const [name, setName] = useState(initialData?.name || "")
  const [email, setEmail] = useState(initialData?.email || "")
  const [age, setAge] = useState(initialData?.age || 0)

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "")
      setEmail(initialData.email || "")
      setAge(initialData.age || 0)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !age) return alert("All fields are required")
    onSubmit({ name, email, age })
    setName("")
    setEmail("")
    setAge(0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Age"
          type="number"
          value={age}
          onChange={e => setAge(Number(e.target.value))}
          fullWidth
        />
        <Button type="submit" variant="contained">Save</Button>
      </Stack>
    </form>
  )
}
