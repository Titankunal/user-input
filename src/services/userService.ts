import type { User } from "../types/User"

let users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 }
]

export const getUsers = async (): Promise<User[]> => {
  return new Promise(resolve => setTimeout(() => resolve(users), 300))
}

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  return new Promise(resolve => {
    const newUser = { ...user, id: Date.now() }
    users.push(newUser)
    setTimeout(() => resolve(newUser), 300)
  })
}

export const updateUser = async (id: number, updated: Partial<User>): Promise<User> => {
  return new Promise(resolve => {
    users = users.map(u => (u.id === id ? { ...u, ...updated } : u))
    const found = users.find(u => u.id === id)!
    setTimeout(() => resolve(found), 300)
  })
}

export const deleteUser = async (id: number): Promise<void> => {
  return new Promise(resolve => {
    users = users.filter(u => u.id !== id)
    setTimeout(() => resolve(), 300)
  })
}
