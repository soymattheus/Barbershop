export type UserData = {
  userId: string
  name: string
  email: string
  password?: string
  birthDate: string
  phone: string
  createdAt: string
  updatedAt: string
  loyaltyPackage: string
  avaliableServicesNumber: number
  status: string
}

export type User = {
  token?: string
  user: UserData | null
}
