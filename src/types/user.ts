export type UserData = {
  id: string
  name: string
  email: string
  password?: string
  birthDate: string
  phone: string
  createdAt: string
  updatedAt: string
  loyaltyPackage: string
  avaliableServicesNumber: number
}

export type User = {
  token?: string
  user: UserData | null
}
