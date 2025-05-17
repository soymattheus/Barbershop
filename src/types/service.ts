export interface Service {
  name: string
  description: string
  price: number
}

export interface ServiceGroup {
  title: string
  services: Service[]
}
