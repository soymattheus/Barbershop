export type User = {
  token?: string
  user: {
    id: string
    name: string
    email: string
    password?: string
    birthDate: string
    phone: string
    createdAt: string
    updatedAt: string
  } | null
}
